import { create } from "zustand";

type AuthStore = {
 index: number | null,
 setIndex: (newIndex: number) => void,
 email: string,
 setEmail: (newEmail: string) => void,
 emailValid: boolean,
 setEmailValid: (newEmailValid: boolean) => void,
 otp: string,
 setOtp: (newOtp: string) => void,
 footerHeight: number,
}

const useAuthStore = create<AuthStore>((set) => ({
  index: 0,
  setIndex: (newIndex) => set({ index: newIndex}),
  email: '',
  setEmail: (newEmail) => set({ email: newEmail }),
  emailValid: false,
  setEmailValid: (newEmailValid) => set({ emailValid: newEmailValid }),
  otp: '',
  setOtp: (newOtp) => set({ otp: newOtp}),
  footerHeight: 52,
}));

export default useAuthStore;
