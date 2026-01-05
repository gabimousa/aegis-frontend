import { useConfirm } from '@aegis/shared';
import { DataGrid, ListView } from '@aegis/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Plus, Users } from 'tabler-icons-react';
import { useDeactivateSupplier, useSuppliersQuery } from '../data';

export function SupplierList() {
  const [searchTerm, setSearchTerm] = useState('');
  const { confirm } = useConfirm();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    suppliers,
    totalCount,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSuppliersQuery({
    pageSize: 50,
    filters: searchTerm ? { name: { contains: searchTerm } } : undefined,
  });
  const { mutate: deactivate } = useDeactivateSupplier();
  const actions = (
    <button
      className="btn btn-lg btn-primary btn-outline btn-circle"
      onClick={() => navigate('./NEW')}
    >
      <Plus size={24} />
    </button>
  );

  const title = (
    <div className="flex items-center">
      <Users size={32} className="mr-3" />
      <h2 className="mb-0 text-2xl font-bold">{t('suppliers.title')}</h2>
    </div>
  );

  return (
    <ListView
      header={title}
      searchValue={searchTerm}
      searchPlaceholder={t('suppliers.searchPlaceholder')}
      onSearchChange={setSearchTerm}
      actions={actions}
      errorMessage={error ? t('suppliers.errorLoading', { error: error?.message }) : undefined}
      showFooter={!!suppliers}
      footerLabel={t('suppliers.totalCount', {
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
        data={suppliers}
        onEdit={(item) => navigate(`./${encodeURIComponent(item.id)}`)}
        onDelete={async (item) => {
          const confirmed = await confirm(
            t('suppliers.deactivateSupplierTitle'),
            t('suppliers.deactivateSupplierMessage', { name: item.name }),
          );
          if (confirmed) {
            deactivate(item.id);
          }
        }}
        canLoadMore={hasNextPage && !isFetchingNextPage}
        onLoadMore={() => fetchNextPage()}
        loading={isLoading}
      />
    </ListView>
  );
}
