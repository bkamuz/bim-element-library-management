import { pluginsData } from '../data/plugins-data';
import {
  BimLibraryIcon,
  ObjectManagerIcon,
  ControlGeneratorIcon,
  ExportIcon,
  McpIcon,
} from '../components/icons';

// Маппинг строковых названий иконок к компонентам
const iconMap = {
  BimLibraryIcon,
  ObjectManagerIcon,
  ControlGeneratorIcon,
  ExportIcon,
  McpIcon,
};

export interface PluginCardProps {
  title: string;
  description: string;
  features: string[];
  additionalFeatures?: string[];
  icon: React.ComponentType<any>;
  status?: "в-работе" | "стабильный" | "бета" | "планируется";
  category: "awada" | "ziккурат";
  image?: string;
  additionalFeaturesImage?: string;
  endImage?: string;
}

export function usePluginsData(): PluginCardProps[] {
  return Object.values(pluginsData).map(plugin => ({
    title: plugin.metadata.title,
    description: plugin.description,
    features: plugin.features,
    additionalFeatures: plugin.additionalFeatures,
    icon: iconMap[plugin.metadata.icon as keyof typeof iconMap],
    status: plugin.metadata.status,
    category: plugin.metadata.category,
    image: plugin.metadata.image,
    additionalFeaturesImage: plugin.metadata.additionalFeaturesImage,
    endImage: plugin.metadata.endImage,
  }));
}