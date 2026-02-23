import { useEffect, useState } from "react";
import api from "../services/api";
import TextInput from "../components/TextInput";
import SelectInput from "../components/SelectInput";
import PasswordInput from "../components/PasswordInput";
import { X } from "lucide-react";

export default function User({ onClose, onSuccess, user }) {
  const isToUpdate = !!user;

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [profile, setProfile] = useState("Operador");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.Name || "");
      setUsername(user.Username || "");
      setEmail(user.Email || "");
      setProfile(user.Profile || "Operador");
    }
  }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== passwordAgain) {
      setError("As senhas não coincidem");
      return;
    }

    try {
      setLoading(true);
      setError("");

      if (isToUpdate) {
        await api.put("/user/update", {
          name,
          username,
          email,
          profile,
        });
      } else {
        await api.post("/user/create", {
          name,
          username,
          email,
          password,
          profile,
        });
      }

      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err) {
      setError(`Erro: ${err}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="w-96 bg-white rounded-xl shadow-xl p-6 flex flex-col gap-4">
        <div className="flex justify-between">
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
          <TextInput
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isRequired={true}
          />

          <TextInput
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            isRequired={true}
          />

          <TextInput
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isRequired={true}
          />

          <SelectInput
            value={profile}
            onChange={(value) => setProfile(value)}
          />

          {!isToUpdate && (
            <div>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isRequired={true}
                type="password"
              />

              <PasswordInput
                value={passwordAgain}
                onChange={(e) => setPasswordAgain(e.target.value)}
                isRequired={true}
                type="password"
              />
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
      </div>
    </div>
  );
}
