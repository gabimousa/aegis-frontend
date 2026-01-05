import { useConfirm } from '@aegis/shared';
import { DataGrid, ListView } from '@aegis/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Plus, Users } from 'tabler-icons-react';
import { useSelectSuppliersDialog } from '../../selectSuppliersDialog';
import { useArticlesQuery } from '../data';
import { ArticleModel } from '../model';

type ArticleListProps = {
  enabledAdd?: boolean;
  enabledDelete?: boolean;
  enabledEdit?: boolean;
  onAdd?: () => void;
  onDelete?: (article: ArticleModel) => void;
  onEdit?: (article: ArticleModel) => void;
};

export function ArticleList({
  enabledAdd,
  enabledDelete,
  enabledEdit,
  onAdd,
  onDelete,
  onEdit,
}: ArticleListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const { confirm } = useConfirm();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { articles, totalCount, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useArticlesQuery({
      pageSize: 50,
      filters: searchTerm ? { name: { contains: searchTerm } } : undefined,
    });

  const { openDialog } = useSelectSuppliersDialog();

  const actions = enabledAdd ? (
    <button
      className="btn btn-lg btn-primary btn-outline btn-circle"
      onClick={() => navigate('./NEW')}
    >
      <Plus size={24} />
    </button>
  ) : undefined;

  const title = (
    <div className="flex items-center">
      <Users size={32} className="mr-3" />
      <h2 className="mb-0 text-2xl font-bold">{t('articles.title')}</h2>
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
        onEdit={enabledEdit ? (item) => onEdit && onEdit(item) : undefined}
        onDelete={enabledDelete ? (item) => onDelete && onDelete(item) : undefined}
        canLoadMore={hasNextPage && !isFetchingNextPage}
        onLoadMore={() => fetchNextPage()}
        loading={isLoading}
      />
    </ListView>
  );
}
