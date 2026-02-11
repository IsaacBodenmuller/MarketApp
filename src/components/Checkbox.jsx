export default function Checkbox({ children }) {
  return (
    <div className="flex gap-2">
      <input id="remember" type="checkbox" className="cursor-pointer" />
      {children && (
        <label
          htmlFor="remember"
          className="text-xs font-extralight cursor-pointer"
        >
          {children}
        </label>
      )}
    </div>
  );
}
