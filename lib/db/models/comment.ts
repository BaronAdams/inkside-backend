import { DataTypes, Model, Optional, type Sequelize } from 'sequelize';
// fn("uuid_generate_v4")

export interface ICommentAttributes {
    id: string;
    authorId: string;
    postId: string;
    content: string;
    replies?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICommentCreationAttributes extends Optional<ICommentAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Comment extends Model<ICommentAttributes, ICommentCreationAttributes> implements ICommentAttributes {
    public id!: string;
    public authorId!: string;
    public postId!: string;
    public content!: string;
    public replies!: string[];
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function CommentModel(sequelize: Sequelize){
    Comment.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        authorId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        postId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        replies: {
            type: DataTypes.ARRAY(DataTypes.UUID),
            allowNull: true,
            defaultValue: []
        }
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
    });
    
    return Comment;
}