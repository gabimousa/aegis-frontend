import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Plus, Users } from 'tabler-icons-react';
import DataGrid, { DataGridProps } from '../../../components/data-grid/data-grid';
import { DataGridColumn } from '../../../components/data-grid/data-grid-column';
import ListView from '../../../components/listView/listView';
import CustomersDataContext from '../customersContext';
import { Customer } from '../model/customer';

export function CustomerList() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    customers,
    loadingCustomers,
    loadingCustomersError,
    setSearchTerm,
    pageInfo,
    totalCount,
    nextPage,
    prevPage,
    deactivate,
    deactivatingCustomer,
    deactivatingCustomerErrors,
  } = useContext(CustomersDataContext);

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
    onDelete: (item) => deactivate(item.id),
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
    <ListView
      header={title}
      searchPlaceholder={t('customers.searchPlaceholder')}
      onSearchChange={setSearchTerm}
      actions={actions}
      loading={loadingCustomers || deactivatingCustomer}
      loadingLabel={t('loading')}
      errorMessage={
        loadingCustomersError &&
        t('customers.errorLoading', { error: loadingCustomersError?.message })
      }
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
  );
}
export default CustomerList;
