import { graphql } from '@aegis/shared';

export const ARTICLE_REGISTERED_SUBSCRIPTION = graphql(`
  subscription OnArticleRegistered {
    onArticleRegistered {
      ...ArticleFields
    }
  }
`);

export const ARTICLE_DETAILS_UPDATED_SUBSCRIPTION = graphql(`
  subscription OnArticleDetailsUpdated {
    onArticleDetailsUpdated {
      ...ArticleFields
    }
  }
`);

export const ARTICLE_DISCONTINUED_SUBSCRIPTION = graphql(`
  subscription OnArticleDiscontinued {
    onArticleDiscontinued {
      id
    }
  }
`);
