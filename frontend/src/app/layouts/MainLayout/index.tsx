import * as React from 'react';
import { Footer } from './Footer';
import Header from './Header';

interface MainLayoutProps { }

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
  <div>
    <Header />
    {children}
    <Footer />
  </div>
)