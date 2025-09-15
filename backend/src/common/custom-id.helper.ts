import * as nanoid from 'nanoid';

// Create a custom ID generator with a specific alphabet
// Using characters that are URL-safe and easily distinguishable
const generateCustomId = nanoid.customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  10,
);

export const generateFormId = () => `f${generateCustomId()}`;
export const generateWorkspaceId = () => `w${generateCustomId()}`;

// Validate custom IDs
export const isValidFormId = (id: string) => /^f[0-9A-Za-z]{10}$/.test(id);
export const isValidWorkspaceId = (id: string) => /^w[0-9A-Za-z]{10}$/.test(id);
