import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import { PluginCard } from "./components/plugin-card";
import { CommercialSection } from "./components/commercial-section";
import { CategoryDescription } from "./components/category-description";
import { Badge } from "./components/ui/badge";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { ImageModalProvider } from "./components/image-modal-context";
import { usePluginsFromMarkdown } from "./hooks/use-plugins-markdown";
import { useCategoriesFromMarkdown } from "./hooks/use-categories-markdown";
import {
  Zap,
  Eye,
  AwadaIcon,
  ZigguratIcon,
} from "./components/icons";

export default function App() {
  const { awadaPlugins, zigguratPlugins } = usePluginsFromMarkdown();
  const categories = useCategoriesFromMarkdown();
  
  // Функция для получения плагинов по категории
  const getPluginsByCategory = (categoryId: string) => {
    if (categoryId === 'awada') return awadaPlugins;
    if (categoryId === 'зиккурат') return zigguratPlugins;
    return []; // Для commercial или других категорий
  };

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
                  Платформа AWADA.ЗИККУРАТ
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
        <Tabs defaultValue={categories[0]?.id || "awada"} className="w-full">
          <TabsList className={`grid w-full grid-cols-${categories.length} mb-8`}>
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex items-center gap-2"
                >
                  <IconComponent className="h-4 w-4" />
                  {category.title}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-6">
              {/* Описание категории */}
              {category.content && (
                <CategoryDescription content={category.content} />
              )}
              
              {category.id === 'commercial' ? (
                <CommercialSection />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getPluginsByCategory(category.id).map((plugin) => (
                    <PluginCard 
                      key={plugin.title} 
                      title={plugin.title}
                      description={plugin.description}
                      features={plugin.features}
                      additionalFeatures={plugin.additionalFeatures}
                      icon={plugin.icon}
                      status={plugin.status}
                      category={plugin.category}
                      image={plugin.image}
                      additionalFeaturesImage={plugin.additionalFeaturesImage}
                      endImage={plugin.endImage}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
      </div>
    </ImageModalProvider>
  );
}