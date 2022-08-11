import {Table, Column, Model, HasMany, PrimaryKey, CreatedAt, UpdatedAt} from 'sequelize-typescript';
import { Col } from 'sequelize/types/lib/utils';

//creating a Table
@Table
export class User extends Model<User> {
    @PrimaryKey
    @Column
    public email!: string;

    @Column
    public password_hash!: string; //for nullable fields

    @Column
    @CreatedAt
    public createdAt: Date = new Date();

    @Column
    @UpdatedAt
    public updatedAt: Date = new Date();

    short () {
        return {
            email: this.email
        }
    }
}