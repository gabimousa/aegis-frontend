import { ArticleDetailsFieldsFragment, LinkToSupplierInput, useToast } from '@aegis/shared';
import { toGroup } from '@aegis/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { gqlClient } from '../../../../shared';
import { ARTICLE_DETAILS_QUERY_KEY, LINK_TO_SUPPLIER_MUTATION } from '../graphql';
export const useLinkToSupplier = () => {
  const queryClient = useQueryClient();
  const { success, error } = useToast();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (input: LinkToSupplierInput) => {
      const result = await gqlClient.request(LINK_TO_SUPPLIER_MUTATION, {
        input,
      });
      if (result.linkToSupplier.errors?.length) {
        throw toGroup(result.linkToSupplier.errors, 'fieldName');
      }
      return result;
    },
    onSuccess: (data, input) => {
      success(t('articles.linkToSupplierSuccess'));
      queryClient.setQueryData(
        ARTICLE_DETAILS_QUERY_KEY(input.articleId),
        (oldData: { linkToSupplier: ArticleDetailsFieldsFragment }) => {
          console.log('OLD DATA', oldData);
          return {
            ...oldData,
            articleById: data.linkToSupplier.article,
          };
        },
      );
    },
    onError: () => {
      error(t('articles.linkToSupplierError'));
    },
  });
};
