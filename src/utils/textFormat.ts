import { Platform, StatusBar } from 'react-native';

export const capitalizeAfterPeriod = (text: string): string =>
  `${text}`.replace(/\. (\w)/g, (_match, p1) => `. ${p1.toUpperCase()}`);

export const capitalizeFirstLetter = (string: string | undefined): string => {
  if (!string) { return ''; }
  return (
    string.charAt(0).toUpperCase() +
    string
      .slice(1)
      .replace(
        /([.]\s*)([a-z])/g,
        (_match, prefix, letter) => `${prefix}${letter.toUpperCase()}`,
      )
  );
};

export const compressLetter = (phrase: string): string => {
  const words = phrase.split(' ');
  return words.map(word => word.charAt(0)).join('').toUpperCase();
};

export const formatNumber = (number: number): string => {
  if (number >= 1_000_000) { return (number / 1_000_000).toFixed(0) + 'M'; }
  if (number >= 1_000) { return (number / 1_000).toFixed(0) + 'K'; }
  return number.toString();
};

export const formatCountryCode = (val: string | undefined): string => {
  if (val && !val.startsWith('+')) { return `+${val}`; }
  return val ?? '';
};

export const truncateText = (text: string | undefined, length: number): string => {
  if (!text) { return ''; }
  return text.length > length ? `${text.substring(0, length)}...` : text;
};

export const CurrentHeight: number =
  Platform.OS === 'ios' ? 16 : (StatusBar.currentHeight ?? 0);

export const LeadZero = (num: number): string => {
  if (num >= 0 && num < 10) { return `0${num}`; }
  if (num > -10 && num < 0) { return `-0${Math.abs(num)}`; }
  return num.toString();
};
