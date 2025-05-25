import bcrypt from 'bcrypt';
import User from '../model/user.js'; 

const seedUsers = async () => {
  try {
    const hashedPassword = await bcrypt.hash('password123', 10);

    const users = [
      {
        username: 'admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        phone: '+2348012345678',
        address: '123 Admin Street'
      },
      {
        username: 'me',
        email: 'crevme@example.com',
        password: hashedPassword,
        role: 'customer',
        firstName: 'crev',
        lastName: 'me',
        phone: '+2348098765432',
        address: '456 Customer Road'
      }
    ];

    await User.bulkCreate(users, { validate: true });
    console.log(' Users seeded successfully!');
    process.exit(0); // end script
  } catch (error) {
    console.error(' Failed to seed users:', error);
    process.exit(1); // exit with error
  }
};

seedUsers();

