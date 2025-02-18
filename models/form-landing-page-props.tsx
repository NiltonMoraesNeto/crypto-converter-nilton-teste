export interface FormLandingPageProps {
  firstName: string;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  favoriteCoins: any[];
  handleOpenDetails: (id: any) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  loading: boolean;
  error: boolean;
  coins: any[];
  navigation: any;
}
