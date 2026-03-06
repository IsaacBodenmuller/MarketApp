export default function Checkbox({ children, checked, onChange }) {
  return (
    <div className="flex gap-2">
      <input
        id="remember"
        type="checkbox"
        className="cursor-pointer"
        checked={checked}
        onChange={onChange}
      />
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
