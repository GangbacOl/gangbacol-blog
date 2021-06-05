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
    dialectOptions: {
        useUTC: false,
        dateStrings: true,
        typeCast: true,
    },
    timezone: '+09:00',
    models: [Posts, Users],
    repositoryMode: true,
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
    },
});

export const postsRepository = sequelize.getRepository(Posts);
export const usersRepository = sequelize.getRepository(Users);

const sync = async () => {
    try {
        await sequelize.authenticate().then(async () => {
            console.log('database connection success');
        });
        await sequelize.sync();
    } catch (err) {
        console.error('database sycn failed');
        console.error(err);
    }
};

export default sync;
