export interface FormHomeAddressScreenProps {
  address: {
    street: string;
    apt: string;
    city: string;
    region: string;
    zip: string;
  };
  setAddress: (
    value: React.SetStateAction<{
      street: string;
      apt: string;
      city: string;
      region: string;
      zip: string;
    }>
  ) => void;
  handleNext: () => Promise<void>;
}
