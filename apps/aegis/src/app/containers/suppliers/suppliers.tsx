import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Edit, Plus, Trash, TruckDelivery } from 'tabler-icons-react';
import DataGrid, { DataGridProps } from '../../components/data-grid/data-grid';
import { DataGridColumn } from '../../components/data-grid/data-grid-column';
import ListView from '../../components/list-view/list-view';
import { useSuppliers } from './data/useSuppliers';
import { Supplier } from './model/supplier';

export function Suppliers() {
  const pageSize = 10;
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const { data, loading, error, nextPage, prevPage } = useSuppliers(
    pageSize,
    searchTerm
  );

  const columns: DataGridColumn<Supplier>[] = [
    { header: t('common.code'), field: 'code', width: 150 },
    { header: t('common.name'), field: 'name' },
    { header: t('common.website'), field: 'website', width: 200 },
    { header: t('common.email'), field: 'email', width: 200 },
    {
      header: t('common.phoneNumber'),
      field: 'phoneNumber',
      width: 150,
    },
    { header: t('common.iban'), field: 'iban', width: 200 },
    { header: t('common.bic'), field: 'bic', width: 100 },
    {
      header: '',
      width: 100,
      cellTemplate: (supplier) => {
        return (
          <>
            <Button
              variant="outline-primary"
              size="sm"
              className="me-2"
              onClick={() => alert(supplier.name)}
            >
              <Edit size={16} />
            </Button>
            <Button variant="outline-danger" size="sm">
              <Trash size={16} />
            </Button>
          </>
        );
      },
    },
  ];

  const dataGridProps: DataGridProps<Supplier> = {
    keyAccessor: 'id',
    columns,
    data: data?.suppliers?.nodes ?? [],
  };

  const title = (
    <div className="d-flex align-items-center mb-3">
      <TruckDelivery size={32} className="me-3" />
      <h2 className="mb-0">{t('suppliers.title')}</h2>
    </div>
  );

  const actions = (
    <Button variant="primary" className="w-100">
      <Plus size={16} className="me-2" />
      {t('suppliers.addButton')}
    </Button>
  );
  const footerLabel = data?.suppliers?.totalCount
    ? t('suppliers.totalCount', {
        count: data.suppliers.totalCount,
      })
    : '';

  return (
    <ListView
      header={title}
      searchPlaceholder={t('suppliers.searchPlaceholder')}
      onSearchChange={setSearchTerm}
      actions={actions}
      loading={loading}
      loadingLabel={t('loading')}
      errorMessage={
        error && t('suppliers.errorLoading', { error: error?.message })
      }
      cardTitle={t('suppliers.listTitle')}
      showFooter={!!data?.suppliers?.pageInfo}
      footerLabel={footerLabel}
      onNextPage={nextPage}
      nextPageLabel={t('common.next')}
      onPrevPage={prevPage}
      prevPageLabel={t('common.previous')}
      isNextPageDisabled={!data?.suppliers?.pageInfo?.hasNextPage}
      isPrevPageDisabled={!data?.suppliers?.pageInfo?.hasPreviousPage}
    >
      <DataGrid {...dataGridProps} />
    </ListView>
  );
}
export default Suppliers;
