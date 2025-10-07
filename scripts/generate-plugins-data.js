import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, resolve, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to parse frontmatter from markdown
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { metadata: {}, content: content };
  }
  
  const [, frontmatter, body] = match;
  const metadata = {};
  
  // Parse YAML-like frontmatter
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      metadata[key] = value;
    }
  });
  
  return { metadata, content: body.trim() };
}

// Function to parse markdown content into sections
function parseMarkdownContent(content) {
  const sections = content.split(/^## /m);
  const description = sections[0].trim();
  
  const features = [];
  const additionalFeatures = [];
  
  sections.forEach(section => {
    if (section.startsWith('Основные функции')) {
      const lines = section.split('\n').slice(1);
      lines.forEach(line => {
        if (line.trim().startsWith('- ')) {
          features.push(line.trim().substring(2));
        }
      });
    } else if (section.startsWith('Дополнительные функции')) {
      const lines = section.split('\n').slice(1);
      lines.forEach(line => {
        if (line.trim().startsWith('- ')) {
          additionalFeatures.push(line.trim().substring(2));
        }
      });
    }
  });
  
  return { description, features, additionalFeatures };
}

// Function to process plugin file
function processPluginFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const { metadata, content: markdownContent } = parseFrontmatter(content);
  const { description, features, additionalFeatures } = parseMarkdownContent(markdownContent);
  
  return {
    metadata,
    description,
    features,
    additionalFeatures: additionalFeatures.length > 0 ? additionalFeatures : undefined
  };
}

// Function to process category file
function processCategoryFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const { metadata, content: markdownContent } = parseFrontmatter(content);
  
  return {
    id: metadata.id,
    title: metadata.title,
    description: metadata.description,
    icon: metadata.icon,
    order: parseInt(metadata.order) || 999,
    content: markdownContent
  };
}

// Main function to generate plugins data
function generateData() {
  const pluginsDir = resolve(__dirname, '../src/content/plugins');
  const categoriesDir = resolve(__dirname, '../src/content/categories');
  const outputDir = resolve(__dirname, '../src/data');
  
  try {
    // Process plugins
    const pluginFiles = readdirSync(pluginsDir).filter(file => extname(file) === '.md');
    const plugins = {};
    
    pluginFiles.forEach(file => {
      const filePath = join(pluginsDir, file);
      const pluginName = basename(file, '.md');
      plugins[pluginName] = processPluginFile(filePath);
    });

    // Process categories
    const categoryFiles = readdirSync(categoriesDir).filter(file => extname(file) === '.md');
    const categories = {};
    
    categoryFiles.forEach(file => {
      const filePath = join(categoriesDir, file);
      const categoryName = basename(file, '.md');
      categories[categoryName] = processCategoryFile(filePath);
    });

    // Ensure output directory exists
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    // Generate plugins TypeScript file
    const pluginsContent = `// This file is auto-generated. Do not edit manually.

export const pluginsData = ${JSON.stringify(plugins, null, 2)};
`;

    // Generate categories TypeScript file
    const categoriesContent = `// This file is auto-generated. Do not edit manually.

export const categoriesData = ${JSON.stringify(categories, null, 2)};
`;

    // Write the TypeScript files
    const pluginsOutputPath = join(outputDir, 'plugins-generated.ts');
    const categoriesOutputPath = join(outputDir, 'categories-generated.ts');
    
    writeFileSync(pluginsOutputPath, pluginsContent);
    writeFileSync(categoriesOutputPath, categoriesContent);

    console.log(`✅ Generated data: ${pluginFiles.length} plugins, ${categoryFiles.length} categories processed`);
    console.log(`📝 Plugins output: ${pluginsOutputPath}`);
    console.log(`📝 Categories output: ${categoriesOutputPath}`);
    console.log('📊 Plugins found:', Object.keys(plugins).join(', '));
    console.log('📊 Categories found:', Object.keys(categories).join(', '));
    
  } catch (error) {
    console.error('❌ Error generating data:', error);
    process.exit(1);
  }
}

// Run the script
generateData();
