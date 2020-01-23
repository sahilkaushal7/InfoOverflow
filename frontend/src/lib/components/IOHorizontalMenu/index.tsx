import * as React from 'react';
import cn from 'classnames';
import './styles.scss';
import { SizeMe } from 'react-sizeme'

interface IOHorizontalMenuProps {
  menuItems: unknown[];
  renderMenuItem: (data: any, index?: number) => React.ReactNode;
  numOfCards: number;
}

export const IOHorizontalMenu: React.FC<IOHorizontalMenuProps> = ({ menuItems, renderMenuItem, numOfCards }) => {
  return (

    <SizeMe>{({ size }) =>
      <div>
        <div className={cn('io-horizontal__menu')}>
          <div className={cn('io-horizontal__innermenu')}>
            {menuItems.map((item: unknown, i) => {
              return (
                <div
                  key={i}
                  className={cn('io-horizontal__innermenu-item')}
                  style={{
                    width: `calc(${size!.width! / numOfCards}px)`
                  }}
                >
                  {renderMenuItem(item)}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    }</SizeMe>
  )
}
