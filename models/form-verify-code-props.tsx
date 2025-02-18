import { TextInput } from "react-native";

export interface FormVerifyCodeProps {
  code: string[];
  inputsRef: React.RefObject<TextInput>[];
  handleChange: (text: string, index: number) => void;
  handleVerify: () => Promise<void>;
}
