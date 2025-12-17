import { formatNumber } from '@aegis/utils';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ArticleModel } from '../model';

function useArticleDetailsFormConfig() {
  const { t } = useTranslation();
  const { register, setValue, formState } = useFormContext<ArticleModel>();

  const codeFormConfig = register('code', {
    maxLength: { value: 50, message: t('articles.codeTooLong') },
    required: t('articles.codeIsRequired'),
  });

  const nameFormConfig = register('name', {
    maxLength: { value: 100, message: t('articles.nameTooLong') },
    required: t('articles.nameIsRequired'),
  });

  const descriptionFormConfig = register('description', {
    maxLength: { value: 1000, message: t('articles.descriptionTooLong') },
  });

  const priceFormConfig = register('price', {
    pattern: {
      value: /^-?\d*\.?\d+$/,
      message: t('articles.pleaseProvideValidPrice'),
    },
    max: { value: 999999999999999, message: t('articles.priceTooHigh') },
    required: t('articles.priceIsRequired'),
    onBlur: (e) => {
      setValue('price', formatNumber(e.target.value ? Number(e.target.value) : 0));
    },
  });
  const sellingUnitFormConfig = register('sellingUnit', {
    pattern: {
      value: /^-?\d*\.?\d+$/,
      message: t('articles.pleaseProvideValidSellingUnit'),
    },
    max: { value: 999999999999999, message: t('articles.sellingUnitTooHigh') },
    required: t('articles.sellingUnitIsRequired'),
    onBlur: (e) => {
      setValue('sellingUnit', formatNumber(e.target.value ? Number(e.target.value) : 0));
    },
  });

  return {
    codeConfig: { registerConfig: codeFormConfig },
    nameConfig: { registerConfig: nameFormConfig },
    descriptionConfig: { registerConfig: descriptionFormConfig },
    priceConfig: { registerConfig: priceFormConfig },
    sellingUnitConfig: { registerConfig: sellingUnitFormConfig },
    formState,
  };
}

export default useArticleDetailsFormConfig;
