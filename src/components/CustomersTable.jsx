import { useEffect, useState } from "react";
import api from "../services/api";
import { Pencil, Trash } from "lucide-react";
import Message from "../modals/Message";
import Table from "../components/Table";
import Profile from "../modals/Profile";

export default function CustomersTable({ reload, showToast }) {
  const [profiles, setProfiles] = useState([]);
  const [profileToDelete, setProfileToDelete] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [profileToEdit, setProfileToEdit] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const response = await api.get("/api/v1/customers");
        setProfiles(response.data);
      } catch (error) {
        console.error("Erro ao buscar clientes", error);
      }
    };

    loadProfiles();
  }, [reload]);

  async function deleteProfile() {
    try {
      await api.delete(`/api/v1/customers/${profileToDelete}`);

      setProfiles((prev) => prev.filter((p) => p.id !== profileToDelete));

      showToast({
        type: "success",
        message: "Cliente excluído com sucesso",
      });
    } catch (error) {
      console.error("Erro ao excluir cliente", error);

      showToast({
        type: "error",
        message: "Erro ao excluir cliente",
      });
    } finally {
      setShowMessage(false);
      setProfileToDelete(null);
    }
  }

  const columns = [
    { key: "name", label: "Nome cliente" },
    { key: "cpf", label: "CPF" },
    { key: "phone", label: "Telefone" },
    { key: "email", label: "E-mail" },
    { key: "cep", label: "CEP" },
    { key: "address", label: "Rua" },
    { key: "addressNumber", label: "Número" },
    { key: "complement", label: "Complemento" },
    { key: "neighborhood", label: "Bairro" },
    { key: "city", label: "Cidade" },
    { key: "state", label: "Estado" },
    {
      key: "active",
      label: "Status",
      render: (profile) => (profile.isActive ? "Ativo" : "Inativo"),
    },
  ];

  const renderActions = (profile) => (
    <>
      <button
        onClick={() => {
          setProfileToEdit(profile);
          setShowEditModal(true);
        }}
        className="cursor-pointer"
      >
        <Pencil className="size-4 text-gray-600" />
      </button>

      <button
        onClick={() => {
          setProfileToDelete(profile.id);
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
      <Table columns={columns} data={profiles} renderActions={renderActions} />

      {showMessage && (
        <Message
          onClose={() => {
            setShowMessage(false);
            setProfileToDelete(null);
          }}
          onSuccess={deleteProfile}
        />
      )}

      {showEditModal && (
        <Profile
          profile={profileToEdit}
          onClose={() => {
            setProfileToEdit(null);
            setShowEditModal(false);
          }}
          onSuccess={(updatedUser) => {
            setProfiles((prev) =>
              prev.map((u) =>
                u.id === updatedUser.id ? { ...u, ...updatedUser } : u,
              ),
            );
            showToast({
              type: "success",
              message: "Perfil salvo com sucesso",
            });
            setShowEditModal(false);
            setProfileToEdit(null);
          }}
        />
      )}
    </>
  );
}
