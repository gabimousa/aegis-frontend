import {
  RegisterArticleInput,
  UpdateArticleDetailsInput,
  useMutateCache,
  useToast,
} from '@aegis/shared';
import { toGroup } from '@aegis/utils';
import { useMutation } from '@tanstack/react-query';
import { gqlClient } from '../../../../shared';
import { ArticleModel } from '../../model';
import {
  ARTICLES_QUERY_KEY,
  REGISTER_ARTICLE_MUTATION,
  UPDATE_ARTICLE_DETAILS_MUTATION,
} from '../graphql';
import { useTranslation } from 'react-i18next';

export const useSaveArticle = () => {
  const { upsertInfiniteData, updateInInfiniteData } = useMutateCache<ArticleModel>();
  const { success, error } = useToast();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (input: RegisterArticleInput | UpdateArticleDetailsInput) => {
      if ('id' in input) {
        const result = await gqlClient.request(UPDATE_ARTICLE_DETAILS_MUTATION, { input });
        if (result.updateArticleDetails.errors?.length) {
          throw toGroup(result.updateArticleDetails.errors, 'fieldName');
        }
        return result;
      }
      const result = await gqlClient.request(REGISTER_ARTICLE_MUTATION, { input });
      if (result.registerArticle.errors?.length) {
        throw toGroup(result.registerArticle.errors, 'fieldName');
      }
      return result;
    },
    onSuccess: (data) => {
      if (!data) return;
      success(t('articles.saveArticleSuccess'));

      if ('registerArticle' in data) {
        const savedArticle = data.registerArticle.article as ArticleModel;
        upsertInfiniteData(savedArticle, ARTICLES_QUERY_KEY(), 'articles');
      } else {
        const savedArticle = data.updateArticleDetails.article as ArticleModel;
        updateInInfiniteData(savedArticle, ARTICLES_QUERY_KEY(), 'articles');
      }
    },
    onError: () => {
      error(t('articles.saveArticleError'));
    },
  });
};
