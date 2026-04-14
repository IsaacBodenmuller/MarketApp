import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function SelectInput({ value, onChange, options = [] }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((opt) => opt.id === value);

  return (
    <div
      ref={wrapperRef}
      className="relative flex border bg-gray-50 border-gray-300 rounded-md w-full h-8 text-gray-700 px-2 text-xs items-center cursor-pointer"
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full h-full flex justify-between items-center outline-none cursor-pointer"
      >
        <span>{selected ? selected.name : "Selecione um perfil"}</span>
        <ChevronDown className="text-gray-400 size-4" />
      </button>

      {open && (
        <div className="absolute left-0 top-9 w-full bg-white border border-gray-300 rounded-md shadow-md z-50 text-xs">
          {options.map((opt) => (
            <div
              key={opt.id}
              onClick={() => {
                onChange(opt.id);
                setOpen(false);
              }}
              className="px-2 py-2 cursor-pointer hover:bg-gray-100"
            >
              {opt.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
