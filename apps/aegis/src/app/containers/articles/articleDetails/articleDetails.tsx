import { RegisterArticleInput, setFieldErrors, UpdateArticleDetailsInput } from '@aegis/shared';
import { Tabs } from '@aegis/ui';
import { useEffect, useId, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMatch, useNavigate } from 'react-router';
import { User } from 'tabler-icons-react';
import { DetailsPanel } from '../../../components';
import { useArticleDetailsQuery, useSaveArticle } from '../data';
import { ArticleModel } from '../model';
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
  const {
    data: article,
    isError,
    isLoading,
    error,
  } = useArticleDetailsQuery({ id: match?.params.id === 'NEW' ? undefined : match?.params.id });

  const {
    mutate: saveArticleDetails,
    isPending: savingArticleDetails,
    isSuccess: saveArticleSuccess,
  } = useSaveArticle();

  const formProps = useForm<ArticleModel>({
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

  const onSubmit = async (formState: ArticleModel) => {
    console.log('Submitting article details:', formState);
    const idInput = formState?.id ? { id: formState.id } : {};
    try {
      const articleInput = {
        ...idInput,
        code: formState.code,
        name: formState.name,
        description: formState.description,
        price: Number.parseFloat(formState.price),
        sellingUnit: Number.parseFloat(formState.sellingUnit),
      } as RegisterArticleInput | UpdateArticleDetailsInput;

      saveArticleDetails(articleInput);
    } catch (error) {
      setFieldErrors(error, setError, serverErrorMap);
    }
  };

  const actions = (
    <div className="flex gap-2">
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
          </Tabs>
        </form>
      </FormProvider>
    </DetailsPanel>
  );
}
