import { DataGrid, ListView } from '@aegis/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pencil, Plus, Trash } from 'tabler-icons-react';
import { useFieldDefinitionsQuery } from '../data';
import { FieldDefinitionModel } from '../model';

type FieldDefinitionListProps = {
  enabledAdd?: boolean;
  enabledDelete?: boolean;
  enabledEdit?: boolean;
  onAdd?: () => void;
  onDelete?: (fieldDefinition: FieldDefinitionModel) => void;
  onEdit?: (fieldDefinition: FieldDefinitionModel) => void;
};

export function FieldDefinitionList({
  enabledAdd,
  enabledDelete,
  enabledEdit,
  onAdd,
  onDelete,
  onEdit,
}: FieldDefinitionListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation();
  const {
    fieldDefinitions,
    totalCount,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFieldDefinitionsQuery({
    pageSize: 50,
    filters: searchTerm ? { key: { contains: searchTerm } } : undefined,
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
      <h2 className="mb-0 text-2xl font-bold">{t('fieldDefinitions.title')}</h2>
    </div>
  );

  return (
    <ListView
      header={title}
      searchValue={searchTerm}
      searchPlaceholder={t('fieldDefinitions.searchPlaceholder')}
      onSearchChange={setSearchTerm}
      actions={actions}
      errorMessage={
        error ? t('fieldDefinitions.errorLoading', { error: error?.message }) : undefined
      }
      showFooter={!!fieldDefinitions}
      footerLabel={t('fieldDefinitions.totalCount', {
        count: totalCount || 0,
      })}
    >
      <DataGrid
        keyAccessor="id"
        columns={[
          { header: t('fieldDefinitions.key'), field: 'key', width: 150 },
          { header: t('fieldDefinitions.label'), field: 'label', width: 400 },
          { header: t('fieldDefinitions.type'), field: 'type', width: 200 },
          { header: t('fieldDefinitions.description'), field: 'description' },
        ]}
        data={fieldDefinitions}
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
