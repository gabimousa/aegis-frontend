import { useMatch, useNavigate } from 'react-router';
import { MasterDetail } from '../../components';
import { ArticleList } from './articleList';
import { useArticleSubscriptions } from './data';

export function Articles() {
  useArticleSubscriptions();
  const match = useMatch('/articles/:id');
  const navigate = useNavigate();

  return (
    <MasterDetail detailsOpen={!!match} onBackdropClick={() => navigate('')}>
      <ArticleList />
    </MasterDetail>
  );
}
