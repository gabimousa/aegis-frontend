import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useMatch, useNavigate } from 'react-router';
import { Edit, Plus, Trash, Users } from 'tabler-icons-react';
import DataGrid, {
  DataGridProps,
} from '../../../components/data-grid/data-grid';
import { DataGridColumn } from '../../../components/data-grid/data-grid-column';
import MasterDetail from '../../../components/layout/master-detail/master-detail';
import ListView from '../../../components/list-view/list-view';
import { useCustomerList } from './data/useCustomerList';
import { Customer } from './model/customer';

export function CustomerList() {
  const pageSize = 10;
  const match = useMatch('/customers/:id');
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const { data, loading, error, nextPage, prevPage } = useCustomerList(
    pageSize,
    searchTerm
  );
  const navigate = useNavigate();

  const columns: DataGridColumn<Customer>[] = [
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
      cellTemplate: (customer) => {
        return (
          <>
            <Button
              variant="outline-primary"
              size="sm"
              className="me-2"
              onClick={() => navigate(`./${customer.id}`)}
            >
              <Edit size={16} />
            </Button>
            <Button variant="outline-primary" size="sm">
              <Trash size={16} />
            </Button>
          </>
        );
      },
    },
  ];

  const dataGridProps: DataGridProps<Customer> = {
    keyAccessor: 'id',
    columns,
    data: data?.customers?.nodes ?? [],
  };

  const title = (
    <div className="d-flex align-items-center mb-3">
      <Users size={32} className="me-3" />
      <h2 className="mb-0">{t('customers.title')}</h2>
    </div>
  );

  const actions = (
    <Button variant="primary" className="w-100">
      <Plus size={16} className="me-2" />
      {t('common.add')}
    </Button>
  );
  const footerLabel = data?.customers?.totalCount
    ? t('customers.totalCount', {
        count: data.customers.totalCount,
      })
    : '';

  return (
    <MasterDetail detailsOpen={!!match}>
      <ListView
        header={title}
        searchPlaceholder={t('customers.searchPlaceholder')}
        onSearchChange={setSearchTerm}
        actions={actions}
        loading={loading}
        loadingLabel={t('loading')}
        errorMessage={
          error && t('customers.errorLoading', { error: error?.message })
        }
        cardTitle={t('customers.listTitle')}
        showFooter={!!data?.customers?.pageInfo}
        footerLabel={footerLabel}
        onNextPage={nextPage}
        nextPageLabel={t('common.next')}
        onPrevPage={prevPage}
        prevPageLabel={t('common.previous')}
        isNextPageDisabled={!data?.customers?.pageInfo?.hasNextPage}
        isPrevPageDisabled={!data?.customers?.pageInfo?.hasPreviousPage}
      >
        <DataGrid {...dataGridProps} />
      </ListView>
    </MasterDetail>
  );
}
export default CustomerList;
