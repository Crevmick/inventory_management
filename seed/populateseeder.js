import { sequelize, Category, Product } from '../model/index.js'; 

async function seed() {
  try {
    // Sync DB (drops existing tables, recreate fresh)
    await sequelize.sync({ force: true });

    console.log('Database synced.');

    // Create categories
    const categories = await Promise.all([
      Category.create({ name: 'Sports & Outdoors', description: 'Equipment and gear for sports and outdoor activities.' }),
      Category.create({ name: 'Beauty & Personal Care', description: 'Products for beauty and personal grooming.' }),
      Category.create({ name: 'Toys & Games', description: 'Toys and games for children and adults.' }),
    ]);

    console.log('Categories created.');

    // Create products assigned to categories
    const products = [
      { name: 'Basketball', description: 'Official size and weight basketball.', price: 29.99, categoryId: categories[0].id },
      { name: 'Camping Tent', description: '4-person waterproof camping tent.', price: 120.0, categoryId: categories[0].id },

      { name: 'Face Cream', description: 'Moisturizing face cream for all skin types.', price: 15.5, categoryId: categories[1].id },
      { name: 'Hair Shampoo', description: 'Nourishing shampoo for dry hair.', price: 10.0, categoryId: categories[1].id },

      { name: 'Building Blocks Set', description: 'Colorful building blocks for kids.', price: 25.0, categoryId: categories[2].id },
      { name: 'Puzzle Game', description: '1000-piece jigsaw puzzle.', price: 18.75, categoryId: categories[2].id },
    ];

    await Product.bulkCreate(products);

    console.log('Products created.');
    console.log('Seeding completed successfully.');

    process.exit(0); // exit success
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1); // exit failure
  }
}

seed();
