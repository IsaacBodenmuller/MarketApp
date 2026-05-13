import { useEffect, useState } from "react";
import api from "../services/api";
import { Pencil, Trash } from "lucide-react";
import Message from "../modals/Message";
import ModalUser from "../modals/User";
import Table from "../components/Table";

export default function UsersTable({ reload }) {
  const [users, setUsers] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await api.get("/api/v1/user");
        setUsers(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar usuários", error);
      }
    };

    loadUsers();
  }, [reload]);

  async function deleteUser() {
    try {
      await api.delete(`/user/${userToDelete}`);
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete));

      setShowMessage(false);
      setUserToDelete(null);
    } catch (error) {
      console.error("Erro ao excluir usuário", error);
    }
  }

  const columns = [
    { key: "username", label: "Usuário" },
    { key: "email", label: "E-mail" },
    {
      key: "profile",
      label: "Perfil",
      render: (user) =>
        user.profile === "ADM" ? (
          <div className="rounded-xl bg-green-700 px-2 text-white text-xs w-fit">
            Administrador
          </div>
        ) : (
          <div className="rounded-xl bg-gray-300 px-2 text-gray-700 text-xs w-fit">
            Operador
          </div>
        ),
    },
    {
      key: "active",
      label: "Status",
      render: (user) => (user.isActive ? "Ativo" : "Inativo"),
    },
  ];

  const renderActions = (user) => (
    <>
      <button
        onClick={() => {
          setUserToEdit(user);
          setShowEditModal(true);
        }}
        className="cursor-pointer"
      >
        <Pencil className="size-4 text-gray-600" />
      </button>

      <button
        onClick={() => {
          setUserToDelete(user.id);
          setShowMessage(true);
        }}
        className="cursor-pointer"
      >
        <Trash className="size-4 text-red-600" />
      </button>
    </>
  );

  return (
    <>
      <Table columns={columns} data={users} renderActions={renderActions} />

      {showMessage && (
        <Message
          onClose={() => {
            setShowMessage(false);
            setUserToDelete(null);
          }}
          onSuccess={deleteUser}
        />
      )}

      {showEditModal && (
        <ModalUser
          user={userToEdit}
          onClose={() => {
            setUserToEdit(null);
            setShowEditModal(false);
          }}
          onSuccess={(updatedUser) => {
            setUsers((prev) =>
              prev.map((u) =>
                u.id === updatedUser.id ? { ...u, ...updatedUser } : u,
              ),
            );

            setShowEditModal(false);
            setUserToEdit(null);
          }}
        />
      )}
    </>
  );
}
