import { Table, Column, Model, PrimaryKey, DataType, AutoIncrement, AllowNull } from 'sequelize-typescript';

@Table
export default class FilePosts extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Column
    title: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    description: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    content: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    imageUrls: string;
}
