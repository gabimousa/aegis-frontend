import { useMutateCache } from '@aegis/shared';
import { toGroup } from '@aegis/utils';
import { useMutation } from '@tanstack/react-query';
import { gqlClient } from '../../../../shared';
import { ArticleModel } from '../../model';
import { ARTICLES_QUERY_KEY, DISCONTINUE_ARTICLE_MUTATION } from '../graphql';

export const useDiscontinueArticle = () => {
  const { removeFromInfiniteData } = useMutateCache<ArticleModel>();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await gqlClient.request(DISCONTINUE_ARTICLE_MUTATION, { input: { id } });
      if (result.discontinueArticle.errors?.length) {
        throw toGroup(result.discontinueArticle.errors, 'fieldName');
      }
      return result;
    },
    onSuccess: (_, id) => {
      removeFromInfiniteData(id, ARTICLES_QUERY_KEY(), 'articles');
    },
  });
};
