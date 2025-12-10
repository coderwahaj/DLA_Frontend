const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:  true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail:  true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role: {
      type: DataTypes. ENUM('user', 'lawyer', 'admin'),
      defaultValue: 'user'
    },
    authProvider: {
      type: DataTypes. ENUM('local', 'google'),
      defaultValue: 'local'
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    emailVerificationToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    emailVerificationExpires: {
      type: DataTypes.DATE,
      allowNull: true
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    passwordResetExpires: {
      type: DataTypes.DATE,
      allowNull: true
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'users',  // ← FORCE LOWERCASE TABLE NAME
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password') && user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  });

  // Compare password
  User.prototype.comparePassword = async function(candidatePassword) {
    if (!this.password) {
      return false;
    }
    return await bcrypt.compare(candidatePassword, this.password);
  };

  // Generate email verification token - RETURNS UNHASHED TOKEN
  User.prototype. generateVerificationToken = function() {
    // Generate random token (UNHASHED)
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Hash it and store in database
    this.emailVerificationToken = crypto
      .createHash('sha256')
      .update(verificationToken)
      .digest('hex');

    // Set expiry to 24 hours from now
    this. emailVerificationExpires = Date. now() + 24 * 60 * 60 * 1000;

    // Return the UNHASHED token (this goes in the email)
    return verificationToken;
  };

  // Generate password reset token - RETURNS UNHASHED TOKEN
  User.prototype.generatePasswordResetToken = function() {
    // Generate random token (UNHASHED)
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Hash it and store in database
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Set expiry to 1 hour from now
    this.passwordResetExpires = Date.now() + 60 * 60 * 1000;

    // Return the UNHASHED token (this goes in the email)
    return resetToken;
  };

  return User;
};