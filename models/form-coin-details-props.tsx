import { CryptoDataDetails } from "./crypto-data";

export interface FormCoinDetailsProps {
  idCoin: string | null;
  toggleFavorite: (id: string) => Promise<void>;
  isFavorite: boolean;
  coin: CryptoDataDetails | undefined;
  handleBack: () => void;
}
