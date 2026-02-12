import { ArrowLeft } from "lucide-react";
import TextInput from "../components/TextInput";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import Slogan from "../components/Slogan";

export default function CreateAccount() {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col bg-stone-100 gap-6">
      {/* <div className="flex">
            <span className="text-[10px] self-end">
              Não possui uma conta?{" "}
              <span
                className="text-emerald-700 cursor-pointer hover:underline"
                onClick={() => navigate("/createaccount")}
              >
                Crie uma agora
              </span>
            </span>
          </div> */}

      <Slogan />
      <div className="flex flex-col w-150 h-95 bg-white px-4 py-6 rounded-lg shadow-md gap-4">
        <div className="flex gap-56">
          <div>
            <ArrowLeft
              className="cursor-pointer"
              onClick={() => navigate("/login")}
            />
          </div>
          <div>
            <Title>Criar conta</Title>
          </div>
        </div>
        <div>
          <span className="text-xs font-medium">Nome</span>
          <TextInput></TextInput>
        </div>
        <div>
          <span className="text-xs font-medium">Nome de usuário</span>
          <TextInput></TextInput>
        </div>
        <div>
          <span className="text-xs font-medium">Senha</span>
          <TextInput></TextInput>
        </div>
      </div>
    </div>
  );
}
