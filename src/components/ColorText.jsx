const COLORS = {
  green: "text-emerald-700 hover:underline",
};

export default function ColorText({ color = "black", children }) {
  return (
    <div className="flex cursor-pointer">
      <span className={`${COLORS[color]} text-[10px]`}>{children}</span>
    </div>
  );
}
