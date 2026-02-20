import { useEffect, useState } from "react";
import api from "../services/api";
import { Pencil, Trash } from "lucide-react";

export default function UsersTable({ reload }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await api.get("/user/getAll");
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários", error);
      }
    };

    loadUsers();
  }, [reload]);

  async function deleteUser(userId) {
    const confirmDelete = window.confirm("excluir?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/user/delete/${userId}`);

      setUsers((prev) => prev.filter((u) => u.Id !== userId));
    } catch (error) {
      console.error("Erro ao excluir usuário", error);
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Usuário</th>
            <th className="p-3">E-mail</th>
            <th className="p-3">Perfil</th>
            <th className="p-3">Role</th>
            <th className="p-3">Status</th>
            <th className="p-3"></th>
          </tr>
        </thead>

        <tbody>
          {users?.map((user) => (
            <tr key={user?.Id} className="border-t">
              <td className="p-3">{user?.Username}</td>
              <td className="p-3">{user?.Email}</td>
              <td className="p-3">
                {user?.Role == "ADM" ? (
                  <div className="rounded-xl bg-green-700 w-fit px-2 text-white text-xs">
                    {user?.Profile}
                  </div>
                ) : (
                  <div className="rounded-xl bg-gray-300 w-fit px-2 text-gray-700 text-xs">
                    {user?.Profile}
                  </div>
                )}
              </td>
              <td className="p-3">{user?.Role}</td>
              <td className="p-3">{user?.Active ? "Ativo" : "Inativo"}</td>
              <td className="p-3 flex justify-end gap-8">
                <button>
                  <Pencil className="size-4 text-gray-600" />
                </button>
                <button onClick={() => deleteUser(user.Id)}>
                  <Trash className="size-4 text-red-600" />
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center p-4 text-gray-400">
                Nenhum usuário encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
