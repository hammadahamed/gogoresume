const config = {
  gogoresumeFrontendUrl: 'https://gogoresume.com',
};

if (process.env.NODE_ENV === 'development') {
  config.gogoresumeFrontendUrl = 'http://localhost:5173';
}
export default config;
