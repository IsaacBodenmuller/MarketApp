import { useEffect } from "react";
import { X, CheckCircle, AlertTriangle, Info, XCircle } from "lucide-react";

const TYPES = {
  success: {
    color: "green",
    icon: CheckCircle,
    bg: "bg-green-600",
    border: "border-green-600",
  },
  error: {
    color: "red",
    icon: XCircle,
    bg: "bg-red-600",
    border: "border-red-600",
  },
  warning: {
    color: "yellow",
    icon: AlertTriangle,
    bg: "bg-yellow-500",
    border: "border-yellow-500",
  },
  info: {
    color: "blue",
    icon: Info,
    bg: "bg-blue-600",
    border: "border-blue-600",
  },
};

export default function Toast({
  type = "info",
  message,
  duration = 4000,
  onClose,
}) {
  const config = TYPES[type];
  const Icon = config.icon;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`flex w-80 rounded-xl border ${config.border} bg-white shadow-md overflow-hidden`}
      >
        <div className={`flex items-center justify-center w-16 ${config.bg}`}>
          <Icon className="text-white size-6" />
        </div>

        <div className="flex flex-col flex-1 p-3 relative">
          <span className="text-sm text-gray-700">{message}</span>

          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <X className="size-4" />
          </button>

          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
            <div
              className={`${config.bg} h-1 animate-[shrink_linear]`}
              style={{
                animationDuration: `${duration}ms`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
