export default {
  development: {
    config: {
      dialect: 'postgres',
      define: {
        underscored: true
      }
    },
    url: process.env.DATABASE_DEV_URI
  },
  test: {
    config: {
      dialect: 'postgres',
      define: {
        underscored: true
      }
    },
    url: process.env.DATABASE_TEST_URI
  }
};
