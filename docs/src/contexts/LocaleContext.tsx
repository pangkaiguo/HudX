import { createContext, useContext } from 'react';

export type Locale = 'en' | 'zh';

export const LocaleContext = createContext<Locale>('en');

export const useLocale = () => useContext(LocaleContext);
