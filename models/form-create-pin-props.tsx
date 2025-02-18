import { TextInput } from "react-native";

export interface FormCreatePinProps {
  pin: string[];
  inputRefs: React.MutableRefObject<(TextInput | null)[]>;
  handleInputChange: (value: string, index: number) => void;
  handleBackspace: (index: number) => void;
  handleSetPin: () => Promise<void>;
}
