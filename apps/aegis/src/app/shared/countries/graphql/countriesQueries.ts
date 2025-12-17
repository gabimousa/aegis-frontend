import { graphql } from '@aegis/shared';

export const CountriesQuery = graphql(`
  query Countries {
    countries {
      code
      name
    }
  }
`);
