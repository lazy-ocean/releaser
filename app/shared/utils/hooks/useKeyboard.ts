import { useEffect } from "react";

const useKeyboard = (instructions: {
  [key: string]: (arg?: any) => void;
}): void => {
  const handleKey = (event: KeyboardEvent): void => {
    if (event.key === "Escape") instructions.escape && instructions.escape();
    if (event.key === "Enter")
      instructions.enter && instructions.enter(event.target);
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  });
};

export default useKeyboard;
