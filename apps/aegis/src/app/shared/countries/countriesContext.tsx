import { Alpha3Code, Country } from '@aegis/shared';
import { useQuery } from '@tanstack/react-query';
import { createContext, PropsWithChildren } from 'react';
import { gqlClient } from '../services';
import { COUNTRIES_QUERY, COUNTRIES_QUERY_KEY } from './graphql/countriesQueries';

type CountriesContextType = {
  countries: { code: Alpha3Code; name: string }[];
  countriesMap: Record<Alpha3Code, string>;
};

export const CountriesContext = createContext<CountriesContextType>({
  countries: [],
  countriesMap: {} as Record<Alpha3Code, string>,
});

export const CountriesProvider = ({ children }: PropsWithChildren) => {
  const { data } = useQuery({
    queryKey: [COUNTRIES_QUERY_KEY],
    queryFn: async () => gqlClient.request(COUNTRIES_QUERY),
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
