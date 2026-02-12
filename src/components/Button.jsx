const COLORS = {
  green: "bg-emerald-700 hover:bg-emerald-800",
};

export default function Button({ color, textColor, children, onClick }) {
  return (
    <div className={`${COLORS[color]} w-full h-10 rounded-md`}>
      <button
        className={`${textColor} w-full h-full text-xs cursor-pointer`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}
