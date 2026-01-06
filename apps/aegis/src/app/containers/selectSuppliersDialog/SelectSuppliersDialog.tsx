import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SupplierModel } from '../suppliers/model';
import { SupplierList } from '../suppliers/supplierList';

type SelectSuppliersDialogProps = {
  onConfirm: (supplier: SupplierModel) => void;
  onCancel: () => void;
};

export function SelectSuppliersDialog({ onConfirm, onCancel }: SelectSuppliersDialogProps) {
  const { t } = useTranslation();
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierModel | null>(null);

  return (
    <div className="flex h-full flex-col">
      <SupplierList
        enabledAdd={false}
        enabledDelete={false}
        enabledEdit={false}
        enableSelect={true}
        onSelect={(supplier) => {
          setSelectedSupplier(supplier);
        }}
      />
      <div className="border-base-300 flex justify-end gap-2 border-t p-4">
        <button
          className={`btn btn-secondary`}
          onClick={() => {
            onCancel();
          }}
        >
          {t('common.cancel')}
        </button>
        <button
          className={`btn btn-primary ${!selectedSupplier ? 'btn-disabled' : ''}`}
          disabled={!selectedSupplier}
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            onConfirm(selectedSupplier!);
          }}
        >
          {t('common.confirm')}
        </button>
      </div>
    </div>
  );
}
