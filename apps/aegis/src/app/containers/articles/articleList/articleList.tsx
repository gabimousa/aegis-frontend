import { useConfirm } from '@aegis/shared';
import { DataGrid, DataGridColumn, DataGridProps, ListView } from '@aegis/ui';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Plus, Users } from 'tabler-icons-react';
import { useArticles } from '../data/articlesContext';
import { ArticleModel } from '../model';

export function ArticleList() {
  const { confirm } = useConfirm();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    list: {
      articles,
      loadingArticles,
      loadingArticlesError,
      setSearchTerm,
      totalCount,
      loadMore,
      canLoadMore,
    },
    details: { discontinue, discontinuingArticle, savingArticleDetails },
  } = useArticles();

  const columns: DataGridColumn<ArticleModel>[] = [
    { header: t('common.code'), field: 'code', width: 150 },
    { header: t('common.name'), field: 'name' },
    { header: t('common.price'), field: 'price', width: 150 },
    { header: t('common.sellingUnit'), field: 'sellingUnit', width: 100 },
  ];

  const actions = (
    <Button variant="primary" className="text-nowrap" onClick={() => navigate('./NEW')}>
      <Plus size={16} className="me-2" />
      {t('common.add')}
    </Button>
  );

  const dataGridProps: DataGridProps<ArticleModel> = {
    keyAccessor: 'id',
    columns,
    data: articles ?? [],
    onEdit: (item) => navigate(`./${encodeURIComponent(item.id)}`),
    onDelete: async (item) => {
      const confirmed = await confirm(
        t('articles.discontinueArticleTitle'),
        t('articles.discontinueArticleMessage', { name: item.name })
      );
      if (confirmed) {
        await discontinue(item.id);
      }
    },
    loading: loadingArticles || savingArticleDetails || discontinuingArticle,
  };

  const title = (
    <div className="d-flex align-items-center">
      <Users size={32} className="me-3" />
      <h2 className="mb-0">{t('articles.title')}</h2>
    </div>
  );

  const footerLabel = totalCount
    ? t('articles.totalCount', {
        count: totalCount,
      })
    : '';

  return (
    <ListView
      header={title}
      searchPlaceholder={t('articles.searchPlaceholder')}
      onSearchChange={setSearchTerm}
      actions={actions}
      errorMessage={
        loadingArticlesError && t('articles.errorLoading', { error: loadingArticlesError?.message })
      }
      showFooter={!!articles}
      footerLabel={footerLabel}
      loadMoreLabel={t('common.loadMore')}
      onLoadMore={() => loadMore()}
      canLoadMore={canLoadMore}
    >
      <DataGrid {...dataGridProps} />
    </ListView>
  );
}
export default ArticleList;
