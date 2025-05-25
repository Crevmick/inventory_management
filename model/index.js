import { sequelize } from '../config/db.js';
import ProductModel from './product.js';
import CategoryModel from './category.js';
import UserModel from './user.js'; 

const Product = ProductModel;
const Category = CategoryModel;
const User = UserModel; 

// Define associations
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });

export { sequelize, Product, Category, User }; 
