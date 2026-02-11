import BigText from "../components/BigText";
import TextInput from "../components/TextInput";

export default function Login() {
  return (
    <div className="flex justify-center self-center text-center flex-col">
      <div className="flex flex-col">
        <BigText>MercadoApp</BigText>
        <span>Sistema de Gestão para Mercados</span>
      </div>
      <div className="w-40 h-40 flex justify-center self-center">
        <TextInput />
      </div>
    </div>
  );
}
