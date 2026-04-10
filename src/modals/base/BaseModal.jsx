export default function BaseModal({ children, onClose, width = "min-w-100" }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-xl shadow-xl ${width} w-fit p-8`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
