import { RegisterArticleInput, setFieldErrors, UpdateArticleDetailsInput } from '@aegis/shared';
import { useContext, useEffect, useId, useState } from 'react';
import { Alert, Button, Form, Spinner, Tab, Tabs } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMatch, useNavigate } from 'react-router';
import { User } from 'tabler-icons-react';
import DetailsPanel from '../../../components/layout/detailsPanel/detailsPanel';
import ArticlesDataContext from '../data/articlesContext';
import { ArticleModel } from '../model';
import ArticleForm from './articleForm/articleForm';

const serverErrorMap: Record<string, string> = {
  Code: 'code',
  Name: 'name',
  Description: 'description',
  Price: 'price',
  SellingUnit: 'sellingUnit',
};

function ArticleDetails() {
  const [activeTab, setActiveTab] = useState('details');
  const detailsFormId = useId();
  const navigate = useNavigate();
  const match = useMatch('/articles/:id');
  const { t } = useTranslation();
  const {
    details: {
      selectArticle,
      selectedArticle: article,
      loadingArticleDetails,
      loadingArticleDetailsError,
      saveArticleDetails,
      savingArticleDetails,
    },
  } = useContext(ArticlesDataContext);

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
    const articleId = match?.params.id;
    selectArticle(articleId);
    return () => selectArticle(undefined);
  }, [match?.params.id, selectArticle]);

  useEffect(() => {
    reset(article);
  }, [article, reset]);

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

      const result = await saveArticleDetails(articleInput);
      result && navigate('..');
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
      loading={loadingArticleDetails || savingArticleDetails}
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
              {loadingArticleDetailsError ? (
                <p>Error: {loadingArticleDetailsError.message}</p>
              ) : (
                <ArticleForm />
              )}
            </Tab>
          </Tabs>
        </Form>
      </FormProvider>
    </DetailsPanel>
  );
}
export default ArticleDetails;
