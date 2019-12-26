import * as React from 'react';
import { Footer } from './Footer';
import Header from './Header';
import './styles.scss';

interface MainLayoutProps { }

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
  <div className={'io-ml'}>
    <div className={'io-ml__header'}>
      <Header />
    </div>
    <div className={'io-ml__container'}>
      {children}
    </div>
    {/* <Footer /> */}
  </div>
)