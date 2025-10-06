import { type CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:5098/graphql',
  documents: ['apps/**/*.tsx', 'apps/**/*.ts'],
  generates: {
    './apps/aegis/src/app/gql/': {
      preset: 'client',
    },
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;
