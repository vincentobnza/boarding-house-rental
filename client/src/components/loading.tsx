import { MapPinCheckInside } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 w-full h-full bg-white flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative mb-6">
          <MapPinCheckInside
            size={40}
            className="text-zinc-500 animate-bounce mx-auto"
          />
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="mt-5 flex space-x-1">
              <div className="size-2 bg-zinc-400 rounded-full animate-pulse"></div>
              <div className="size-2 bg-zinc-400 rounded-full animate-pulse delay-75"></div>
              <div className="size-2 bg-zinc-400 rounded-full animate-pulse delay-150"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
