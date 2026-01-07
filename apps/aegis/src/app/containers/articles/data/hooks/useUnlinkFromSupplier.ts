import { ArticleDetailsFieldsFragment, UnlinkFromSupplierInput } from '@aegis/shared';
import { toGroup } from '@aegis/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { gqlClient } from '../../../../shared';
import { ARTICLE_DETAILS_QUERY_KEY, UNLINK_FROM_SUPPLIER_MUTATION } from '../graphql';
export const useUnlinkFromSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UnlinkFromSupplierInput) => {
      const result = await gqlClient.request(UNLINK_FROM_SUPPLIER_MUTATION, {
        input,
      });
      if (result.unlinkFromSupplier.errors?.length) {
        throw toGroup(result.unlinkFromSupplier.errors, 'fieldName');
      }
      return result;
    },
    onSuccess: (data, input) => {
      queryClient.setQueryData(
        ARTICLE_DETAILS_QUERY_KEY(input.articleId),
        (oldData: { linkToSupplier: ArticleDetailsFieldsFragment }) => {
          console.log('OLD DATA', oldData);
          return {
            ...oldData,
            articleById: data.unlinkFromSupplier.article,
          };
        },
      );
    },
  });
};
