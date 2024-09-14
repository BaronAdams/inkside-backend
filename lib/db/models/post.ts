import sequelize from '../config'
import { DataTypes, Model, Optional } from 'sequelize';
import User from './user';

export interface IPostAttributes{
    id: string;
    title?: string;
    isDraft?: boolean;
    content?: string;
    categories?: string[];
    authorId: string;
    coverPic?: string;
    views?: number;
    likes?: string[];
    shares?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IPostCreationAttributes extends Optional<IPostAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Post extends Model<IPostAttributes, IPostCreationAttributes> implements IPostAttributes {
    public id!: string;
    public title!: string;
    public isDraft: boolean;
    public content!: string;
    public categories: string[];
    public authorId!: string;
    public coverPic!: string;
    public views!: number;
    public likes: string[];
    public shares!: string[];
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Post.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: () => DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isRequiredWhenNotDraft(this: Post) {
                if (!this.isDraft && !this.title) {
                    throw new Error('Title is required when post is not a draft.');
                }
            },
        },
    },
    isDraft: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            isRequiredWhenNotDraft(this: Post) {
                if (!this.isDraft && !this.content) {
                    throw new Error('Content is required when post is not a draft.');
                }
            },
        },
    },
    categories: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
        validate: {
            hasValidCategories(this: Post, categories: string[]) {
                if (!this.isDraft && (!categories || categories.length === 0)) {
                    throw new Error('At least one category is required when post is not a draft.');
                }
            },
        },
    },
    authorId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: false,
    },
    coverPic: {
        type: DataTypes.STRING,
        allowNull:true
    },
    views: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        defaultValue: [],
        allowNull:true
    },
    likes: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        defaultValue: [],
        allowNull:true
    },
    shares: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        defaultValue: [],
        allowNull:true
    }
}, {
    sequelize,
    modelName: 'Post',
    timestamps: true,
    tableName: "posts"
});

export default Post;