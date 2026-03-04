import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../organisms/Header/Header';
import Footer from '../organisms/Footer/Footer';
import styles from './PageLayout.module.scss';

export default function PageLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={styles.layout}>
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
