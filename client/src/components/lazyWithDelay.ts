import React from "react";
import { delay } from "@/utils/delay";

export function lazyWithDelay<T = object>(
  factory: () => Promise<{ default: React.ComponentType<T> }>,
  ms: number
) {
  return React.lazy(() =>
    Promise.all([factory(), delay(ms)]).then(([module]) => module)
  );
}
