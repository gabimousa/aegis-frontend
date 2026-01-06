import { DataGrid, ListView } from '@aegis/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pencil, Plus, Trash, Users } from 'tabler-icons-react';
import { useCustomersQuery } from '../data';
import { CustomerModel } from '../model';

type CustomerListProps = {
  enabledAdd?: boolean;
  enabledDelete?: boolean;
  enabledEdit?: boolean;
  onAdd?: () => void;
  onDelete?: (customer: CustomerModel) => void;
  onEdit?: (customer: CustomerModel) => void;
};

export function CustomerList({
  enabledAdd,
  enabledDelete,
  enabledEdit,
  onAdd,
  onDelete,
  onEdit,
}: CustomerListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation();
  const {
    customers,
    totalCount,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCustomersQuery({
    pageSize: 50,
    filters: searchTerm ? { name: { contains: searchTerm } } : undefined,
  });

  const actions = enabledAdd ? (
    <button
      className="btn btn-lg btn-primary btn-outline btn-circle"
      onClick={() => onAdd && onAdd()}
    >
      <Plus size={24} />
    </button>
  ) : undefined;

  const title = (
    <div className="flex items-center">
      <Users size={32} className="mr-3" />
      <h2 className="mb-0 text-2xl font-bold">{t('customers.title')}</h2>
    </div>
  );

  return (
    <ListView
      header={title}
      searchValue={searchTerm}
      searchPlaceholder={t('customers.searchPlaceholder')}
      onSearchChange={setSearchTerm}
      actions={actions}
      errorMessage={error ? t('customers.errorLoading', { error: error?.message }) : undefined}
      showFooter={!!customers}
      footerLabel={t('customers.totalCount', {
        count: totalCount || 0,
      })}
    >
      <DataGrid
        keyAccessor="id"
        columns={[
          { header: t('common.code'), field: 'code', width: 150 },
          { header: t('common.name'), field: 'name' },
          { header: t('common.website'), field: 'website', width: 200 },
          { header: t('common.email'), field: 'email', width: 200 },
          { header: t('common.phoneNumber'), field: 'phoneNumber', width: 150 },
          { header: t('common.iban'), field: 'iban', width: 200 },
          { header: t('common.bic'), field: 'bic', width: 100 },
        ]}
        data={customers}
        onEdit={enabledEdit ? (item) => onEdit && onEdit(item) : undefined}
        editLabel={
          <>
            <Pencil className="text-accent" size={16}></Pencil> {t('common.edit')}
          </>
        }
        onDelete={enabledDelete ? (item) => onDelete && onDelete(item) : undefined}
        deleteLabel={
          <>
            <Trash className="text-error" size={16}></Trash> {t('common.delete')}
          </>
        }
        canLoadMore={hasNextPage && !isFetchingNextPage}
        onLoadMore={() => fetchNextPage()}
        loading={isLoading}
      />
    </ListView>
  );
}
