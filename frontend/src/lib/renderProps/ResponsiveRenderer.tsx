import * as React from 'react';
import sass from '../../styles/sassVariables';

interface ResponsiveRendererProps {
  renderMobile?: () => React.ReactNode;
  renderMobileLandscape?: () => React.ReactNode;
  renderTablet?: () => React.ReactNode;
  renderLaptop?: () => React.ReactNode;
  renderDesktop: () => React.ReactNode;
}

const parsePxInt = (px: string) => parseInt(px, 10);

const parsedMinMobileLandscape = parsePxInt(sass.minMobileLandscape);
const parsedMaxMobileLandscape = parsePxInt(sass.maxMobileLandscape);
const parsedMinTablet = parsePxInt(sass.minTablet);
const parsedMaxTablet = parsePxInt(sass.maxTablet);
const parsedMinLaptop = parsePxInt(sass.minLaptop);
const parsedMaxLaptop = parsePxInt(sass.maxLaptop);
const parsedMinDesktop = parsePxInt(sass.minDesktop);

const ResponsiveRenderer: React.FC<ResponsiveRendererProps> = ({
  renderMobile,
  renderMobileLandscape,
  renderTablet,
  renderLaptop,
  renderDesktop,
}) => {
  const [renderContent, setRenderContent] = React.useState();

  const renderDeviceContent = () => {
    const windowSize = window.screen.width;
    if ((windowSize > parsedMinDesktop)) {
      setRenderContent(renderDesktop());
    } else if ((windowSize > parsedMinLaptop && windowSize < parsedMaxLaptop) && renderLaptop) {
      setRenderContent(renderLaptop());
    } else if ((windowSize > parsedMinTablet && windowSize < parsedMaxTablet) && renderTablet) {
      setRenderContent(renderTablet());
    } else if ((windowSize < parsedMaxMobileLandscape && windowSize > parsedMinMobileLandscape) && renderMobileLandscape) {
      setRenderContent(renderMobileLandscape());
    } else if (renderMobile) {
      setRenderContent(renderMobile());
    }
  }

  React.useLayoutEffect(() => {
    window.addEventListener('resize', renderDeviceContent);
    return () => {
      window.removeEventListener('resize', renderDeviceContent)
    }
  });

  if (renderContent === undefined) {
    renderDeviceContent();
  }

  return (
    <div>
      {renderContent}
    </div>
  )
}

export default ResponsiveRenderer;
