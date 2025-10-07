interface CategoryDescriptionProps {
  content: string;
}

export function CategoryDescription({ content }: CategoryDescriptionProps) {
  // Простой парсер Markdown для базовых элементов
  const parseMarkdown = (text: string) => {
    return text
      .split('\n')
      .map((line, index) => {
        // Заголовки
        if (line.startsWith('# ')) {
          return (
            <h1 key={index} className="text-3xl font-bold mb-4 text-foreground text-center">
              {line.replace('# ', '')}
            </h1>
          );
        }
        if (line.startsWith('## ')) {
          return (
            <h2 key={index} className="text-xl font-semibold mb-3 text-foreground text-center">
              {line.replace('## ', '')}
            </h2>
          );
        }
        
        // Списки
        if (line.startsWith('- ')) {
          return (
            <li key={index} className="text-muted-foreground text-center list-none">
              {line.replace('- ', '')}
            </li>
          );
        }
        
        // Обычные параграфы
        if (line.trim() && !line.startsWith('#') && !line.startsWith('-')) {
          return (
            <p key={index} className="text-muted-foreground mb-3 leading-relaxed text-center">
              {line}
            </p>
          );
        }
        
        // Пустые строки
        return null;
      })
      .filter(Boolean);
  };

  return (
    <div className="mb-8 text-center">
      <div className="max-w-4xl mx-auto">
        {parseMarkdown(content)}
      </div>
    </div>
  );
}