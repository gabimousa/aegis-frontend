// Uncomment this line to use CSS modules

import { Route, Routes } from 'react-router-dom';
import Articles from './containers/articles/articles';
import Customers from './containers/customers/customers';
import Suppliers from './containers/suppliers/suppliers';
import Layout from './components/layout/layout';
import TopBar from './components/top-bar/top-bar';
import styles from './app.module.scss';

export function App() {
  return (
    <div className={styles.app}>
      <TopBar />
      <Layout>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/customers" element={<Customers />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
