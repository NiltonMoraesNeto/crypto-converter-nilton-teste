export interface FormSignInProps {
  firstName: string;
  handleSignIn: () => Promise<void>;
  login: {
    username: string;
    password: string;
  };
  setLogin: (
    value: React.SetStateAction<{
      username: string;
      password: string;
    }>
  ) => void;
}
