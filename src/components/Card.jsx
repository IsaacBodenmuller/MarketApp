export default function Test({ squareSize, children }) {
  return (
    <div
      className={`border rounded-lg border-gray-300 ${squareSize} h-full px-4 py-6`}
    >
      {children}
    </div>
  );
}
