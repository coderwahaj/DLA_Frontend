const { User } = require('../models');
const bcrypt = require('bcryptjs');

const createAdminUser = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ 
      where: { email: 'admin@digitallegaladvisor.com' } 
    });

    if (existingAdmin) {
      console.log('❌ Admin user already exists');
      return;
    }

    // Create admin user
    const adminUser = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@digitallegaladvisor.com',
      password: 'Admin@123456', // Change this after first login! 
      role: 'admin',
      isActive: true,
      isEmailVerified: true,
      authProvider: 'local'
    });

    console.log('✅ Admin user created successfully!');
    console.log('Email:  admin@digitallegaladvisor.com');
    console.log('Password: Admin@123456');
    console.log('⚠️  Please change the password after first login! ');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  createAdminUser();
}

module.exports = createAdminUser;