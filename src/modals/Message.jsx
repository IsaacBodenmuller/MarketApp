import { X } from "lucide-react";

export default function Message({ onClose, onSuccess }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="w-96  bg-white rounded-xl shadow-xl p-6 flex flex-col gap-4">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold">Deseja excluir o usuário?</h2>
          <X className="size-5 self-center cursor-pointer" onClick={onClose} />
        </div>
        <div className="flex flex-col justify-end gap-2 mt-2">
          <div>
            <span>Você tem certeza que deseja excluir esse usuário?</span>
          </div>
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm bg-gray-200 rounded-lg cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="button"
              className="px-4 py-2 text-sm bg-green-700 text-white rounded-lg cursor-pointer"
              onClick={onSuccess}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
