const config = {
  gogoresumeFrontendUrl: 'https://gogoresume.com',
};

if (process.env.NODE_ENV === 'development') {
  config.gogoresumeFrontendUrl = 'http://localhost:5173';
}

export type IAppEmail = {
  address: string;
  name: string;
};

export const AppEmails = {
  FOUNDER: {
    address: 'founder@gogoresume.com',
    name: 'Hammad @ GoGoResume',
  },
  NO_REPLY: {
    address: 'noreply@gogoresume.com',
    name: 'noreply',
  },
  SUPPORT: {
    address: 'support@gogoresume.com',
    name: 'Support',
  },
};
export default config;
