import React from 'react';
import { LucideIcon } from 'lucide-react';

// Тип для кастомных иконок
type CustomIconComponent = React.ComponentType<{ className?: string; size?: number }>;

// Объединенный тип для всех иконок
export type IconType = LucideIcon | CustomIconComponent;

interface IconWrapperProps {
  icon: IconType;
  className?: string;
  size?: number;
}

// Функция для проверки, является ли иконка Lucide иконкой
function isLucideIcon(icon: IconType): icon is LucideIcon {
  // Lucide иконки имеют свойство displayName, начинающееся с определенного префикса
  return typeof icon === 'function' && 'displayName' in icon;
}

// Компонент-обертка для универсального использования иконок
export function IconWrapper({ icon: Icon, className = "", size = 24 }: IconWrapperProps) {
  if (isLucideIcon(Icon)) {
    // Для Lucide иконок используем inline стили для размера
    return <Icon className={className} style={{ width: size, height: size }} />;
  } else {
    // Для кастомных иконок передаем размер и className напрямую
    return <Icon className={className} size={size} />;
  }
}

// Хук для простого создания иконок с размерами
export function useIcon(icon: IconType, defaultSize: number = 24) {
  return React.useCallback(
    ({ className = "", size = defaultSize }: { className?: string; size?: number } = {}) => (
      <IconWrapper icon={icon} className={className} size={size} />
    ),
    [icon, defaultSize]
  );
}