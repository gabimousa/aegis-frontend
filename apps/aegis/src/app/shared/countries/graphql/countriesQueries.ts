import { graphql } from '@aegis/shared';

export const COUNTRIES_QUERY_KEY = 'COUNTRIES_QUERY';

export const COUNTRIES_QUERY = graphql(`
  query Countries {
    countries {
      code
      name
    }
  }
`);
