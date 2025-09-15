import initR2Connection from 'src/app-packages/r2/base';

// Environment variables used in this file
const R2_CONFIG = {
  accountId: process.env.R2_GROOTFORM_ACCOUNT_ID,
  accessKeyId: process.env.R2_GROOTFORM_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_GROOTFORM_SECRET_ACCESS_KEY,
  bucket: process.env.R2_GROOTFORM_BUCKET,
  publicUrl: process.env.R2_GROOTFORM_PUBLICURL,
};

export default (() => {
  // REMOVE THIS IF YOU NEED R2 INITIALIZATION
  return;
  return initR2Connection('appR2', R2_CONFIG);
})();
