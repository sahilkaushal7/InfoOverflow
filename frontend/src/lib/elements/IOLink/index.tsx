import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import cn from 'classnames';

interface IOLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

const IOLink: React.FunctionComponent<IOLinkProps> = ({ to, ...rest }) => (
  <RouterLink
    to={to}
    {...rest}
    className={cn('io-iolink')}
  />
)

export default IOLink;