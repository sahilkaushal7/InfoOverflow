import * as React from 'react';
import cn from 'classnames';
import './styles.scss';

interface IOHorizontalMenuProps {
  menuItems: unknown[];
  renderMenuItem: (data: any, index?: number) => React.ReactNode;
}

export const IOHorizontalMenu: React.FC<IOHorizontalMenuProps> = ({ menuItems, renderMenuItem }) => {
  return (
    <div className={cn('io-horizontal__menu')}>
      <div className={cn('io-horizontal__innermenu')}>
        {menuItems.map((item: unknown) => {
          return <div className={cn('io-horizontal__innermenu-item')}>{renderMenuItem(item)}</div>
        })}
      </div>
    </div>
  )
}
