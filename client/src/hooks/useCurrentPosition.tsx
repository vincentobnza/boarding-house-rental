import { useEffect, useState } from "react";

export function useCurrentPosition() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        () => {
          setPosition([14.5995, 120.9842]);
        }
      );
    } else {
      setPosition([14.5995, 120.9842]);
    }
  }, []);
  return position;
}
