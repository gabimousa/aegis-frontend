import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useMatch, useNavigate } from 'react-router';
import { Plus, Users } from 'tabler-icons-react';
import DataGrid, { DataGridProps } from '../../../components/data-grid/data-grid';
import { DataGridColumn } from '../../../components/data-grid/data-grid-column';
import MasterDetail from '../../../components/layout/masterDetail/masterDetail';
import ListView from '../../../components/listView/listView';
import { useCustomerList } from './data/useCustomerList';
import { Customer } from './model/customer';

export function CustomerList() {
  const pageSize = 10;
  const match = useMatch('/customers/:id');
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const { customers, pageInfo, totalCount, loading, error, nextPage, prevPage } = useCustomerList(
    pageSize,
    searchTerm
  );
  const navigate = useNavigate();

  const columns: DataGridColumn<Customer>[] = [
    { header: t('common.code'), field: 'code', width: 150 },
    { header: t('common.name'), field: 'name' },
    { header: t('common.website'), field: 'website', width: 200 },
    { header: t('common.email'), field: 'email', width: 200 },
    { header: t('common.phoneNumber'), field: 'phoneNumber', width: 150 },
    { header: t('common.iban'), field: 'iban', width: 200 },
    { header: t('common.bic'), field: 'bic', width: 100 },
  ];

  const actions = (
    <Button variant="primary" className="w-100" onClick={() => navigate('./NEW')}>
      <Plus size={16} className="me-2" />
      {t('common.add')}
    </Button>
  );

  const dataGridProps: DataGridProps<Customer> = {
    keyAccessor: 'id',
    columns,
    data: customers ?? [],
    onEdit: (item) => navigate(`./${item.id}`),
    onDelete: (item) => console.log('Delete', item),
  };

  const title = (
    <div className="d-flex align-items-center mb-3">
      <Users size={32} className="me-3" />
      <h2 className="mb-0">{t('customers.title')}</h2>
    </div>
  );

  const footerLabel = totalCount
    ? t('customers.totalCount', {
        count: totalCount,
      })
    : '';

  return (
    <MasterDetail detailsOpen={!!match} onBackdropClick={() => navigate('')}>
      <ListView
        header={title}
        searchPlaceholder={t('customers.searchPlaceholder')}
        onSearchChange={setSearchTerm}
        actions={actions}
        loading={loading}
        loadingLabel={t('loading')}
        errorMessage={error && t('customers.errorLoading', { error: error?.message })}
        cardTitle={t('customers.listTitle')}
        showFooter={!!pageInfo}
        footerLabel={footerLabel}
        onNextPage={nextPage}
        nextPageLabel={t('common.next')}
        onPrevPage={prevPage}
        prevPageLabel={t('common.previous')}
        isNextPageDisabled={!pageInfo?.hasNextPage}
        isPrevPageDisabled={!pageInfo?.hasPreviousPage}
      >
        <DataGrid {...dataGridProps} />
      </ListView>
    </MasterDetail>
  );
}
export default CustomerList;
