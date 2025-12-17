import { graphql } from '@aegis/shared';

export const onArticleRegisteredSubscription = graphql(`
  subscription OnArticleRegistered {
    onArticleRegistered {
      ...ArticleFields
    }
  }
`);

export const onArticleDetailsUpdatedSubscription = graphql(`
  subscription OnArticleDetailsUpdated {
    onArticleDetailsUpdated {
      ...ArticleFields
    }
  }
`);

export const onArticleDiscontinuedSubscription = graphql(`
  subscription OnArticleDiscontinued {
    onArticleDiscontinued {
      id
    }
  }
`);
