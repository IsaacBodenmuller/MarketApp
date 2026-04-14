import { useEffect, useState } from "react";
import api from "../services/api";
import { Pencil, Trash } from "lucide-react";
import Message from "../modals/Message";
import Table from "../components/Table";
import Profile from "../modals/Profile";

export default function ProfilesTable({ reload }) {
  const [profiles, setProfiles] = useState([]);
  const [profileToDelete, setProfileToDelete] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [profileToEdit, setProfileToEdit] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const response = await api.get("/api/v1/profiles");
        setProfiles(response.data);
      } catch (error) {
        console.error("Erro ao buscar perfis", error);
      }
    };

    loadProfiles();
  }, [reload]);

  async function deleteProfile() {
    try {
      await api.delete(`/api/v1/profiles/${profileToDelete}`);
      setProfiles((prev) => prev.filter((p) => p.id !== profileToDelete));

      setShowMessage(false);
      setProfileToDelete(null);
    } catch (error) {
      console.error("Erro ao excluir usuário", error);
    }
  }

  const columns = [
    { key: "name", label: "Nome" },
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

            setShowEditModal(false);
            setProfileToEdit(null);
          }}
        />
      )}
    </>
  );
}
