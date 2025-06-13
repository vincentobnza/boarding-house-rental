export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 w-full h-full bg-white flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative mb-6">
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="mt-5 flex space-x-2">
              <div className="size-3 bg-zinc-600 rounded-full animate-pulse"></div>
              <div className="size-3 bg-zinc-600 rounded-full animate-pulse delay-75"></div>
              <div className="size-3 bg-zinc-600 rounded-full animate-pulse delay-150"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
