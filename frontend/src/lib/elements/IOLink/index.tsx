import * as React from 'react';
import { NavLink as RouterLink, NavLinkProps } from 'react-router-dom';
import cn from 'classnames';

interface IOLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, NavLinkProps {
  to: string;
  className?: string;
}

const IOLink: React.FunctionComponent<IOLinkProps> = ({ to, className, ...rest }) => (
  <RouterLink
    to={to}
    {...rest}
    className={cn('io-iolink', className)}
  />
)

export default IOLink;