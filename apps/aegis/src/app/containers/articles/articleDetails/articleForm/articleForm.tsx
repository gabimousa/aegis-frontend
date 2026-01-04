import { FieldErrorsFeedback } from '@aegis/ui';
import { useTranslation } from 'react-i18next';
import { FloatingLabelInput } from '../../../../components';
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
      <FloatingLabelInput
        label={t('common.code')}
        type="text"
        placeholder={t('articles.enterArticleCode')}
        className="mb-2"
        {...codeConfig.registerConfig}
        errors={errors}
        fieldName="code"
      />

      <FloatingLabelInput
        label={t('common.name')}
        type="text"
        placeholder={t('articles.enterArticleName')}
        className="mb-2"
        {...nameConfig.registerConfig}
        errors={errors}
        fieldName="name"
      />

      <FloatingLabelInput
        label={t('common.description')}
        className="mb-2"
        errors={errors}
        fieldName="description"
      >
        <textarea
          rows={5}
          style={{ height: '100px' }}
          className={`textarea textarea-bordered w-full ${
            errors.description ? 'textarea-error' : ''
          }`}
          placeholder={t('articles.enterArticleDescription')}
          {...descriptionConfig.registerConfig}
        />
      </FloatingLabelInput>

      <FloatingLabelInput
        label={t('common.price')}
        type="number"
        placeholder={t('articles.enterArticlePrice')}
        className="mb-2"
        {...priceConfig.registerConfig}
        errors={errors}
        fieldName="price"
      />

      <FloatingLabelInput
        label={t('common.sellingUnit')}
        type="tel"
        placeholder={t('articles.enterArticleSellingUnit')}
        className="mb-2"
        {...sellingUnitConfig.registerConfig}
        errors={errors}
        fieldName="sellingUnit"
      />
    </>
  );
}
