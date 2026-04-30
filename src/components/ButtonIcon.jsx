const COLORS = {
  emerald: "bg-emerald-700 hover:bg-emerald-800",
  green: "bg-green-700 hover:bg-green-800",
};

export default function ButtonIcon({
  color,
  textColor,
  icon: Icon,
  children,
  onClick,
}) {
  return (
    <div
      className={`${COLORS[color]} min-w-35 flex items-center h-10 rounded-md p-2`}
    >
      {Icon && <Icon className={`size-4 ${textColor}`} />}
      <button
        className={`${textColor} w-full h-full text-sm cursor-pointer`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}
