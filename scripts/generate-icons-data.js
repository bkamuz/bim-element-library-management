import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, resolve, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to process SVG files
function processIconFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const fileName = basename(filePath, '.svg');
  
  return {
    name: fileName,
    content: content.trim()
  };
}

// Main function to generate icons data
function generateIconsData() {
  const iconsDir = resolve(__dirname, '../src/content/icons');
  const outputDir = resolve(__dirname, '../src/generated');
  
  try {
    // Read all SVG files from the icons directory
    const files = readdirSync(iconsDir).filter(file => extname(file) === '.svg');
    
    if (files.length === 0) {
      console.log('No SVG files found in the icons directory.');
      return;
    }

    // Process each SVG file
    const icons = files.map(file => {
      const filePath = join(iconsDir, file);
      return processIconFile(filePath);
    });

    // Generate TypeScript file content
    const tsContent = `// This file is auto-generated. Do not edit manually.

export interface IconData {
  name: string;
  content: string;
}

export const iconsData: IconData[] = ${JSON.stringify(icons, null, 2)};

export const iconMap = new Map<string, string>(
  iconsData.map(icon => [icon.name, icon.content])
);

export function getIcon(name: string): string | undefined {
  return iconMap.get(name);
}

export function getAllIconNames(): string[] {
  return iconsData.map(icon => icon.name);
}
`;

    // Ensure output directory exists
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    // Write the TypeScript file
    const outputPath = join(outputDir, 'icons-data.ts');
    writeFileSync(outputPath, tsContent);

    // Generate types file
    const iconNames = icons.map(icon => `'${icon.name}'`).join('\n  | ');
    const iconNamesArray = icons.map(icon => `'${icon.name}'`).join(',\n  ');
    
    const typesContent = `// This file is auto-generated. Do not edit manually.
// Generated from SVG files in src/content/icons/

export type IconName = 
  | ${iconNames};

export const ICON_NAMES: readonly IconName[] = [
  ${iconNamesArray}
] as const;`;

    const typesPath = join(outputDir, 'icon-types.ts');
    writeFileSync(typesPath, typesContent);

    console.log(`✅ Generated icons data: ${icons.length} icons processed`);
    console.log(`📝 Output: ${outputPath}`);
    console.log(`📝 Types: ${typesPath}`);
    console.log('📊 Icons found:', icons.map(icon => icon.name).join(', '));
    
  } catch (error) {
    console.error('❌ Error generating icons data:', error);
    process.exit(1);
  }
}

// Run the script
generateIconsData();