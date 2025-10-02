export interface AuthState {
  otpSentMailId: string | null;
  user: User | null;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  meta: object;
  plan: any;
}

export interface AuthActions {
  sendOtp(email: string): void;
  login(user: User): void;
}
