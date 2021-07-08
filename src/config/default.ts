export const config = {
  aws: {
    access_key_id: 'access_key_id',
    secret_access_key: 'secret_access_key',
    region: 'region',
  },
  graphql: {
    debug: true,
    playground: {
      settings: {
        'request.credentials': 'include',
      },
    },
    autoSchemaFile: 'schema.gql',
    // cors: { credentials: true },
    // sortSchema: true,
    // installSubscriptionHandlers: true,
  },
  hello: 'world',
  jwtSecret: process.env.JWT_SECRET || '8940d87d-c82c-4ae0-be5d-cd770487074c',
  // commas
  commas: {
    autoFetch: true,
  },
  strapiApiPath: 'http://localhost:1337',
};
