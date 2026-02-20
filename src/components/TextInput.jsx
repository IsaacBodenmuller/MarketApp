export default function TextInput({
  type = "text",
  placeholder,
  icon: IconComponent,
  value,
  onChange,
  isRequired = false,
}) {
  return (
    <div className="flex border bg-gray-50 border-gray-300 rounded-md w-full h-8 text-gray-700 focus:outline-1 outline-gray-400 px-2 text-xs">
      <input
        type={type}
        className="w-full outline-0 relative"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={isRequired}
      />
      <div className="right-0 relative cursor-pointer">
        {IconComponent && <IconComponent className="size-4" />}
      </div>
    </div>
  );
}
