import * as React from 'react';
import sass from '../../styles/sassVariables';

enum PriortizedRenderers {
  DESKTOP = 0,
  LAPTOP = 1,
  TABLET = 2,
  MOBILELANDSCAPE = 3,
  MOBILE = 4,
}

interface ResponsiveRendererProps {
  renderMobile?: () => React.ReactNode;
  renderMobileLandscape?: () => React.ReactNode;
  renderTablet?: () => React.ReactNode;
  renderLaptop?: () => React.ReactNode;
  renderDesktop: () => React.ReactNode;
}

const parsePxInt = (px: string) => parseInt(px, 10);

const parsedMaxMobile = parsePxInt(sass.maxMobile);
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

  const priortizedRender = {
    [`${PriortizedRenderers.DESKTOP}`]: renderDesktop,
    [`${PriortizedRenderers.LAPTOP}`]: renderLaptop,
    [`${PriortizedRenderers.TABLET}`]: renderTablet,
    [`${PriortizedRenderers.MOBILELANDSCAPE}`]: renderMobileLandscape,
    [`${PriortizedRenderers.MOBILE}`]: renderMobileLandscape,
  };

  const renderCondition = (min: number, max: number, windowSize: number) => {
    return ((windowSize >= min && windowSize <= max))
  }

  const getRenderer = (priority: number) => {
    const previousRenderer = priortizedRender[`${priority - 1}`];
    if (previousRenderer) {
      setRenderContent(previousRenderer());
    } else if (priority > -1) {
      getRenderer(priority - 1);
    }
  }

  const renderDeviceContent = () => {
    const windowSize = window.screen.width;
    if ((windowSize > parsedMinDesktop)) {
      setRenderContent(renderDesktop());
    } else if (renderCondition(parsedMinLaptop, parsedMaxLaptop, windowSize)) {
      renderLaptop ? setRenderContent(renderLaptop()) : getRenderer(PriortizedRenderers.LAPTOP);
    } else if (renderCondition(parsedMinTablet, parsedMaxTablet, windowSize)) {
      renderTablet ? setRenderContent(renderTablet()) : getRenderer(PriortizedRenderers.TABLET);
    } else if (renderCondition(parsedMinMobileLandscape, parsedMaxMobileLandscape, windowSize)) {
      renderMobileLandscape ? setRenderContent(renderMobileLandscape()) : getRenderer(PriortizedRenderers.MOBILELANDSCAPE);
    } else if (windowSize <= parsedMaxMobile) {
      renderMobile ? setRenderContent(renderMobile()) : getRenderer(PriortizedRenderers.MOBILE);
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
