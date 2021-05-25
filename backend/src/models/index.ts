import { Sequelize } from 'sequelize-typescript';
import config from '../config/db';

import Posts from './Posts';
import Users from './Users';

const sequelize = new Sequelize({
    database: config.development.database,
    username: config.development.username,
    password: config.development.password,
    host: config.development.host,
    dialect: 'mysql',
    models: [Posts, Users],
    repositoryMode: true,
});

export const postsRepository = sequelize.getRepository(Posts);
export const usersRepository = sequelize.getRepository(Users);

const sync = async () => {
    await sequelize.authenticate().then(async () => {
        try {
            console.log('database connection success');
            await sequelize.sync();
        } catch (err) {
            console.error('database sycn failed');
            console.error(err);
        }
    });
};

export default sync;
