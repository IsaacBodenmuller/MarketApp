import BigText from "./BigText";

export default function Slogan() {
  return (
    <div className="flex flex-col gap-2 text-center">
      <BigText>
        Mercado<span className="text-emerald-700">App</span>
      </BigText>
      <span className="text-xs font-extralight text-gray-500">
        Sistema de Gestão para Mercados
      </span>
    </div>
  );
}
