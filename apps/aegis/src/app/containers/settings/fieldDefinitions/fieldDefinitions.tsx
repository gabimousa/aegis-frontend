import { useConfirm } from '@aegis/shared';
import { useTranslation } from 'react-i18next';
import { useMatch, useNavigate } from 'react-router';
import { MasterDetail } from '../../../components';
import { useDeleteFieldDefinition } from './data';
import { FieldDefinitionList } from './fieldDefinitionList';
import { FieldDefinitionModel } from './model';

export function FieldDefinitions() {
  const navigate = useNavigate();
  const { confirm } = useConfirm();
  const { t } = useTranslation();
  const match = useMatch('/settings/field-definitions/:id');
  const { mutate: deleteFieldDefinition } = useDeleteFieldDefinition();

  const confirmDelete = async (fieldDefinition: FieldDefinitionModel) => {
    const confirmed = await confirm(
      t('settings.fieldDefinitions.deleteFieldDefinitionTitle'),
      t('settings.fieldDefinitions.deleteFieldDefinitionMessage', { key: fieldDefinition.key }),
    );
    if (confirmed) {
      deleteFieldDefinition(fieldDefinition.id);
    }
  };

  return (
    <MasterDetail detailsOpen={!!match} onBackdropClick={() => navigate('')}>
      <FieldDefinitionList
        enabledAdd
        enabledEdit
        enabledDelete
        onAdd={() => navigate('./NEW')}
        onEdit={(fieldDefinition) => navigate(`/settings/field-definitions/${fieldDefinition.id}`)}
        onDelete={confirmDelete}
      />
    </MasterDetail>
  );
}
