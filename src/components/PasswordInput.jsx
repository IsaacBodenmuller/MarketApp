const SEE_PASSWORD = {
  true: "text",
  false: "password",
};

export default function TextInput({
  onClick,
  seePassword,
  type = "text",
  placeholder,
  icon: IconComponent,
}) {
  return (
    <div className="flex border bg-gray-50 border-gray-300 rounded-md w-full h-8 text-gray-700 focus:outline-1 outline-gray-400 p-2 text-xs">
      <input
        type={onClick ? SEE_PASSWORD[seePassword] : type}
        className="w-full outline-0 relative"
        placeholder={placeholder}
      />
      <div
        onClick={() => onClick()}
        className="right-0 relative cursor-pointer"
      >
        {IconComponent && <IconComponent className="size-4" />}
      </div>
    </div>
  );
}
