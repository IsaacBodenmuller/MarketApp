import { useEffect, useState } from "react";
import api from "../services/api";
import TextInput from "../components/TextInput";
import SelectInput from "../components/SelectInput";
import PasswordInput from "../components/PasswordInput";
import { X } from "lucide-react";
import BaseModal from "./base/BaseModal";

export default function User({ onClose, onSuccess, user }) {
  const isToUpdate = !!user;

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const [profiles, setProfiles] = useState([]);
  const [profile, setProfile] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const response = await api.get("/api/v1/profiles");
        setProfiles(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao buscar perfis", error);
      }
    };
    loadProfiles();
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setUsername(user.username || "");
      setEmail(user.email || "");
      setProfile(user.profile || "");
    }
  }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== passwordAgain) {
      setError("As senhas não coincidem");
      return;
    }
    if (!profile) {
      setError("Necessário escolher um perfil");
      return;
    }

    try {
      setLoading(true);
      setError("");

      if (isToUpdate) {
        await api.put(`/api/v1/users/${user.Id}`, {
          name,
          username,
          email,
          password,
          profileId: profile,
        });
        onSuccess({
          name,
          username,
          email,
          password,
          profileId: profile,
        });
      } else {
        console.log(profile);
        var response = await api.post("/api/v1/users", {
          name,
          username,
          email,
          password,
          profileId: profile,
        });
        console.log(response);
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
          {isToUpdate ? "Editar usuário" : "Novo usuário"}
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
          <span className="text-xs font-medium">Nome</span>
          <TextInput
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isRequired={true}
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium">Usuário</span>
          <TextInput
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            isRequired={true}
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium">E-mail</span>
          <TextInput
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isRequired={true}
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium">Perfil</span>
          <SelectInput
            value={profile}
            onChange={(value) => setProfile(value)}
            options={profiles}
          />
        </div>

        {!isToUpdate && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium">Senha</span>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isRequired={true}
                type="password"
              />
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium">Confirmar Senha</span>
              <PasswordInput
                value={passwordAgain}
                onChange={(e) => setPasswordAgain(e.target.value)}
                isRequired={true}
                type="password"
              />
            </div>
          </div>
        )}
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
