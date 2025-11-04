import { gcmsiv } from '@noble/ciphers/aes.js';
import { randomBytes } from '@noble/ciphers/utils.js';
import { TextEncoder, TextDecoder } from 'util';
import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english.js';
import { hkdf } from '@noble/hashes/hkdf.js';
import { sha256 } from '@noble/hashes/sha2.js';

const bitsMap = { 12: 128, 15: 160, 18: 192, 21: 224, 24: 256 };

export function generateMnemonic(wordsCount) {
  if (!bitsMap[wordsCount]) throw new Error('Invalid word count. Use 12, 15, 18, 21, or 24.');
  const entropy = randomBytes(bitsMap[wordsCount] / 8);
  return bip39.entropyToMnemonic(Buffer.from(entropy), wordlist);
}

export function deriveKeyFromMnemonic (mnemonic) {
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  if (!bitsMap[mnemonic?.trim()?.split(" ")?.length]) throw new Error('Invalid word count. Use 12, 15, 18, 21, or 24.');
  return hkdf(sha256, seed, new TextEncoder().encode("mnemonic-key"), new Uint8Array([]), bitsMap[mnemonic?.trim()?.split(" ")?.length] / 8);
}

async function encrypt(content, mnemonic) {
  const salt = randomBytes(16);
  const key = deriveKeyFromMnemonic(mnemonic, salt);
  const nonce = randomBytes(12);
  const cipher = gcmsiv(key, nonce);
  const plaintextBytes = new TextEncoder().encode(content);
  const ciphertext = cipher.encrypt(plaintextBytes);

  const out = new Uint8Array(salt.length + nonce.length + ciphertext.length);
  out.set(salt, 0);
  out.set(nonce, salt.length);
  out.set(ciphertext, salt.length + nonce.length);

  return Buffer.from(out).toString('base64');
}

async function decrypt(encrypted, mnemonic) {
  const data = Buffer.from(encrypted, 'base64');

  const salt = data.slice(0, 16);
  const nonce = data.slice(16, 28);
  const ciphertext = data.slice(28);

  const key = deriveKeyFromMnemonic(mnemonic, salt);
  const cipher = gcmsiv(key, nonce);
  const plaintextBytes = cipher.decrypt(new Uint8Array(ciphertext));

  return new TextDecoder().decode(plaintextBytes);
}