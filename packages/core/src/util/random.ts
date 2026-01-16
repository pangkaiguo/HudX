export const getUnit32RandomValues = () => {
  if (typeof window === 'undefined') {
    return Math.random();
  }
  const crypto =
    (window as any).crypto ||
    (window as any).webkitCrypto ||
    (window as any).mozCrypto ||
    (window as any).oCrypto ||
    (window as any).msCrypto;
  if (!crypto || !crypto.getRandomValues) {
    return Math.random();
  }
  const array = new Uint32Array(1);
  const random = crypto.getRandomValues(array)[0] / 4294967295;
  return random;
};

export const uuidV4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (getUnit32RandomValues() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export default uuidV4;
