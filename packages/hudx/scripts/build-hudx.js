import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const srcDtsPath = path.join(distDir, 'packages/hudx/src/index.d.ts');
const destDtsPath = path.join(distDir, 'index.d.ts');

try {
  if (fs.existsSync(srcDtsPath)) {
    let content = fs.readFileSync(srcDtsPath, 'utf-8');

    content = content.replace(/(\.\.\/)+render\/src\/index(\.ts)?/g, 'hudx-render');
    content = content.replace(
      /(\.\.\/)+charts\/src\/index(\.ts)?/g,
      'hudx-charts',
    );

    fs.writeFileSync(destDtsPath, content);
    console.log('Successfully processed and moved index.d.ts');

    const packagesDir = path.join(distDir, 'packages');
    if (fs.existsSync(packagesDir)) {
      fs.rmSync(packagesDir, { recursive: true, force: true });
      console.log('Cleaned up dist/packages directory');
    }
  } else {
    console.warn(`Warning: Source declaration file not found at ${srcDtsPath}`);
    if (!fs.existsSync(destDtsPath)) {
      process.exit(1);
    }
  }
} catch (error) {
  console.error('Error in build-hudx script:', error);
  process.exit(1);
}
