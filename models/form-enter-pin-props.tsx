export interface FormEnterPinProps {
  enteredPin: string;
  handleNumberPress: (num: string) => void;
  handleDelete: () => void;
  handleReset: () => void;
  handleContinue: () => void;
}
