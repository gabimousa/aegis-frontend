import { useConfirm } from '@aegis/shared';
import { DataGrid, ListView } from '@aegis/ui';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Plus, Users } from 'tabler-icons-react';
import { useCustomersQuery, useDeactivateCustomer } from '../data/hooks';

export function CustomerList() {
  const [searchTerm, setSearchTerm] = useState('');
  const { confirm } = useConfirm();
  const navigate = useNavigate();
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
  const { mutate: deactivate } = useDeactivateCustomer();
  const actions = (
    <Button variant="primary" className="text-nowrap" onClick={() => navigate('./NEW')}>
      <Plus size={16} className="me-2" />
      {t('common.add')}
    </Button>
  );

  const title = (
    <div className="d-flex align-items-center">
      <Users size={32} className="me-3" />
      <h2 className="mb-0">{t('customers.title')}</h2>
    </div>
  );

  return (
    <ListView
      header={title}
      searchValue={searchTerm}
      searchPlaceholder={t('customers.searchPlaceholder')}
      onSearchChange={setSearchTerm}
      actions={actions}
      errorMessage={
        error
          ? t('customers.errorLoading', { error: error?.message }) + (console.error(error) ?? '')
          : undefined
      }
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
        onEdit={(item) => navigate(`./${encodeURIComponent(item.id)}`)}
        onDelete={async (item) => {
          const confirmed = await confirm(
            t('customers.deactivateCustomerTitle'),
            t('customers.deactivateCustomerMessage', { name: item.name })
          );
          if (confirmed) {
            await deactivate(item.id);
          }
        }}
        canLoadMore={hasNextPage && !isFetchingNextPage}
        onLoadMore={() => fetchNextPage()}
        loading={isLoading}
      />
    </ListView>
  );
}
export default CustomerList;
