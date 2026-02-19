import {
  RegisterArticleInput,
  setFieldErrors,
  UpdateArticleDetailsInput,
  useConfirm,
} from '@aegis/shared';
import { Tabs } from '@aegis/ui';
import { useEffect, useId, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMatch, useNavigate } from 'react-router';
import { Link, Unlink, User } from 'tabler-icons-react';
import { DetailsPanel } from '../../../components';
import { useSelectSuppliersDialog } from '../../selectSuppliersDialog';
import {
  useArticleDetailsQuery,
  useLinkToSupplier,
  useSaveArticle,
  useUnlinkFromSupplier,
} from '../data';
import { ArticleDetailsModel } from '../model';
import { ArticleForm } from './articleForm';

const serverErrorMap: Record<string, string> = {
  Code: 'code',
  Name: 'name',
  Description: 'description',
  Price: 'price',
  SellingUnit: 'sellingUnit',
};

export function ArticleDetails() {
  const [activeTab, setActiveTab] = useState('details');
  const detailsFormId = useId();
  const navigate = useNavigate();
  const match = useMatch('/articles/:id');
  const { t } = useTranslation();
  const { openDialog } = useSelectSuppliersDialog();
  const { confirm } = useConfirm();
  const {
    data: article,
    suppliers,
    isError,
    isLoading,
    error,
  } = useArticleDetailsQuery({ id: match?.params.id === 'NEW' ? undefined : match?.params.id });

  const {
    mutate: saveArticleDetails,
    isPending: savingArticleDetails,
    isSuccess: saveArticleSuccess,
    error: saveArticleError,
  } = useSaveArticle();

  const { mutate: linkToSupplier } = useLinkToSupplier();
  const { mutate: unlinkFromSupplier } = useUnlinkFromSupplier();

  const formProps = useForm<ArticleDetailsModel>({
    mode: 'all',
    defaultValues: {
      code: '',
      name: '',
      description: '',
      price: '',
      sellingUnit: '',
    },
  });
  const {
    reset,
    setError,
    handleSubmit,
    formState: { isValid, isDirty, errors },
  } = formProps;

  useEffect(() => {
    reset(article);
  }, [article, reset]);

  useEffect(() => {
    if (saveArticleSuccess) {
      navigate('..');
    }
  }, [saveArticleSuccess, navigate]);

  useEffect(() => {
    if (saveArticleError) {
      setFieldErrors(saveArticleError, setError, serverErrorMap);
    }
  }, [saveArticleError, setError]);

  const onSubmit = async (formState: ArticleDetailsModel) => {
    console.log('Submitting article details:', formState);
    const idInput = formState?.id ? { id: formState.id } : {};

    const articleInput = {
      ...idInput,
      code: formState.code,
      name: formState.name,
      description: formState.description,
      price: Number.parseFloat(formState.price),
      sellingUnit: Number.parseFloat(formState.sellingUnit),
    } as RegisterArticleInput | UpdateArticleDetailsInput;

    saveArticleDetails(articleInput);
  };

  const actions = (
    <div className="flex gap-2">
      {activeTab === 'suppliers' && (
        <button
          className="btn btn-secondary"
          onClick={async () => {
            const result = await openDialog();
            if (result) {
              linkToSupplier({
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                articleId: article!.id,
                supplierId: result.id,
              });
            }
          }}
        >
          <Link></Link> {t('articles.linkSupplier')}
        </button>
      )}
      <button className="btn btn-secondary" onClick={() => navigate('...')}>
        {t('common.cancel')}
      </button>
      <button
        className={`btn btn-primary ${
          savingArticleDetails || !isValid || !isDirty ? 'btn-disabled' : ''
        }`}
        form={detailsFormId}
        type="submit"
        disabled={savingArticleDetails || !isValid || !isDirty}
      >
        {savingArticleDetails ? (
          <span className="loading loading-spinner loading-sm mr-2"></span>
        ) : null}
        {t('common.save')}
      </button>
    </div>
  );

  return (
    <DetailsPanel
      title={
        <div className="flex items-center">
          <User size={24} className="mr-2" /> {article?.name || t('New Article')}
        </div>
      }
      onClose={() => navigate('..')}
      actions={actions}
      loading={isLoading || savingArticleDetails}
    >
      {errors.root &&
        (errors.root.types ? (
          Object.values(errors.root.types)
            .flatMap((v) => v)
            .map((error, idx) => (
              <div key={'root-error-' + idx} className="alert alert-error mb-4">
                <span>{error}</span>
              </div>
            ))
        ) : (
          <div className="alert alert-error mb-4">
            <span>{errors.root?.message}</span>
          </div>
        ))}
      <FormProvider {...formProps}>
        <form id={detailsFormId} noValidate onSubmit={handleSubmit(onSubmit)}>
          <Tabs>
            <Tabs.Tab
              label={t('common.details')}
              active={activeTab === 'details'}
              onSelect={() => setActiveTab('details')}
            >
              {isError ? <p className="text-error">Error: {error?.message}</p> : <ArticleForm />}
            </Tabs.Tab>
            {article && (
              <Tabs.Tab
                label={t('suppliers.title')}
                active={activeTab === 'suppliers'}
                onSelect={() => setActiveTab('suppliers')}
              >
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>{t('common.code')}</th>
                      <th>{t('common.name')}</th>
                      <th className="max-w-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {suppliers?.map((supplier) => (
                      <tr key={supplier.id} className="hover:bg-base-300">
                        <td className="w-16">{supplier.code}</td>
                        <td className="w-full">{supplier.name}</td>
                        <td>
                          <span
                            className="btn btn-ghost btn-xs btn-error"
                            onClick={async () => {
                              const confirmed = await confirm(
                                t('articles.confirmUnlinkSupplierTitle'),
                                t('articles.confirmUnlinkSupplier', {
                                  supplierName: supplier.name,
                                }),
                              );
                              if (confirmed) {
                                unlinkFromSupplier({
                                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                  articleId: article!.id,
                                  supplierId: supplier.id,
                                });
                              }
                            }}
                          >
                            <Unlink></Unlink>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Tabs.Tab>
            )}
          </Tabs>
        </form>
      </FormProvider>
    </DetailsPanel>
  );
}
