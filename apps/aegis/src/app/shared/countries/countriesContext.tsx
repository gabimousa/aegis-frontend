import { useQuery } from '@apollo/client/react';
import { createContext, PropsWithChildren } from 'react';
import { Alpha3Code, Country } from '../../gql/graphql';
import { CountriesQuery } from './graphql/countriesQueries';

type CountriesContextType = {
  countries: { code: Alpha3Code; name: string }[];
  countriesMap: Record<Alpha3Code, string>;
};

export const CountriesContext = createContext<CountriesContextType>({
  countries: [],
  countriesMap: {} as Record<Alpha3Code, string>,
});

export const CountriesProvider = ({ children }: PropsWithChildren) => {
  const { data } = useQuery(CountriesQuery, {
    fetchPolicy: 'cache-first',
  });

  const createMap = (countries: Country[]): Record<Alpha3Code, string> => {
    return (
      countries.reduce((map, { code, name }) => {
        map[code] = name;
        return map;
      }, {} as Record<Alpha3Code, string>) || {}
    );
  };

  return (
    <CountriesContext.Provider
      value={{
        countries: data?.countries || [],
        countriesMap: createMap(data?.countries || []),
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
};

export default CountriesContext;
