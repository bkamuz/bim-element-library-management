import { categoriesData } from '../data/categories-generated';
import {
  AwadaIcon,
  ZigguratIcon,
  Building,
} from '../components/icons';

// Маппинг строковых названий иконок к компонентам
const iconMap = {
  AwadaIcon,
  ZigguratIcon,
  Building,
};

export interface CategoryData {
  id: string;
  title: string;
  description: string;
  icon: any;
  order: number;
  content: string;
}

export function useCategoriesFromMarkdown(): CategoryData[] {
  const categories = Object.values(categoriesData).map(category => ({
    id: category.id,
    title: category.title,
    description: category.description,
    icon: iconMap[category.icon as keyof typeof iconMap] || Building,
    order: category.order || 999,
    content: category.content,
  }));

  // Сортируем категории по order
  return categories.sort((a, b) => a.order - b.order);
}