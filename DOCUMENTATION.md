# Documentation Index

## English Documentation

All documentation is now available in both **Chinese (中文)** and **English** versions.

### Main Documentation

| Document | Chinese | English |
|----------|---------|---------|
| **README** | [README.md](./README.md) | [README.en.md](./README.en.md) |
| **Checklist** | [docs/CHECKLIST.md](./docs/CHECKLIST.md) | [docs/CHECKLIST.en.md](./docs/CHECKLIST.en.md) |
| **Examples** | [docs/EXAMPLES.md](./docs/EXAMPLES.md) | [docs/EXAMPLES.en.md](./docs/EXAMPLES.en.md) |
| **Summary** | [docs/SUMMARY.md](./docs/SUMMARY.md) | [docs/SUMMARY.en.md](./docs/SUMMARY.en.md) |
| **Project Status** | [docs/PROJECT_STATUS.md](./docs/PROJECT_STATUS.md) | [docs/PROJECT_STATUS.en.md](./docs/PROJECT_STATUS.en.md) |
| **Rendering Modes** | [docs/RENDERING_MODES.md](./docs/RENDERING_MODES.md) | [docs/RENDERING_MODES.en.md](./docs/RENDERING_MODES.en.md) |
| **Theme & i18n** | [docs/THEME_AND_I18N.md](./docs/THEME_AND_I18N.md) | [docs/THEME_AND_I18N.en.md](./docs/THEME_AND_I18N.en.md) |
| **Implementation** | [docs/IMPLEMENTATION.md](./docs/IMPLEMENTATION.md) | [docs/IMPLEMENTATION.en.md](./docs/IMPLEMENTATION.en.md) |
| **Function Checklist** | [docs/FUNCTION_CHECKLIST.md](./docs/FUNCTION_CHECKLIST.md) | [docs/FUNCTION_CHECKLIST.en.md](./docs/FUNCTION_CHECKLIST.en.md) |
| **Renderer Coverage** | [docs/RENDERER_COVERAGE.md](./docs/RENDERER_COVERAGE.md) | [docs/RENDERER_COVERAGE.en.md](./docs/RENDERER_COVERAGE.en.md) |

## Documentation Overview

### For Users

Start with these documents to understand and use HudX:

1. **README** - Project introduction and quick start
2. **EXAMPLES** - Usage examples for different chart types
3. **RENDERING_MODES** - Understand Canvas vs SVG mode trade-offs
4. **THEME_AND_I18N** - Configure themes and languages

### For Developers

These documents help with implementation and customization:

1. **IMPLEMENTATION** - Understand architecture and design patterns
2. **FUNCTION_CHECKLIST** - Complete list of implemented functions
3. **CHECKLIST** - Implementation status and coverage
4. **RENDERER_COVERAGE** - Feature parity with ZRender

### Reference

Quick reference documents:

1. **SUMMARY** - High-level overview of completed work
2. **PROJECT_STATUS** - Current status and statistics
3. **EXAMPLES** - Code samples and usage patterns

## Quick Links

- [Quick Start](./README.en.md#quick-start)
- [Feature Highlights](./README.en.md#features)
- [Architecture Overview](./docs/IMPLEMENTATION.en.md#architecture-design)
- [Theme Configuration](./docs/THEME_AND_I18N.en.md#theme-system)
- [Rendering Mode Comparison](./docs/RENDERING_MODES.en.md#rendering-mode-comparison)
- [Complete Examples](./docs/EXAMPLES.en.md)

## Language Support

All documentation is available in:

- **English (en)** - Full documentation
- **简体中文 (zh-CN)** - 完整文档

## Features Covered

### Core Rendering

- ✅ Dual rendering modes (Canvas & SVG)
- ✅ High-performance rendering engine
- ✅ Complete graphic elements support
- ✅ Animation system with easing functions

### Chart Library

- ✅ LineChart, BarChart, PieChart, ScatterChart
- ✅ React component integration
- ✅ ECharts-compatible API

### Advanced Features

- ✅ Theme system (Light & Dark)
- ✅ Internationalization (10+ languages)
- ✅ Event system with bubbling
- ✅ Property animations
- ✅ Performance optimization tools

## Getting Started

### Installation

```bash
pnpm install
```

### Build

```bash
pnpm build
```

### Usage

```tsx
import { HudXChart } from '@hudx/charts';

<HudXChart
  option={option}
  width={800}
  height={400}
/>
```

## Support

For issues, questions, or contributions:

1. Check the [Examples](./docs/EXAMPLES.en.md) section
2. Review the [Implementation Guide](./docs/IMPLEMENTATION.en.md)
3. Check the [Function Checklist](./docs/FUNCTION_CHECKLIST.en.md)

## License

MIT

---

**Last Updated**: December 11, 2025

All documentation has been translated to English for better accessibility to international users. Both Chinese and English versions are kept synchronized.
