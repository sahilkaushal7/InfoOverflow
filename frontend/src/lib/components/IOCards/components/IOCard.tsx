import * as React from 'react';
import cn from 'classnames';

interface IOCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const IOCard: React.FC<IOCardProps> = ({ children, className }) => {
  return (
    <div className={cn('io-card', className)}>
      {children}
    </div>
  )
}
