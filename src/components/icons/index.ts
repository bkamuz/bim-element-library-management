// Экспорт SVG иконок (новая упрощенная система)
export {
  SvgIcon,
  AwadaIcon,
  ZigguratIcon,
  BimLibraryIcon,
  ObjectManagerIcon,
  ControlGeneratorIcon,
  ExportIcon,
  McpIcon
} from './svg-icon';
export type { SvgIconName } from './svg-icon';

// Экспорт утилит
export { IconWrapper, useIcon } from './icon-wrapper';
export type { IconType } from './icon-wrapper';

// Переэкспорт часто используемых Lucide иконок для удобства
export {
  Building,
  Database,
  Zap,
  Eye,
  Upload,
  Warehouse,
  Navigation,
  Settings,
  Library,
  Lightbulb,
  Download,
  MessageSquare,
  Users,
  Server,
  Shield,
  Wrench
} from 'lucide-react';