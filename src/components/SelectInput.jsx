import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function SelectInput({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const roles = [
    {
      value: "NO-ROLE",
      label: "Operador",
    },
    {
      value: "ADM",
      label: "Administrador",
    },
  ];

  useEffect(() => {
    if (!value) {
      onChange("NO-ROLE");
    }
  }, [value, onChange]);

  const selected = roles.find((r) => r.value === value) || roles[0];

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        <span>{selected.label}</span>
        <ChevronDown className="text-gray-400 size-4" />
      </button>

      {open && (
        <div className="absolute left-0 top-9 w-full bg-white border border-gray-300 rounded-md shadow-md z-50 text-xs">
          {roles.map((role) => (
            <div
              key={role.value}
              onClick={() => {
                onChange(role.value);
                setOpen(false);
              }}
              className="px-2 py-2 cursor-pointer hover:bg-gray-100"
            >
              {role.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
