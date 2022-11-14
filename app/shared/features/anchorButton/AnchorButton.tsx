import { useCallback, useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { AnchorBtn } from "./AnchorButton.styled";

const AnchorButton = () => {
  const [isVisible, toggleIsVisible] = useState<boolean>(false);

  const onScroll = useCallback(() => {
    toggleIsVisible(window?.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const handleClick = () => {
    if (window) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <AnchorBtn onClick={handleClick} isVisible={isVisible}>
      <IoIosArrowUp aria-hidden={true} />
      To the top
    </AnchorBtn>
  );
};
export default AnchorButton;
