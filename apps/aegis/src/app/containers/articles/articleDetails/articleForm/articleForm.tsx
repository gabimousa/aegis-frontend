import { FieldErrorsFeedback } from '@aegis/ui';
import { FloatingLabel, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useArticleDetailsFormConfig from '../useArticleDetailsFormConfig';

export function ArticleForm() {
  const { t } = useTranslation();
  const {
    codeConfig,
    nameConfig,
    descriptionConfig,
    priceConfig,
    sellingUnitConfig,
    formState: { errors },
  } = useArticleDetailsFormConfig();

  return (
    <>
      <Form.Group className="mb-2" controlId="articleCode">
        <FloatingLabel controlId="articleCode" label={t('common.code')}>
          <Form.Control
            type="text"
            placeholder={t('articles.enterArticleCode')}
            {...codeConfig.registerConfig}
            isInvalid={!!errors.code}
          />
          <FieldErrorsFeedback errors={errors} fieldName="code" />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-2" controlId="articleName">
        <FloatingLabel controlId="articleName" label={t('common.name')}>
          <Form.Control
            type="text"
            placeholder={t('articles.enterArticleName')}
            {...nameConfig.registerConfig}
            isInvalid={!!errors.name}
          />
          <FieldErrorsFeedback errors={errors} fieldName="name" />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-2" controlId="articleDescription">
        <FloatingLabel controlId="articleDescription" label={t('common.description')}>
          <Form.Control
            as="textarea"
            rows={5}
            style={{ height: '100px' }}
            placeholder={t('articles.enterArticleDescription')}
            {...descriptionConfig.registerConfig}
            isInvalid={!!errors.description}
          />
          <FieldErrorsFeedback errors={errors} fieldName="description" />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-2" controlId="price">
        <FloatingLabel controlId="price" label={t('common.price')}>
          <Form.Control
            type="number"
            placeholder={t('articles.enterArticlePrice')}
            {...priceConfig.registerConfig}
            isInvalid={!!errors.price}
          />
          <FieldErrorsFeedback errors={errors} fieldName="price" />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-2" controlId="sellingUnit">
        <FloatingLabel controlId="sellingUnit" label={t('common.sellingUnit')}>
          <Form.Control
            type="tel"
            placeholder={t('articles.enterArticleSellingUnit')}
            {...sellingUnitConfig.registerConfig}
            isInvalid={!!errors.sellingUnit}
          />
          <FieldErrorsFeedback errors={errors} fieldName="sellingUnit" />
        </FloatingLabel>
      </Form.Group>
    </>
  );
}
