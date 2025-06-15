import { useState } from "react";

export const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied(true);
        console.log("Copied to clipboard:", text);

        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((error) => {
        console.error("Clipboard copy failed:", error);
      });
  };

  return { isCopied, handleCopy };
};
