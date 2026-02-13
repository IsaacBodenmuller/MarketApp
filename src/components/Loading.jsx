export default function Loading({ fullScreen = true }) {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        fullScreen ? "w-screen h-screen" : "w-full h-full py-10"
      } bg-stone-100`}
    >
      <div className="flex text-2xl font-semibold mb-6">
        <span className="text-gray-800">Mercado</span>
        <span className="text-emerald-600">App</span>
      </div>

      <div className="relative">
        <div className="w-12 h-12 border-4 border-emerald-200 rounded-full"></div>
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full absolute top-0 left-0 animate-spin"></div>
      </div>

      <p className="text-sm text-gray-500 mt-4 animate-pulse">Carregando...</p>
    </div>
  );
}
