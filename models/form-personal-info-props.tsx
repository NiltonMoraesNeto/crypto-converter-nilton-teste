export interface FormPersonalInformationScreenProps {
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  setShowPicker: React.Dispatch<React.SetStateAction<boolean>>;
  dob: Date;
  showPicker: boolean;
  setDob: React.Dispatch<React.SetStateAction<Date>>;
  handleNext: () => Promise<void>;
}
