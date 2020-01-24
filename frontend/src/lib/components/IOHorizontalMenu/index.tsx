import * as React from 'react';
import cn from 'classnames';
import './styles.scss';
import { SizeMe } from 'react-sizeme'

interface IOHorizontalMenuProps {
  menuItems: unknown[];
  renderMenuItem: (data: any, index?: number) => React.ReactNode;
  numOfCards: number;
  gutterWidth: string;
}

export const IOHorizontalMenu: React.FC<IOHorizontalMenuProps> = ({ menuItems, renderMenuItem, numOfCards, gutterWidth }) => {
  const [scrollWidth, setScrollWidth] = React.useState(0);
  // const [leftScrollable, setLeftScrollable] = React.useState(false);
  // const [rightScrollable, setRightScrollable] = React.useState(true);
  const innerMenuRef = React.useRef({} as HTMLDivElement);
  const scrollLeft = (widthOfMenuItem: number) => {
    if (scrollWidth < 0) {
      setScrollWidth(scrollWidth + widthOfMenuItem)
    }
  }

  const scrollRight = (widthOfContainer: number, widthOfMenuItem: number) => {
    const widthOfInnerMenu = innerMenuRef.current.offsetWidth;
    if (widthOfInnerMenu - widthOfContainer > Math.round(-scrollWidth)) {
      setScrollWidth(scrollWidth - widthOfMenuItem)
    }
  }
  return (
    <SizeMe>
      {({ size }) => {
        const widthOfContainer = size.width!;
        const widthOfMenuItem = widthOfContainer / numOfCards;
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
            <div className={cn('io-horizontal__menu-arrows')}>
              <div className={cn('io-horizontal__menu-arrow--left', 'io-clickable')} onClick={() => scrollLeft(widthOfMenuItem)}>
                <i className={cn('fa', 'fa-chevron-left')} />
              </div>
              <div className={cn('io-horizontal__menu-arrow--right', 'io-clickable')} onClick={() => scrollRight(widthOfContainer, widthOfMenuItem)}>
                <i className={cn('fa', 'fa-chevron-right')} />
              </div>
            </div>
          </>
        )
      }}
    </SizeMe>
  )
}
