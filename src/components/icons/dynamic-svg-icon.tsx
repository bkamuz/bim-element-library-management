import { getIcon, getAllIconNames } from '../../generated/icons-data';
import type { IconName } from '../../generated/icon-types';

interface SvgIconProps {
  name: IconName;
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

export function SvgIcon({ name, className = '', width, height, color }: SvgIconProps) {
  const iconContent = getIcon(name);
  
  if (!iconContent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  // Parse the SVG content to extract viewBox and modify attributes
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(iconContent, 'image/svg+xml');
  const svgElement = svgDoc.querySelector('svg');
  
  if (!svgElement) {
    console.warn(`Invalid SVG content for icon "${name}"`);
    return null;
  }

  // Get original viewBox (for future use)
  // const viewBox = svgElement.getAttribute('viewBox') || '0 0 48 48';
  
  // Create modified SVG content
  let modifiedSvg = iconContent;
  
  // Apply width and height if provided
  if (width || height) {
    modifiedSvg = modifiedSvg.replace(
      /width="[^"]*"/,
      width ? `width="${width}"` : 'width="48"'
    ).replace(
      /height="[^"]*"/,
      height ? `height="${height}"` : 'height="48"'
    );
  }
  
  // Apply color if provided (replace fill colors)
  if (color) {
    modifiedSvg = modifiedSvg.replace(/fill="[^"]*"/g, `fill="${color}"`);
  }
  
  // Add className if provided
  if (className) {
    modifiedSvg = modifiedSvg.replace('<svg', `<svg class="${className}"`);
  }

  return (
    <div 
      className={`inline-flex items-center justify-center ${className}`}
      dangerouslySetInnerHTML={{ __html: modifiedSvg }}
    />
  );
}

// Hook for getting all available icon names
export function useAvailableIcons(): IconName[] {
  return getAllIconNames() as IconName[];
}