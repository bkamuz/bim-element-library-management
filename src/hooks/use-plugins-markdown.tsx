import React from 'react';
import { pluginsData } from '../data/plugins-generated';
import {
  BimLibraryIcon,
  ObjectManagerIcon,
  ControlGeneratorIcon,
  ExportIcon,
} from '../components/icons';
import { SvgIcon } from '../components/icons/dynamic-svg-icon';

// Обертки для SVG иконок
const McpIconComponent = (props: any) => <SvgIcon name="mcp" {...props} />;
const WarehouseComponent = (props: any) => <SvgIcon name="warehouse" {...props} />;
const FlightComponent = (props: any) => <SvgIcon name="flight" {...props} />;

// Маппинг строковых названий иконок к компонентам
const iconMap = {
  BimLibraryIcon,
  ObjectManagerIcon,
  ControlGeneratorIcon,
  ExportIcon,
  McpIcon: McpIconComponent,
  Warehouse: WarehouseComponent,
  Navigation: FlightComponent,
};

export interface PluginCardData {
  title: string;
  description: string;
  features: string[];
  additionalFeatures?: string[];
  icon: any;
  status?: "в-работе" | "стабильный" | "бета" | "планируется";
  category: "awada" | "зиккурат";
  image?: string;
  additionalFeaturesImage?: string;
  endImage?: string;
}

export function usePluginsFromMarkdown(): { awadaPlugins: PluginCardData[], zigguratPlugins: PluginCardData[] } {
  const allPlugins = Object.values(pluginsData).map(plugin => ({
    title: plugin.metadata.title,
    description: plugin.description,
    features: plugin.features,
    additionalFeatures: (plugin as any).additionalFeatures,
    icon: iconMap[plugin.metadata.icon as keyof typeof iconMap] || ExportIcon,
    status: plugin.metadata.status as "в-работе" | "стабильный" | "бета" | "планируется",
    category: plugin.metadata.category as "awada" | "зиккурат",
    image: (plugin.metadata as any).image,
    additionalFeaturesImage: (plugin.metadata as any).additionalFeaturesImage,
    endImage: (plugin.metadata as any).endImage,
    order: parseInt((plugin.metadata as any).order) || 999, // Добавляем order для сортировки
  }));

  // Разделяем плагины по категориям и сортируем по order
  const awadaPlugins = allPlugins
    .filter(plugin => plugin.category === 'awada')
    .sort((a, b) => a.order - b.order);
    
  const zigguratPlugins = allPlugins
    .filter(plugin => plugin.category === 'зиккурат')
    .sort((a, b) => a.order - b.order);

  return { awadaPlugins, zigguratPlugins };
}