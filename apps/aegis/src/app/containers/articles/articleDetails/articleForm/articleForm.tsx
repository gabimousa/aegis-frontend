import { useTranslation } from 'react-i18next';
import { Input, TextArea } from '../../../../components';
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
    <fieldset className="fieldset border-base-100 rounded-box w-full">
      <Input
        label={t('common.code')}
        type="text"
        placeholder={t('articles.enterArticleCode')}
        className="mb-2"
        {...codeConfig.registerConfig}
        errors={errors}
        fieldName="code"
      />

      <Input
        label={t('common.name')}
        type="text"
        placeholder={t('articles.enterArticleName')}
        className="mb-2"
        {...nameConfig.registerConfig}
        errors={errors}
        fieldName="name"
      />

      <TextArea
        label={t('common.description')}
        placeholder={t('articles.enterArticleDescription')}
        className="mb-2"
        errors={errors}
        fieldName="description"
        {...descriptionConfig.registerConfig}
        rows={5}
        style={{ height: '100px' }}
      ></TextArea>

      <Input
        label={t('common.price')}
        type="number"
        placeholder={t('articles.enterArticlePrice')}
        className="mb-2"
        {...priceConfig.registerConfig}
        errors={errors}
        fieldName="price"
      />

      <Input
        label={t('common.sellingUnit')}
        type="number"
        placeholder={t('articles.enterArticleSellingUnit')}
        className="mb-2"
        {...sellingUnitConfig.registerConfig}
        errors={errors}
        fieldName="sellingUnit"
      />
    </fieldset>
  );
}
