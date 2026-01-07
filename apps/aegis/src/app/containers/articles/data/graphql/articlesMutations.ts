import { graphql } from '@aegis/shared';

export const REGISTER_ARTICLE_MUTATION = graphql(`
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

export const UPDATE_ARTICLE_DETAILS_MUTATION = graphql(`
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

export const DISCONTINUE_ARTICLE_MUTATION = graphql(`
  mutation discontinueArticle($input: DiscontinueArticleInput!) {
    discontinueArticle(input: $input) {
      boolean
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

export const LINK_TO_SUPPLIER_MUTATION = graphql(`
  mutation linkToSupplier($input: LinkToSupplierInput!) {
    linkToSupplier(input: $input) {
      article {
        ...ArticleFields
        suppliers {
          nodes {
            id
            code
            name
          }
        }
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

export const UNLINK_FROM_SUPPLIER_MUTATION = graphql(`
  mutation unlinkFromSupplier($input: UnlinkFromSupplierInput!) {
    unlinkFromSupplier(input: $input) {
      article {
        ...ArticleFields
        suppliers {
          nodes {
            id
            code
            name
          }
        }
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
