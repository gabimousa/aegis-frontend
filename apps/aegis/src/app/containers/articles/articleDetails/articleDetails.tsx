import { RegisterArticleInput, setFieldErrors, UpdateArticleDetailsInput } from '@aegis/shared';
import { useEffect, useId, useState } from 'react';
import { Alert, Button, Form, Spinner, Tab, Tabs } from 'react-bootstrap';
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
    <>
      <Button variant="secondary" onClick={() => navigate('..')}>
        {t('common.cancel')}
      </Button>
      <Button
        variant="primary"
        form={detailsFormId}
        type="submit"
        disabled={savingArticleDetails || !isValid || !isDirty}
      >
        {savingArticleDetails ? <Spinner animation="border" size="sm" className="me-2" /> : null}
        {t('common.save')}
      </Button>
    </>
  );

  return (
    <DetailsPanel
      title={
        <>
          <User size={24} className="me-2" /> {article?.name || t('New Article')}
        </>
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
              <Alert key={'root-error-' + idx} variant="danger">
                {error}
              </Alert>
            ))
        ) : (
          <Alert variant="danger">{errors.root?.message}</Alert>
        ))}
      <FormProvider {...formProps}>
        <Form id={detailsFormId} noValidate onSubmit={handleSubmit(onSubmit)}>
          <Tabs activeKey={activeTab} onSelect={(tab) => setActiveTab(tab ?? 'details')}>
            <Tab className="pt-3" eventKey="details" title={t('common.details')}>
              {isError ? <p>Error: {error?.message}</p> : <ArticleForm />}
            </Tab>
          </Tabs>
        </Form>
      </FormProvider>
    </DetailsPanel>
  );
}
