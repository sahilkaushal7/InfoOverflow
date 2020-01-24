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
  return (
    <SizeMe>{({ size }) => {
      const widthOfContainer = size.width;
      const widthOfMenuItem = widthOfContainer! / numOfCards - 2 * parseInt(gutterWidth, 10);
      console.log(widthOfMenuItem, scrollWidth);
      return (
        <div>
          <div className={cn('io-horizontal__menu')}>
            <div className={cn('io-horizontal__innermenu')} style={{ transform: `translate3d(${scrollWidth}px, 0px, 0px)`}}>
              {menuItems.map((item: unknown, i) => {
                return (
                  <div
                    key={i}
                    className={cn('io-horizontal__innermenu-item')}
                    style={{
                      width: `calc(${widthOfMenuItem}px)`,
                      margin: gutterWidth
                    }}
                  >
                    {renderMenuItem(item)}
                  </div>
                )
              })}
            </div>
          </div>
          <div>
            <div onClick={() => setScrollWidth(scrollWidth - widthOfMenuItem)}>
              Left
          </div>
            <div onClick={() => setScrollWidth(scrollWidth + widthOfMenuItem)}>
              Right
          </div>
          </div>
        </div>
      )
    }
    }</SizeMe>
  )
}
