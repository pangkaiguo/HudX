import React from 'react';
import { DocsContainer, DocsContainerProps } from '@storybook/blocks';
import { LocaleContext, Locale } from '../contexts/LocaleContext';

export const I18nDocsContainer = (props: DocsContainerProps) => {
  // Get locale from Storybook globals, default to 'en'
  // Safely access nested properties to avoid "Cannot read properties of undefined"
  // Note: DocsContextProps type might be strict, but at runtime globals are available on context for addon-docs
  // We cast to any to access the globals property safely
  const context = props.context as any;
  const locale = (context?.globals?.locale || 'en') as Locale;

  return (
    <LocaleContext.Provider value={locale}>
      <DocsContainer {...props} />
    </LocaleContext.Provider>
  );
};
