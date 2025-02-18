export interface FormCoinDetailsProps {
  idCoin: string | null;
  toggleFavorite: (id: string) => Promise<void>;
  isFavorite: boolean;
  coin: any;
  handleBack: () => void;
}
