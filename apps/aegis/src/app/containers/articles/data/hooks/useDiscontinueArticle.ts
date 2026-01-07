import { useMutateCache, useToast } from '@aegis/shared';
import { toGroup } from '@aegis/utils';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { gqlClient } from '../../../../shared';
import { ArticleModel } from '../../model';
import { ARTICLES_QUERY_KEY, DISCONTINUE_ARTICLE_MUTATION } from '../graphql';

export const useDiscontinueArticle = () => {
  const { removeFromInfiniteData } = useMutateCache<ArticleModel>();
  const { success, error } = useToast();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await gqlClient.request(DISCONTINUE_ARTICLE_MUTATION, { input: { id } });
      if (result.discontinueArticle.errors?.length) {
        throw toGroup(result.discontinueArticle.errors, 'fieldName');
      }
      return result;
    },
    onSuccess: (_, id) => {
      success(t('articles.discontinueArticleSuccess'));
      removeFromInfiniteData(id, ARTICLES_QUERY_KEY(), 'articles');
    },
    onError: () => {
      error(t('articles.discontinueArticleError'));
    },
  });
};
