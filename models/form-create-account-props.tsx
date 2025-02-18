export interface FormCreateAccountProps {
  setShow: (value: React.SetStateAction<boolean>) => void;
  flags: Record<string, any>;
  flagPath: string;
  show: boolean;
  setPhoneNumber: (value: React.SetStateAction<string>) => void;
  setSelectedCountry: (value: React.SetStateAction<string>) => void;
  setCallingCode: (value: React.SetStateAction<string>) => void;
  setFlagPath: (value: React.SetStateAction<string>) => void;
  callingCode: string;
  phoneNumber: string;
  handlePhoneNumberChange: (text: string) => void;
  handleSendCode: () => Promise<void>;
  handleLogin: () => void;
}
