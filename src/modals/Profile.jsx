import { useEffect, useState } from "react";
import api from "../services/api";
import TextInput from "../components/TextInput";
import { X } from "lucide-react";
import BaseModal from "./base/BaseModal";

export default function Profile({ onClose, onSuccess, profile }) {
  const isToUpdate = !!profile;

  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
    }
  }, [profile]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      if (isToUpdate) {
        await api.put(`/api/v1/profile/${profile.id}`, {
          name,
        });
        onSuccess({
          id: profile.id,
          name,
        });
      } else {
        await api.post("/api/v1/profile", {
          name,
        });
        onSuccess();
      }
      onClose();
    } catch (err) {
      setError(`Erro: ${err}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <BaseModal onClose={onClose}>
      <div className="flex justify-between mb-2">
        <h2 className="text-lg font-semibold">
          {isToUpdate ? "Editar perfil" : "Novo perfil"}
        </h2>
        <X className="size-5 self-center cursor-pointer" onClick={onClose} />
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-100 p-2 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium">Nome do Perfil</span>
          <TextInput
            placeholder="Operador"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isRequired={true}
          />
        </div>
        {isToUpdate ? (
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm bg-gray-200 rounded-lg cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm bg-green-700 text-white rounded-lg cursor-pointer"
            >
              {loading ? "Salvando..." : "Salvar edições"}
            </button>
          </div>
        ) : (
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm bg-gray-200 rounded-lg cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm bg-green-700 text-white rounded-lg cursor-pointer"
            >
              {loading ? "Criando..." : "Criar"}
            </button>
          </div>
        )}
      </form>
    </BaseModal>
  );
}
