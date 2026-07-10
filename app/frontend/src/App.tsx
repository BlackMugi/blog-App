import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ArticlesList from './pages/ArticlesList';
import ArticleDetail from './pages/ArticleDetail';
import ArticleForm from './pages/ArticleForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ArticlesList />} />
          <Route path="/articles/new" element={<ArticleForm />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
          <Route path="/articles/:id/edit" element={<ArticleForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;