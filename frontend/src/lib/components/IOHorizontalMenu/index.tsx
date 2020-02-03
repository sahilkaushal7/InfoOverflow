import * as React from 'react';
import cn from 'classnames';
import './styles.scss';
import { withSize } from 'react-sizeme';

interface IOHorizontalMenuProps {
  menuItems: unknown[];
  renderMenuItem: (data: any, index?: number) => React.ReactNode;
  numOfCards: number;
  gutterWidth: string;
  size: {
    width: number;
  };
}

const IOHorizontalMenu: React.FC<IOHorizontalMenuProps> = ({ menuItems, renderMenuItem, numOfCards, gutterWidth, size }) => {
  const [scrollWidth, setScrollWidth] = React.useState(0);
  const [leftScrollable, setLeftScrollable] = React.useState(false);
  const [rightScrollable, setRightScrollable] = React.useState(true);
  const innerMenuRef = React.useRef({} as HTMLDivElement);
  const [showArrows, setShowArrows] = React.useState(false);
  let widthOfContainer = size.width;

  const roundedPositiveScrollWidth = Math.round(-scrollWidth);

  const checkLeftScrollable = () => {
    if (Math.round(scrollWidth) < 0) {
      setLeftScrollable(true);
    } else {
      setLeftScrollable(false);
    }
  }

  const checkRightScrollable = (widthOfInnerMenu: number) => {
    if (roundedPositiveScrollWidth < widthOfInnerMenu - widthOfContainer) {
      setRightScrollable(true);
    } else {
      setRightScrollable(false);
    }
  }

  React.useEffect(() => {
    const widthOfInnerMenu = innerMenuRef.current.offsetWidth;
    if (widthOfInnerMenu) {
      checkLeftScrollable();
      checkRightScrollable(widthOfInnerMenu);
    }

    if (menuItems.length > numOfCards) {
      setShowArrows(true);
    } else {
      setShowArrows(false);
    }

    window.addEventListener('resize', () => setScrollWidth(0));
    return () => {
      window.removeEventListener('resize', () => setScrollWidth(0))
    }
  });

  const scrollLeft = (widthOfMenuItem: number) => {
    if (scrollWidth < 0) {
      setScrollWidth(scrollWidth + widthOfMenuItem)
    }
  }

  const scrollRight = (widthOfMenuItem: number) => {
    const widthOfInnerMenu = innerMenuRef.current.offsetWidth;
    if (widthOfInnerMenu - widthOfContainer > roundedPositiveScrollWidth) {
      setScrollWidth(scrollWidth - widthOfMenuItem)
    }
  }

  const widthOfMenuItem = widthOfContainer / numOfCards;

  const disabledArrow = {
    pointerEvents: 'none' as 'none',
    opacity: '0.5',
  }

  const enabledArrow = {
    pointerEvents: 'auto' as 'auto',
    opacity: '1',
  }

  return (
    <>
      <div className={cn('io-horizontal__menu')}>
        <div className={cn('io-horizontal__innermenu')} ref={innerMenuRef} style={{ transform: `translate3d(${scrollWidth}px, 0px, 0px)` }}>
          {menuItems.map((item: unknown, i) => {
            return (
              <div
                key={i}
                className={cn('io-horizontal__innermenu-item')}
                style={{
                  width: `calc(${widthOfMenuItem - (2 * parseInt(gutterWidth, 10))}px)`,
                  margin: gutterWidth
                }}
              >
                {renderMenuItem(item)}
              </div>
            )
          })}
        </div>
      </div>
      {showArrows && <div className={cn('io-horizontal__menu-arrows')}>
        <div
          style={leftScrollable ? enabledArrow : disabledArrow}
          className={cn('io-horizontal__menu-arrow--left', 'io-clickable')}
          onClick={() => scrollLeft(widthOfMenuItem)}
        >
          <i className={cn('fa', 'fa-chevron-left')} />
        </div>
        <div
          style={rightScrollable ? enabledArrow : disabledArrow}
          className={cn('io-horizontal__menu-arrow--right', 'io-clickable')}
          onClick={() => scrollRight(widthOfMenuItem)}
        >
          <i className={cn('fa', 'fa-chevron-right')} />
        </div>
      </div>}
    </>
  )
}

export default withSize()(IOHorizontalMenu);
