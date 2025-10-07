# Система # SVG Icon System Documentation

## Обзор

Система управления SVG иконками позволяет:
- Хранить иконки как отдельные SVG файлы
- Автоматически генерировать TypeScript типы и данные
- Использовать иконки с полной типизацией и автокомплитом
- Динамически изменять размеры и цвета иконок

## Структура файлов

```
src/
├── content/
│   └── icons/           # SVG файлы иконок
│       ├── awada.svg
│       ├── ziggurat.svg
│       └── ...
├── generated/           # Автогенерированные файлы
│   ├── icons-data.ts    # Данные иконок
│   └── icon-types.ts    # TypeScript типы
└── components/
    └── icons/
        └── dynamic-svg-icon.tsx  # Компонент для отображения
```

## Добавление новой иконки

1. Создайте SVG файл в `src/content/icons/`
2. Запустите: `node scripts/generate-icons-data.js`
3. Типы и данные обновятся автоматически

## Использование

### Базовое использование
```tsx
import { SvgIcon } from './components/icons/dynamic-svg-icon';

<SvgIcon name="awada" />
```

### С настройками размера
```tsx
<SvgIcon 
  name="ziggurat" 
  width={32} 
  height={32} 
/>
```

### С CSS классами
```tsx
<SvgIcon 
  name="bim-library" 
  className="text-blue-500 hover:text-blue-700" 
/>
```

### Получение списка доступных иконок
```tsx
import { useAvailableIcons } from './components/icons/dynamic-svg-icon';

const iconNames = useAvailableIcons(); // ['awada', 'ziggurat', ...]
```

## Доступные иконки

Система автоматически обнаруживает все SVG файлы в `src/content/icons/`:

- `awada` - Логотип AWADA
- `ziggurat` - Логотип Зиккурат  
- `bim-library` - Библиотека BIM элементов
- `object-manager` - Менеджер объектов
- `control-generator` - Генератор управления
- `export` - Экспорт данных
- `mcp` - MCP протокол
- `warehouse` - Склад/хранилище

## Автогенерация

Скрипт `scripts/generate-icons-data.js`:
- Сканирует папку `src/content/icons/`
- Создает `icons-data.ts` с содержимым SVG
- Создает `icon-types.ts` с TypeScript типами
- Обеспечивает типобезопасность

## Преимущества

1. **Типобезопасность**: Автокомплит и проверка типов
2. **Производительность**: SVG встраиваются в бандл
3. **Гибкость**: Легко изменять размеры и стили
4. **Поддержка**: Простое добавление новых иконок
5. **Консистентность**: Единый API для всех иконок

## Legacy Components

- `icon-wrapper.tsx` - Wrapper component for consistent icon styling
- `index.ts` - Barrel export for all icon components  
- `svg-icon.tsx` - Custom SVG icon components (legacy)а содержит кастомные иконки для приложения AWADA.ЗИККУРАТ.

## Структура

- `svg-icon.tsx` - React компоненты с встроенным SVG кодом
- `icon-wrapper.tsx` - Универсальная обертка для работы с Lucide и кастомными иконками  
- `index.ts` - Основной файл экспорта всех иконок

## Использование

```tsx
import { AwadaIcon, ZigguratIcon, SvgIcon, Building } from './components/icons';

// Кастомные SVG иконки (компоненты-обертки)
<AwadaIcon className="text-primary" size={32} />
<ZigguratIcon className="text-primary" size={24} />

// Прямое использование SvgIcon
<SvgIcon name="awada" className="text-primary" size={32} />

// Lucide иконки
<Building className="h-5 w-5" />
```

## Добавление новых иконок

1. Создайте React компонент с SVG кодом в `svg-icon.tsx`
2. Добавьте его в `iconMap`
3. При желании создайте компонент-обертку для удобства
4. Экспортируйте в `index.ts`

## Преимущества системы

- ✅ Простота: React компоненты с встроенным SVG
- ✅ Надежность: работает во всех средах без дополнительной настройки
- ✅ Производительность: оптимизированные компоненты
- ✅ Типизация: TypeScript контролирует доступные имена иконок

## Пример добавления новой иконки

### 1. Создайте React компонент в svg-icon.tsx
```tsx
const MyIconSvg = ({ className = "", size = 24 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M12 2L22 8V16L12 22L2 16V8L12 2Z" stroke="currentColor" strokeWidth="2"/>
  </svg>
);
```

### 2. Добавьте в iconMap
```tsx
const iconMap = {
  // ... существующие иконки
  'my-icon': MyIconSvg,
};
```

### 3. Создайте компонент-обертку
```tsx
export const MyIcon = (props: Omit<SvgIconProps, 'name'>) => 
  <SvgIcon name="my-icon" {...props} />;
```

### 4. Экспортируйте в index.ts
```tsx
export { MyIcon } from './svg-icon';
```