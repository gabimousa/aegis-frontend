import { formatNumber } from '@aegis/utils';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ArticleDetailsModel } from '../model';

function useArticleDetailsFormConfig() {
  const { t } = useTranslation();
  const { register, setValue, formState } = useFormContext<ArticleDetailsModel>();

  const codeFormConfig = register('code', {
    maxLength: { value: 50, message: t('articles.codeTooLong') },
    required: t('articles.codeIsRequired'),
    pattern: { value: /^(?!\s*$).+/, message: t('articles.codeCannotBeEmpty') },
  });

  const nameFormConfig = register('name', {
    maxLength: { value: 100, message: t('articles.nameTooLong') },
    required: t('articles.nameIsRequired'),
    pattern: { value: /^(?!\s*$).+/, message: t('articles.nameCannotBeEmpty') },
  });

  const descriptionFormConfig = register('description', {
    maxLength: { value: 1000, message: t('articles.descriptionTooLong') },
  });

  const priceFormConfig = register('price', {
    pattern: {
      value: /^-?\d*\.?\d+$/,
      message: t('articles.pleaseProvideValidPrice'),
    },
    max: { value: Number.MAX_VALUE, message: t('articles.priceTooHigh') },
    validate: (value) => parseFloat(value) > 0 || t('articles.pleaseProvideValidPrice'),
    required: t('articles.priceIsRequired'),
    onBlur: (e) => {
      setValue('price', formatNumber(e.target.value ? Number(e.target.value) : 0), {
        shouldValidate: true,
      });
    },
  });
  const sellingUnitFormConfig = register('sellingUnit', {
    pattern: {
      value: /^-?\d*\.?\d+$/,
      message: t('articles.pleaseProvideValidSellingUnit'),
    },
    max: { value: Number.MAX_VALUE, message: t('articles.sellingUnitTooHigh') },
    validate: (value) => parseFloat(value) > 0 || t('articles.pleaseProvideValidSellingUnit'),
    required: t('articles.sellingUnitIsRequired'),
    onBlur: (e) => {
      setValue('sellingUnit', formatNumber(e.target.value ? Number(e.target.value) : 0), {
        shouldValidate: true,
      });
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
