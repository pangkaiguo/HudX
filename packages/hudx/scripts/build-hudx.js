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

    // Replace relative paths with package names
    // Handling both with and without .ts extension just in case
    content = content.replace(/(\.\.\/)+core\/src\/index(\.ts)?/g, 'hux-core');
    content = content.replace(
      /(\.\.\/)+charts\/src\/index(\.ts)?/g,
      'hux-charts',
    );

    fs.writeFileSync(destDtsPath, content);
    console.log('Successfully processed and moved index.d.ts');

    // Clean up the intermediate directory
    const packagesDir = path.join(distDir, 'packages');
    if (fs.existsSync(packagesDir)) {
      fs.rmSync(packagesDir, { recursive: true, force: true });
      console.log('Cleaned up dist/packages directory');
    }
  } else {
    console.warn(`Warning: Source declaration file not found at ${srcDtsPath}`);
    // If the file is already at dest (e.g. re-running script), we might want to check that too
    if (!fs.existsSync(destDtsPath)) {
      process.exit(1);
    }
  }
} catch (error) {
  console.error('Error in build-hudx script:', error);
  process.exit(1);
}
