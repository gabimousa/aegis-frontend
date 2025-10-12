// Uncomment this line to use CSS modules

import { Route, Routes } from 'react-router-dom';
import styles from './app.module.scss';
import Content from './components/layout/content';
import TopBar from './components/layout/topBar';
import Articles from './containers/articles/articles';
import Customers from './containers/customers/customers';
import Suppliers from './containers/suppliers/suppliers';

export function App() {
  return (
    <div className={styles.app}>
      <TopBar />
      <Content>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/customers" element={<Customers />} />
        </Routes>
      </Content>
    </div>
  );
}

export default App;
