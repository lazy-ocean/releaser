import { PrimaryButton, SecondaryButton } from "./button.styled";

export enum ButtonType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

const Button = ({
  type,
  label,
  onClick,
  shadow,
}: {
  type: ButtonType;
  label: string;
  onClick?: () => void;
  shadow?: boolean;
}) => {
  const buttonsMapping = {
    [ButtonType.PRIMARY]: (
      <PrimaryButton shadow={shadow} onClick={onClick}>
        {label}
      </PrimaryButton>
    ),
    [ButtonType.SECONDARY]: (
      <SecondaryButton shadow={shadow} onClick={onClick}>
        {label}
      </SecondaryButton>
    ),
  };

  return buttonsMapping[type];
};

export default Button;
