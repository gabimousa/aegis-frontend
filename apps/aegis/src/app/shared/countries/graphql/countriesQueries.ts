import { graphql } from '../../../gql';

export const CountriesQuery = graphql(`
  query Countries {
    countries {
      code
      name
    }
  }
`);
