import { DataGrid, ListView } from '@aegis/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Link, Pencil, Plus, Trash, Unlink, Users } from 'tabler-icons-react';
import { useSelectSuppliersDialog } from '../../selectSuppliersDialog';
import { useArticlesQuery } from '../data';
import { ArticleModel } from '../model';

type ArticleListProps = {
  enabledAdd?: boolean;
  enabledDelete?: boolean;
  enabledEdit?: boolean;
  enableCustomActions?: boolean;
  onAdd?: () => void;
  onDelete?: (article: ArticleModel) => void;
  onEdit?: (article: ArticleModel) => void;
};

export function ArticleList({
  enabledAdd,
  enabledDelete,
  enabledEdit,
  enableCustomActions,
  onAdd,
  onDelete,
  onEdit,
}: ArticleListProps) {
  const [searchTerm, setSearchTerm] = useState('');
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
          { header: t('common.price'), field: 'price', width: 150, align: 'right' },
          { header: t('common.sellingUnit'), field: 'sellingUnit', width: 100, align: 'right' },
        ]}
        data={articles}
        onEdit={enabledEdit ? (item) => onEdit && onEdit(item) : undefined}
        editLabel={
          <>
            <Pencil size={16}></Pencil> {t('common.edit')}
          </>
        }
        onDelete={enabledDelete ? (item) => onDelete && onDelete(item) : undefined}
        deleteLabel={
          <>
            <Trash size={16}></Trash> {t('common.delete')}
          </>
        }
        customActions={
          enableCustomActions
            ? [
                {
                  key: 'LINK_SUPPLIER',
                  label: (
                    <>
                      <Link size={16} /> {t('articles.linkSupplier')}
                    </>
                  ),
                },
                {
                  key: 'UNLINK_SUPPLIER',
                  label: (
                    <>
                      <Unlink size={16} /> {t('articles.unlinkSupplier')}
                    </>
                  ),
                },
              ]
            : undefined
        }
        onAction={async (action, article) => {
          if (action.key === 'LINK_SUPPLIER') {
            const supplier = await openDialog();
            console.log('Selected supplier to link:', supplier, article);
          }
        }}
        canLoadMore={hasNextPage && !isFetchingNextPage}
        onLoadMore={() => fetchNextPage()}
        loading={isLoading}
      />
    </ListView>
  );
}
