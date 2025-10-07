import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import { PluginCard } from "./components/plugin-card";
import { CommercialSection } from "./components/commercial-section";
import { Badge } from "./components/ui/badge";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { ImageModalProvider } from "./components/image-modal-context";
import { usePluginsFromMarkdown } from "./hooks/use-plugins-markdown";
import {
  Upload,
  Warehouse,
  Navigation,
  Building,
  Zap,
  Eye,
  Database,
  AwadaIcon,
  ZigguratIcon,
  BimLibraryIcon,
  ObjectManagerIcon,
  ControlGeneratorIcon,
  ExportIcon,
  McpIcon,
} from "./components/icons";

export default function App() {
  const { awadaPlugins, zigguratPlugins } = usePluginsFromMarkdown();
  
  // Оставляем комментарий для справки - данные теперь из MD файлов
  const _oldAwadaPlugins = [
    {
      title: "Библиотека",
      description:
        "Централизованная библиотека элементов BIM для системы AWADA. Содержит типовые элементы автоматизации, 3D модели оборудования с параметрами, схемы подключения и монтажа.",
      features: [
        "Быстрая вставка типовых элементов в проект",
        "Всегда актуальные данные и характеристики объектов",
        "Полная совместимость с системой управления AWADA",
        "Готовый кабельный журнал и спецификации (в связке с Менеджером объектов)",
      ],
      icon: BimLibraryIcon,
      status: "стабильный" as const,
      category: "awada" as const,
      image: "/X4VBXGjT9H.gif",
      endImage: "/2025-09-19_09-51-48_202_1758264708.gif",
    },
    {
      title: "Менеджер объектов",
      description:
        "Инструмент для управления и анализа объектов BIM-модели. Предоставляет табличное представление всех объектов проекта с возможностью фильтрации и группировки.",
      features: [
        "Просмотр и редактирование свойств объектов",
        "Загрузка дополнительных параметров от производителей",
        "Проверка соответствия стандартам проектирования",
        "Индикация превышений по нормам",
      ],
      additionalFeatures: [
        "Автоматическое назначение адресов для системы управления AWADA",
        "Назначение объектам свойств - Номер и Имя помещения в котором они находятся",
        "Заполнение кабельного журнала",
        "Перенос адресов из инженерных объектов в контролы",
      ],
      icon: ObjectManagerIcon,
      status: "стабильный" as const,
      category: "awada" as const,
      image: "/img_20250820123610543.png",
      additionalFeaturesImage: "/img_20250901113025.png",
    },
    {
      title: "Экспорт DAE",
      description:
        "Экспорт 3D модели в формат COLLADA (.dae) для передачи в систему управления зданиями AWADA SYSTEMS с сохранением адресации устройств.",
      features: [
        "Сохранение материалов и текстур",
        "Оптимизация геометрии для рендеринга",
        "Поддержка интерактивных элементов",
        "Сохранение адресации устройств в XML файле",
      ],
      icon: ExportIcon,
      status: "стабильный" as const,
      category: "awada" as const,
    },
    {
      title: "Экспорт IFC",
      description:
        "Экспорт в стандарт Industry Foundation Classes для передачи проектов заказчикам и обеспечения совместимости с системой управления AWADA SYSTEMS.",
      features: [
        "Структурированная иерархия объектов",
        "Корректное заполнение классификации",
        "Сохранение пользовательских свойств",
        "Соответствие внутренним стандартам компании",
      ],
      icon: ExportIcon,
      status: "стабильный" as const,
      category: "awada" as const,
    },
    {
      title: "Генератор",
      description:
        "Автоматическое создание зон покрытия и контролов для систем автоматизации. Работает со светильниками и различными типами датчиков.",
      features: [
        "Автоматическое создание и оптимизация контролов освещения",
        "Анализ и расчет зон покрытия света",
        "Помощь в оптимальном размещении светильников",
      ]
    }
  ];

  const zigguratPlugins = [
    {
      title: "Склад",
      description:
        "Система управления библиотеками объектов - централизованное хранение объектов для Renga с возможностью загрузки и скачивания элементов сообществом.",
      features: [
        "Загрузка и скачивание элементов сообществом",
        "Система рейтингов и отзывов",
        "Автоматическое обновление версий",
        "Категоризация по типам и назначению",
        "Поиск по параметрам и характеристикам",
      ],
      icon: Warehouse,
      status: "бета" as const,
      category: "ziккурат" as const,
    },
    {
      title: "Полёт",
      description:
        "Инструмент управления видами и навигации в 3D пространстве с широкими возможностями настройки камеры и анализа модели.",
      features: [
        "Управление видом - сохранение и переключение между видами",
        "Настройка камеры - точное позиционирование точки обзора",
        "Изоляция объектов - временное скрытие ненужных элементов",
        "Анализ линий - проверка трасс и соединений",
        "Настройки солнца - симуляция освещения по времени и сезону",
      ],
      additionalFeatures: [
        "Создание презентационных маршрутов",
        "Анализ видимости и затенения",
        "Проверка коллизий в 3D",
        "Настройка положения моторизированных штор",
      ],
      icon: Navigation,
      status: "в-работе" as const,
      category: "ziккурат" as const,
    },
    {
      title: "MCP (Model Context Protocol)",
      description:
        "Продвинутый инструмент анализа и контроля модели - MCP сервер для Renga, который выполняет доступные в платформе Зиккурат функции.",
      features: [
        "Подключение из внешних редакторов кода с поддержкой MCP",
        "Встроенный чат с поддержкой LLM моделей",
        "Общение с проектом Renga через естественный я��ык",
        "Анализ количества объектов и их характеристик",
        "Автоматическое создание элементов по запросу",
      ],
      icon: McpIcon,
      status: "планируется" as const,
      category: "ziккурат" as const,
    },
  ];

  return (
    <ImageModalProvider>
      <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <AwadaIcon className="text-primary" size={32} />
                <ZigguratIcon
                  className="text-primary"
                  size={32}
                />
                <h1 className="text-3xl font-bold">
                  Плагины AWADA.ЗИККУРАТ
                </h1>
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Комплексная система плагинов для
                BIM-проектирования, автоматизации зданий и
                управления библиотеками объектов
              </p>
              <div className="flex gap-2 mt-4">
                <Badge className="bg-destructive text-white">
                  <Zap className="h-3 w-3 mr-1" />
                  Urgent
                </Badge>
                <Badge className="bg-chart-4 text-white">
                  <Eye className="h-3 w-3 mr-1" />
                  High Priority
                </Badge>
                <Badge variant="outline">Status: Open</Badge>
              </div>
            </div>
            <div className="w-full lg:w-80 h-48 lg:h-56">
              <ImageWithFallback
                src="/HeaderImage.png"
                alt="BIM Element Library Management"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="awada" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger
              value="awada"
              className="flex items-center gap-2"
            >
              <AwadaIcon className="h-4 w-4" />
              AWADA
            </TabsTrigger>
            <TabsTrigger
              value="ziккурат"
              className="flex items-center gap-2"
            >
              <ZigguratIcon className="h-4 w-4" />
              ЗИККУРАТ
            </TabsTrigger>
            <TabsTrigger
              value="commercial"
              className="flex items-center gap-2"
            >
              <Zap className="h-4 w-4" />
              Коммерческое
            </TabsTrigger>
          </TabsList>

          <TabsContent value="awada" className="space-y-6">
            <div className="text-center space-y-2 mb-8">
              <h2>Плагины AWADA</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Система автоматизации зданий с централизованной
                библиотекой элементов BIM, управлением объектами
                и генерацией контролов для систем автоматизации
              </p>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {awadaPlugins.map((plugin, index) => (
                <PluginCard key={index} {...plugin} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ziккурат" className="space-y-6">
            <div className="text-center space-y-2 mb-8">
              <h2>Плагины Зиккурат</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Платформа для управления библиотеками объектов,
                навигации в 3D пространстве и интеллектуального
                анализа моделей через MCP протокол
              </p>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {zigguratPlugins.map((plugin, index) => (
                <PluginCard key={index} {...plugin} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="commercial">
            <CommercialSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </ImageModalProvider>
  );
}