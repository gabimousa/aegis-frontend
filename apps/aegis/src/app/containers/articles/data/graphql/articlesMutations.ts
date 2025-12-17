import { graphql } from '@aegis/shared';

export const registerArticleMutation = graphql(`
  mutation registerArticle($input: RegisterArticleInput!) {
    registerArticle(input: $input) {
      article {
        ...ArticleFields
      }
      errors {
        ... on ApplicationError {
          code
          description
          type
          fieldName
          message
        }
      }
    }
  }
`);

export const updateArticleDetailsMutation = graphql(`
  mutation updateArticleDetails($input: UpdateArticleDetailsInput!) {
    updateArticleDetails(input: $input) {
      article {
        ...ArticleFields
      }
      errors {
        ... on ApplicationError {
          code
          description
          type
          fieldName
          message
        }
      }
    }
  }
`);

export const discontinueArticleMutation = graphql(`
  mutation discontinueArticle($input: DiscontinueArticleInput!) {
    discontinueArticle(input: $input) {
      errors {
        ... on ApplicationError {
          code
          description
          type
          fieldName
          message
        }
      }
    }
  }
`);
