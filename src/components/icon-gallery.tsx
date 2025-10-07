import { SvgIcon, useAvailableIcons } from "./icons/dynamic-svg-icon";

export function IconGallery() {
  const iconNames = useAvailableIcons();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Галерея SVG иконок</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {iconNames.map((iconName: string) => (
          <div 
            key={iconName} 
            className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <SvgIcon 
              name={iconName} 
              className="mb-2" 
              width={48} 
              height={48}
            />
            <span className="text-xs text-center font-medium text-gray-600">
              {iconName}
            </span>
          </div>
        ))}
      </div>
      
      {/* Примеры использования с различными размерами и цветами */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Примеры использования</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex flex-col items-center gap-2">
            <SvgIcon name="awada" width={24} height={24} />
            <span className="text-xs">24x24</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <SvgIcon name="awada" width={32} height={32} />
            <span className="text-xs">32x32</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <SvgIcon name="awada" width={48} height={48} />
            <span className="text-xs">48x48</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <SvgIcon name="awada" width={64} height={64} />
            <span className="text-xs">64x64</span>
          </div>
        </div>
      </div>
    </div>
  );
}