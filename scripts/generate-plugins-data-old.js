/**
 * Скрипт для генерации данных плагинов из MD файлов
 * Запуск: node scripts/generate-plugins-data.js
 */

const fs = require('fs');
const path = require('path');

// Функция для парсинга frontmatter
function parseFrontmatter(content) {
  const lines = content.split('\n');
  let inFrontmatter = false;
  let frontmatterLines = [];
  let contentLines = [];
  
  for (const line of lines) {
    if (line.trim() === '---') {
      inFrontmatter = !inFrontmatter;
      continue;
    }
    
    if (inFrontmatter) {
      frontmatterLines.push(line);
    } else {
      contentLines.push(line);
    }
  }
  
  // Парсим frontmatter
  const metadata = {};
  for (const line of frontmatterLines) {
    if (line.includes(':')) {
      const [key, ...valueParts] = line.split(':');
      const value = valueParts.join(':').trim().replace(/"/g, '');
      metadata[key.trim()] = value;
    }
  }
  
  return { metadata, content: contentLines.join('\n') };
}

// Функция для извлечения списков
function extractListItems(text) {
  return text
    .split('\n')
    .filter(line => line.trim().startsWith('- '))
    .map(line => line.trim().substring(2).trim())
    .filter(item => item.length > 0);
}

// Функция для обработки MD файла
function processMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { metadata, content: markdownContent } = parseFrontmatter(content);
  
  const sections = markdownContent.split('## ');
  
  let description = '';
  let features = [];
  let additionalFeatures = [];
  
  for (const section of sections) {
    const trimmedSection = section.trim();
    
    if (trimmedSection.startsWith('Основные функции')) {
      const featureText = trimmedSection.replace('Основные функции', '').trim();
      features = extractListItems(featureText);
    } else if (trimmedSection.startsWith('Дополнительные функции')) {
      const additionalFeatureText = trimmedSection.replace('Дополнительные функции', '').trim();
      additionalFeatures = extractListItems(additionalFeatureText);
    }
  }
  
  // Извлекаем описание (первый абзац после заголовка)
  const paragraphs = markdownContent.split('\n\n');
  for (const paragraph of paragraphs) {
    const trimmed = paragraph.trim();
    if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('- ') && !trimmed.startsWith('##')) {
      description = trimmed
        .replace(/\r\n/g, ' ')
        .replace(/\n/g, ' ')
        .replace(/\r/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      break;
    }
  }
  
  return {
    metadata,
    description,
    features,
    additionalFeatures: additionalFeatures.length > 0 ? additionalFeatures : undefined
  };
}

// Генерируем TypeScript файл
function generateTypeScriptFile() {
  const pluginsDir = path.join(__dirname, '../src/content/plugins');
  const outputFile = path.join(__dirname, '../src/data/plugins-generated.ts');
  
  const plugins = {};
  
  // Проверяем существование директории
  if (!fs.existsSync(pluginsDir)) {
    console.error(`❌ Директория не найдена: ${pluginsDir}`);
    return;
  }
  
  // Читаем все MD файлы
  const files = fs.readdirSync(pluginsDir).filter(file => file.endsWith('.md'));
  
  if (files.length === 0) {
    console.warn('⚠️  MD файлы не найдены в директории plugins');
    return;
  }
  
  for (const file of files) {
    const pluginId = path.basename(file, '.md');
    const filePath = path.join(pluginsDir, file);
    plugins[pluginId] = processMarkdownFile(filePath);
  }
  
  // Генерируем TypeScript код
  const tsContent = `// АВТОМАТИЧЕСКИ СГЕНЕРИРОВАННЫЙ ФАЙЛ
// Не редактируйте вручную! Изменения будут перезаписаны.
// Для изменения данных редактируйте MD файлы в src/content/plugins/

export const pluginsData = ${JSON.stringify(plugins, null, 2)};
`;
  
  fs.writeFileSync(outputFile, tsContent);
  
  // Статистика
  const pluginsByCategory = Object.values(plugins).reduce((acc, plugin) => {
    const category = plugin.metadata.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
  
  console.log(`✅ Данные плагинов сгенерированы: ${outputFile}`);
  console.log(`📊 Статистика:`);
  console.log(`   Всего плагинов: ${Object.keys(plugins).length}`);
  Object.entries(pluginsByCategory).forEach(([category, count]) => {
    console.log(`   ${category}: ${count} плагинов`);
  });
}

// Запускаем генерацию
generateTypeScriptFile();