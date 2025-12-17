import { useMatch, useNavigate } from 'react-router';
import MasterDetail from '../../components/layout/masterDetail/masterDetail';
import ArticleList from './articleList/articleList';
import { ArticlesDataProvider } from './data/articlesContext';

function Articles() {
  const match = useMatch('/articles/:id');
  const navigate = useNavigate();

  return (
    <ArticlesDataProvider>
      <MasterDetail detailsOpen={!!match} onBackdropClick={() => navigate('')}>
        <ArticleList />
      </MasterDetail>
    </ArticlesDataProvider>
  );
}

export default Articles;
