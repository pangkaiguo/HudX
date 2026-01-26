import type { Preview } from "@storybook/react";
import { I18nDocsContainer } from '../src/components/I18nDocsContainer';

const preview: Preview = {
  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', right: '🇺🇸', title: 'English' },
          { value: 'zh', right: '🇨🇳', title: '中文' },
        ],
      },
    },
  },
  parameters: {
    docs: {
      container: I18nDocsContainer,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ["Welcome", "Guide", ["Quick Start", "Interactive Features", "Theme & I18n", "Rendering Modes", "Performance", "Implementation Details", "Shape Interfaces", "API Reference"], "Charts", "API"],
      },
    },
  },
};

export default preview;
