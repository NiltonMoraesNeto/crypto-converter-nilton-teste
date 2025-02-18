export interface FormExchangeProps {
  setSelectedType: (value: React.SetStateAction<"from" | "to">) => void;
  setModalVisible: (value: React.SetStateAction<boolean>) => void;
  fromCoin: any;
  amount: string;
  setAmount: (value: React.SetStateAction<string>) => void;
  toCoin: any;
  convertedValue: string;
  modalVisible: boolean;
  coins: any[];
  handleCoinSelection: (coin: any) => void;
  navigation: any;
}
