import { Eye, EyeOff } from "lucide-react";
import BigText from "../components/BigText";
import TextInput from "../components/TextInput";
import Title from "../components/Title";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
import ColorText from "../components/ColorText";
import PasswordInput from "../components/PasswordInput";
import { useState } from "react";

export default function Login() {
  const [toSeePassword, setToSeePassword] = useState(false);

  function seePassword() {
    if (toSeePassword) {
      setToSeePassword(false);
    } else {
      setToSeePassword(true);
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center self-center text-center flex-col bg-stone-100 gap-6">
      <div className="flex flex-col gap-2">
        <BigText>
          Mercado<span className="text-emerald-700">App</span>
        </BigText>
        <span className="text-xs font-extralight text-gray-500">
          Sistema de Gestão para Mercados
        </span>
      </div>
      <div className="w-96 h-88 flex rounded-lg self-center bg-white px-4 py-6 flex-col gap-4 shadow-md">
        <div className="flex flex-col justify-center self-center">
          <Title>Entrar</Title>
          <span className="text-xs font-extralight text-gray-500">
            Acesse sua conta para continuar
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col text-start gap-2">
            <span className="text-xs font-medium">E-mail</span>
            <TextInput type="text" placeholder="seu@email.com" />
          </div>
          <div className="flex flex-col text-start gap-2">
            <div className="flex justify-between">
              <span className="text-xs font-medium">Senha</span>
              <ColorText color="green">Esqueceu a senha?</ColorText>
            </div>
            <PasswordInput
              seePassword={toSeePassword}
              placeholder="••••••••"
              icon={toSeePassword ? EyeOff : Eye}
              onClick={seePassword}
            />
          </div>
        </div>
        <Checkbox>Lembrar de mim</Checkbox>
        <Button color="green" textColor="text-white">
          Entrar
        </Button>
        <div className="flex">
          <span className="text-[10px]">
            Não possui uma conta?{" "}
            <span className="text-emerald-700 cursor-pointer hover:underline">
              Crie uma agora
            </span>
          </span>
        </div>
      </div>
      <span className="text-[10px] text-gray-500">
        © 2026 MercadoApp. Todos os direitos reservados.
      </span>
    </div>
  );
}
