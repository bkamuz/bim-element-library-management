import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { IconType, IconWrapper } from "./icons/icon-wrapper";
import { AwadaTextIcon } from "./icons/svg-icon";
import { useImageModal } from "./image-modal-context";

interface PluginCardProps {
  title: string;
  description: string;
  features: string[];
  additionalFeatures?: string[];
  icon: IconType;
  status?: "в-работе" | "стабильный" | "бета" | "планируется";
  category: "awada" | "зиккурат";
  image?: string;
  additionalFeaturesImage?: string;
  endImage?: string;
}

export function PluginCard({ 
  title, 
  description, 
  features, 
  additionalFeatures,
  icon: Icon,
  status,
  category,
  image,
  additionalFeaturesImage,
  endImage
}: PluginCardProps) {
  const { openModal } = useImageModal();

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "в-работе": return "bg-chart-4";
      case "стабильный": return "bg-chart-2";
      case "бета": return "bg-primary-3";
      case "планируется": return "bg-primary";
      default: return "bg-primary";
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case "в-работе": return "В работе";
      case "стабильный": return "Стабильный";
      case "бета": return "Бета тестирование";
      case "планируется": return "Планируется";
      default: return status;
    }
  };

  const getCategoryColor = (category: string) => {
    return category === "awada" ? "bg-primary-2" : "bg-chart-1";
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <IconWrapper icon={Icon} className="text-primary" size={48} />
            <div>
              <CardTitle className="flex items-center gap-2">
                {title}
              </CardTitle>
              <Badge className={`${getCategoryColor(category)} text-white mt-2 flex items-center justify-center gap-1 h-6 min-w-[80px]`}>
                <span className="text-white font-semibold text-sm">
                  {category === "awada" ? "AWADA" : "ЗИККУРАТ"}
                </span>
              </Badge>
            </div>
          </div>
          <div className="flex-shrink-0 ml-4">
            <Badge variant="secondary" className={`${getStatusColor(status)} text-white font-semibold border-0 px-4 py-1 text-xs`}>
              {getStatusText(status) || "Без статуса"}
            </Badge>
          </div>
        </div>
        <CardDescription className="mt-3">
          {description}
        </CardDescription>
        {image && (
          <div className="mt-4 gif-container rounded-lg p-4 flex items-center justify-center min-h-[200px]">
            <img 
              src={image} 
              alt={`${title} demo`}
              className="max-w-full max-h-48 object-scale-down rounded image-smooth cursor-pointer hover:opacity-80 transition-opacity"
              loading="lazy"
              onClick={() => openModal(image, `${title} demo`)}
              style={{
                width: 'auto',
                height: 'auto'
              }}
            />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="mb-2">Основные функции:</h4>
            <ul className="space-y-1">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {additionalFeatures && additionalFeatures.length > 0 && (
            <div>
              <h4 className="mb-2">Дополнительные функции:</h4>
              {additionalFeaturesImage && (
                <div className="mb-4 gif-container rounded-lg p-4 flex items-center justify-center min-h-[200px]">
                  <img 
                    src={additionalFeaturesImage} 
                    alt={`${title} дополнительные функции`}
                    className="max-w-full max-h-48 object-scale-down rounded image-smooth cursor-pointer hover:opacity-80 transition-opacity"
                    loading="lazy"
                    onClick={() => openModal(additionalFeaturesImage, `${title} дополнительные функции`)}
                    style={{
                      width: 'auto',
                      height: 'auto'
                    }}
                  />
                </div>
              )}
              <ul className="space-y-1">
                {additionalFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-chart-2 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {endImage && (
            <div className="mt-4 gif-container rounded-lg p-4 flex items-center justify-center min-h-[200px]">
              <img 
                src={endImage} 
                alt={`${title} демонстрация`}
                className="max-w-full max-h-48 object-scale-down rounded image-smooth cursor-pointer hover:opacity-80 transition-opacity"
                loading="lazy"
                onClick={() => openModal(endImage, `${title} демонстрация`)}
                style={{
                  width: 'auto',
                  height: 'auto'
                }}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}