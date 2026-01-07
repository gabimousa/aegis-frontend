import { ArticleDetailsFieldsFragment, FragmentFields } from '@aegis/shared';

export type ArticleDetailsModel = Omit<FragmentFields<ArticleDetailsFieldsFragment>, 'suppliers'>;
