import { ArticleDetailsFieldsFragment, FragmentFields } from '@aegis/shared';

export type ArticleSupplierModel = NonNullable<
  NonNullable<FragmentFields<Pick<ArticleDetailsFieldsFragment, 'suppliers'>>['suppliers']>['nodes']
>[0];
