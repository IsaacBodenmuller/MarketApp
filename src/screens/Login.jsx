import { Eye, EyeOff } from "lucide-react";
import TextInput from "../components/TextInput";
import Title from "../components/Title";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
import ColorText from "../components/ColorText";
import PasswordInput from "../components/PasswordInput";
import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import Slogan from "../components/Slogan";

export default function Login() {
  const [toSeePassword, setToSeePassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleLogin() {
    if (username === "" || password === "") {
      setError("Necessário preencher usuário e senha");
      return;
    }
    try {
      setError(null);

      await login(username, password, remember);

      navigate("/home/dashboard");
    } catch (err) {
      console.log(err);
      setError("Credenciais inválidas");
    }
  }

  function seePassword() {
    if (toSeePassword) {
      setToSeePassword(false);
    } else {
      setToSeePassword(true);
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center self-center text-center flex-col bg-stone-100 gap-6">
      <Slogan />
      <div className="w-96 h-88 flex rounded-lg self-center bg-white px-4 py-6 flex-col gap-4 shadow-md">
        <div className="flex flex-col justify-center self-center">
          <Title>Entrar</Title>
          <span className="text-xs font-extralight text-gray-500">
            Acesse sua conta para continuar
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col text-start gap-2">
            <span className="text-xs font-medium">Usuário</span>
            <TextInput
              type="text"
              placeholder="Usuario_123"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col text-start gap-2">
            <div className="flex justify-between">
              <span className="text-xs font-medium">Senha</span>
              <ColorText color="green">Esqueceu a senha?</ColorText>
            </div>
            <PasswordInput
              seePassword={toSeePassword}
              icon={toSeePassword ? EyeOff : Eye}
              onClick={seePassword}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <Checkbox
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          >
            Lembrar de mim
          </Checkbox>
        </div>
        <Button color="green" textColor="text-white" onClick={handleLogin}>
          Entrar
        </Button>
        {error && (
          <span className="text-[10px] text-start text-red-500">{error}</span>
        )}
      </div>
      <span className="text-[10px] text-gray-500">
        © 2026 MercadoApp. Todos os direitos reservados.
      </span>
    </div>
  );
}
