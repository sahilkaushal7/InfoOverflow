import * as React from 'react';
// import { Footer } from './Footer';
import Header from './Header';
import './styles.scss';
import cn from 'classnames';

interface MainLayoutProps { }

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
  <div className={cn('io-ml')}>
    <div className={cn('io-ml__header')}>
      <Header />
    </div>
    <div className={cn('io-ml__container')}>
      {children}
    </div>
    {/* <Footer /> */}
  </div>
)