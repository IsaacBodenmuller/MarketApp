import { X } from "lucide-react";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/useAuth";

export default function ForgetPassword({ email, onClose }) {
  const { logout } = useAuth();

  const [userEmail, setUserEmail] = useState(email);
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (password != passwordAgain) {
      setError("As senhas não coincidem");
      return;
    }
    if (!userEmail || !password || !passwordAgain) {
      setError("Necessário preencher todos os campos");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await api.post("auth/changePassword", {
        email: userEmail,
        new_password: password,
      });

      setSuccess("Voltando a tela de login");
      setTimeout(() => {
        setSuccess(null);
        logout();
      }, 2000);
    } catch {
      setError("Erro ao alterar senha");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="w-96  bg-white rounded-xl shadow-xl p-6 flex flex-col gap-4">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold">Alterar senha</h2>
          <X className="size-5 self-center cursor-pointer" onClick={onClose} />
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="text-sm text-green-600 bg-green-100 p-2 rounded">
            {success}
          </div>
        )}

        <div className="flex flex-col justify-end gap-4 mt-2">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium">E-mail</span>
              <TextInput
                placeholder="email@mercadoapp.com"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                disabled="true"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium">Nova Senha</span>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium">Confirmar Nova Senha</span>
              <PasswordInput
                value={passwordAgain}
                onChange={(e) => setPasswordAgain(e.target.value)}
                type="password"
              />
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm bg-gray-200 rounded-lg cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="button"
              className="px-4 py-2 text-sm bg-green-700 text-white rounded-lg cursor-pointer"
              onClick={() => handleSubmit()}
            >
              {loading ? "Salvando..." : "Ok"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
