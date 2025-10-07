interface PluginMetadata {
  title: string;
  status: "в-работе" | "стабильный" | "бета" | "планируется";
  category: "awada" | "ziккурат";
  icon: string;
  image?: string;
  additionalFeaturesImage?: string;
  endImage?: string;
}

interface PluginContent {
  metadata: PluginMetadata;
  description: string;
  features: string[];
  additionalFeatures?: string[];
}

export function parseMarkdown(content: string): PluginContent {
  const lines = content.split('\n');
  let inFrontmatter = false;
  let frontmatterLines: string[] = [];
  let contentLines: string[] = [];
  
  // Разделяем frontmatter и контент
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
  const metadata: any = {};
  for (const line of frontmatterLines) {
    if (line.includes(':')) {
      const [key, ...valueParts] = line.split(':');
      const value = valueParts.join(':').trim().replace(/"/g, '');
      metadata[key.trim()] = value;
    }
  }
  
  // Парсим контент
  const contentText = contentLines.join('\n');
  const sections = contentText.split('## ');
  
  let description = '';
  let features: string[] = [];
  let additionalFeatures: string[] = [];
  
  for (const section of sections) {
    const trimmedSection = section.trim();
    
    if (trimmedSection.startsWith('Основные функции')) {
      const featureText = trimmedSection.replace('Основные функции', '').trim();
      features = extractListItems(featureText);
    } else if (trimmedSection.startsWith('Дополнительные функции')) {
      const additionalFeatureText = trimmedSection.replace('Дополнительные функции', '').trim();
      additionalFeatures = extractListItems(additionalFeatureText);
    } else if (!trimmedSection.includes('#')) {
      // Описание (текст после заголовка, но до разделов)
      const descLines = trimmedSection.split('\n').filter(line => 
        line.trim() && 
        !line.startsWith('#') && 
        !line.startsWith('- ')
      );
      if (descLines.length > 0) {
        description = descLines.join(' ').trim();
      }
    }
  }
  
  // Если описание не найдено в разделах, берем первый абзац
  if (!description) {
    const firstParagraph = contentText.split('\n\n')[1];
    if (firstParagraph && !firstParagraph.startsWith('#') && !firstParagraph.startsWith('- ')) {
      description = firstParagraph.trim();
    }
  }
  
  return {
    metadata: metadata as PluginMetadata,
    description,
    features,
    additionalFeatures: additionalFeatures.length > 0 ? additionalFeatures : undefined
  };
}

function extractListItems(text: string): string[] {
  return text
    .split('\n')
    .filter(line => line.trim().startsWith('- '))
    .map(line => line.trim().substring(2).trim())
    .filter(item => item.length > 0);
}

// Функция для загрузки плагина из MD файла
export async function loadPlugin(pluginId: string): Promise<PluginContent> {
  try {
    // В реальном приложении здесь был бы fetch или import
    const response = await fetch(`/src/content/plugins/${pluginId}.md`);
    const content = await response.text();
    return parseMarkdown(content);
  } catch (error) {
    console.error(`Failed to load plugin ${pluginId}:`, error);
    throw error;
  }
}

// Функция для загрузки всех плагинов
export async function loadAllPlugins(): Promise<PluginContent[]> {
  const pluginIds = ['library', 'object-manager']; // Добавляйте новые ID сюда
  
  const plugins = await Promise.all(
    pluginIds.map(id => loadPlugin(id).catch(error => {
      console.warn(`Failed to load plugin ${id}:`, error);
      return null;
    }))
  );
  
  return plugins.filter((plugin): plugin is PluginContent => plugin !== null);
}