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
  error: string,
  setError: (newError: string) => void,
  footerHeight: number,
  password: string,
  setPasssword: (newPassword: string) => void
}

const useAuthStore = create<AuthStore>((set) => ({
  index: 0,
  setIndex: (newIndex) => set({ index: newIndex }),
  email: '',
  setEmail: (newEmail) => set({ email: newEmail }),
  emailValid: false,
  setEmailValid: (newEmailValid) => set({ emailValid: newEmailValid }),
  otp: '',
  setOtp: (newOtp) => set({ otp: newOtp }),
  error: '',
  setError: (newError) => set({ error: newError }),
  footerHeight: 68,
  password: '',
  setPasssword: (newPassword) => set({ password: newPassword }),
}));

export default useAuthStore;
