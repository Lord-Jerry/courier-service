import express from 'express';
import db from './db';

const portOpts = {
  development: 4000,
  test: 5000
};

const app = express();
const { sequelize } = db;
const port = portOpts[process.env.NODE_ENV];

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

const sequelizeOpts = {
  development: {
    force: false
  },
  test: {
    force: true
  }
};

sequelize.sync(sequelizeOpts[process.env.NODE_ENV]).then(() => {
  app.listen(process.env.PORT || port, () => {
    console.log(`Server running on port ${port}`);
  });
});
