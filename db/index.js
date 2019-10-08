import { Sequelize, DataTypes } from 'sequelize';
import config from './config';
import definitions from '../models';

const { UserDefinition } = definitions;

// Load configuration based on environment
const configuration = config[process.env.NODE_ENV];

const sequelize = new Sequelize(configuration.url, configuration.config);

const models = {
  User: UserDefinition(sequelize, DataTypes)
};

Object.keys(models).forEach((model) => {
  if (models[model].associate) {
    models[model].associate(models);
  }
});

const db = {
  models,
  sequelize
};

export default db;
