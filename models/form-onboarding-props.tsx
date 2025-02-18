import Swiper from "react-native-swiper";

export interface FormOnboardingProps {
  swiperRef: React.RefObject<Swiper>;
  handleFinishOnboarding: () => Promise<void>;
}
