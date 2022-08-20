import { PrimaryButton, SecondaryButton } from "./button.styled";

export enum ButtonType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

const Button = ({
  type,
  label,
  onClick,
}: {
  type: ButtonType;
  label: string;
  onClick?: () => void;
}) => {
  const buttonsMapping = {
    [ButtonType.PRIMARY]: (
      <PrimaryButton onClick={onClick}>{label}</PrimaryButton>
    ),
    [ButtonType.SECONDARY]: (
      <SecondaryButton onClick={onClick}>{label}</SecondaryButton>
    ),
  };

  return buttonsMapping[type];
};

export default Button;
