import { useConfirm } from '@aegis/shared';
import { DataGrid, ListView } from '@aegis/ui';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Plus, Users } from 'tabler-icons-react';
import { useState } from 'react';
import { useArticlesQuery, useDiscontinueArticle } from '../data';

export function ArticleList() {
  const [searchTerm, setSearchTerm] = useState('');
  const { confirm } = useConfirm();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { articles, totalCount, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useArticlesQuery({
      pageSize: 50,
      filters: searchTerm ? { name: { contains: searchTerm } } : undefined,
    });
  const { mutate: discontinue } = useDiscontinueArticle();

  const actions = (
    <Button variant="primary" className="text-nowrap" onClick={() => navigate('./NEW')}>
      <Plus size={16} className="me-2" />
      {t('common.add')}
    </Button>
  );

  const title = (
    <div className="d-flex align-items-center">
      <Users size={32} className="me-3" />
      <h2 className="mb-0">{t('articles.title')}</h2>
    </div>
  );

  return (
    <ListView
      header={title}
      searchValue={searchTerm}
      searchPlaceholder={t('articles.searchPlaceholder')}
      onSearchChange={setSearchTerm}
      actions={actions}
      errorMessage={error ? t('articles.errorLoading', { error: error?.message }) : undefined}
      showFooter={!!articles}
      footerLabel={t('articles.totalCount', {
        count: totalCount,
      })}
    >
      <DataGrid
        keyAccessor="id"
        columns={[
          { header: t('common.code'), field: 'code', width: 150 },
          { header: t('common.name'), field: 'name' },
          { header: t('common.price'), field: 'price', width: 150 },
          { header: t('common.sellingUnit'), field: 'sellingUnit', width: 100 },
        ]}
        data={articles}
        onEdit={(item) => navigate(`./${encodeURIComponent(item.id)}`)}
        onDelete={async (item) => {
          const confirmed = await confirm(
            t('articles.discontinueArticleTitle'),
            t('articles.discontinueArticleMessage', { name: item.name })
          );
          if (confirmed) {
            discontinue(item.id);
          }
        }}
        canLoadMore={hasNextPage && !isFetchingNextPage}
        onLoadMore={() => fetchNextPage()}
        loading={isLoading}
      />
    </ListView>
  );
}
