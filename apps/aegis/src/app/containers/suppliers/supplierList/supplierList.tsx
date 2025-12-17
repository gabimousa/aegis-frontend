import { useConfirm } from '@aegis/shared';
import { DataGrid, DataGridColumn, DataGridProps, ListView } from '@aegis/ui';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Plus, Users } from 'tabler-icons-react';
import SuppliersDataContext from '../data/suppliersContext';
import { SupplierModel } from '../model';

export function SupplierList() {
  const { confirm } = useConfirm();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    list: {
      suppliers,
      loadingSuppliers,
      loadingSuppliersError,
      setSearchTerm,
      totalCount,
      loadMore,
      canLoadMore,
    },
    details: { deactivate, deactivatingSupplier },
  } = useContext(SuppliersDataContext);

  const columns: DataGridColumn<SupplierModel>[] = [
    { header: t('common.code'), field: 'code', width: 150 },
    { header: t('common.name'), field: 'name' },
    { header: t('common.website'), field: 'website', width: 200 },
    { header: t('common.email'), field: 'email', width: 200 },
    { header: t('common.phoneNumber'), field: 'phoneNumber', width: 150 },
    { header: t('common.iban'), field: 'iban', width: 200 },
    { header: t('common.bic'), field: 'bic', width: 100 },
  ];

  const actions = (
    <Button variant="primary" className="text-nowrap" onClick={() => navigate('./NEW')}>
      <Plus size={16} className="me-2" />
      {t('common.add')}
    </Button>
  );

  const dataGridProps: DataGridProps<SupplierModel> = {
    keyAccessor: 'id',
    columns,
    data: suppliers ?? [],
    onEdit: (item) => navigate(`./${encodeURIComponent(item.id)}`),
    onDelete: async (item) => {
      const confirmed = await confirm(
        t('suppliers.deactivateSupplierTitle'),
        t('suppliers.deactivateSupplierMessage', { name: item.name })
      );
      if (confirmed) {
        await deactivate(item.id);
      }
    },
  };

  const title = (
    <div className="d-flex align-items-center">
      <Users size={32} className="me-3" />
      <h2 className="mb-0">{t('suppliers.title')}</h2>
    </div>
  );

  const footerLabel = totalCount
    ? t('suppliers.totalCount', {
        count: totalCount,
      })
    : '';

  return (
    <ListView
      header={title}
      searchPlaceholder={t('suppliers.searchPlaceholder')}
      onSearchChange={setSearchTerm}
      actions={actions}
      loading={loadingSuppliers || deactivatingSupplier}
      loadingLabel={t('loading')}
      errorMessage={
        loadingSuppliersError &&
        t('suppliers.errorLoading', { error: loadingSuppliersError?.message })
      }
      showFooter={!!suppliers}
      footerLabel={footerLabel}
      loadMoreLabel={t('common.loadMore')}
      onLoadMore={() => loadMore()}
      canLoadMore={canLoadMore}
    >
      <DataGrid {...dataGridProps} />
    </ListView>
  );
}
export default SupplierList;
