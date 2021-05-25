import { Table, Column, Model, PrimaryKey, AutoIncrement, Unique } from 'sequelize-typescript';

@Table
export default class Users extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    username: string;

    @Unique
    @Column
    account: string;

    @Column
    password: string;
}
