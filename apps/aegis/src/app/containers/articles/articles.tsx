import { useMatch, useNavigate } from 'react-router';
import { MasterDetail } from '../../components';
import { ArticleList } from './articleList';
import { useArticleSubscriptions, useDiscontinueArticle } from './data';

export function Articles() {
  useArticleSubscriptions();
  const match = useMatch('/articles/:id');
  const navigate = useNavigate();
  const { mutate: discontinue } = useDiscontinueArticle();
  return (
    <MasterDetail detailsOpen={!!match} onBackdropClick={() => navigate('')}>
      <ArticleList
        enabledAdd
        enabledDelete
        enabledEdit
        onAdd={() => navigate('./NEW')}
        onDelete={(article) => discontinue(article.id)}
        onEdit={(article) => navigate(`./${encodeURIComponent(article.id)}`)}
      />
    </MasterDetail>
  );
}
