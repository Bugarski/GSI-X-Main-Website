import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import './utils/fontawesome';
import './i18n/config';
import './design-system/index.scss';

export default function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
