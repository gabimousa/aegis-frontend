import { type CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:5098/graphql',
  documents: ['apps/**/*.tsx', 'apps/**/*.ts'],
  generates: {
    './apps/aegis/src/app/gql/': {
      preset: 'client',
      config: {
        declarationKind: 'interface',
        enumsAsConst: true,
        maybeValue: 'T | undefined',
        // Input types should be nullable so they can be sent to the backend
        // to allow the backend to clear the field
        inputMaybeValue: 'T | null | undefined',
      },
    },
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;
