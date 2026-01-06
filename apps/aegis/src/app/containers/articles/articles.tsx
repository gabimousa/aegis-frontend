import { useConfirm } from '@aegis/shared';
import { useTranslation } from 'react-i18next';
import { useMatch, useNavigate } from 'react-router';
import { MasterDetail } from '../../components';
import { ArticleList } from './articleList';
import { useArticleSubscriptions, useDiscontinueArticle } from './data';
import { ArticleModel } from './model';

export function Articles() {
  useArticleSubscriptions();
  const match = useMatch('/articles/:id');
  const navigate = useNavigate();
  const { confirm } = useConfirm();
  const { t } = useTranslation();
  const { mutate: discontinue } = useDiscontinueArticle();

  const confirmDiscontinue = async (article: ArticleModel) => {
    const confirmed = await confirm(
      t('articles.discontinueArticleTitle'),
      t('articles.discontinueArticleMessage', { name: article.name }),
    );
    if (confirmed) {
      discontinue(article.id);
    }
  };

  return (
    <MasterDetail detailsOpen={!!match} onBackdropClick={() => navigate('')}>
      <ArticleList
        enabledAdd
        enabledDelete
        enabledEdit
        enableCustomActions={true}
        onAdd={() => navigate('./NEW')}
        onDelete={(article) => confirmDiscontinue(article)}
        onEdit={(article) => navigate(`./${encodeURIComponent(article.id)}`)}
      />
    </MasterDetail>
  );
}
