import bcrypt from 'bcryptjs';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'First name is required'
        }
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Last name is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email'
        },
        notEmpty: {
          msg: 'Email is required'
        }
      }
    },
    gender: {
      type: DataTypes.ENUM,
      values: ['male', 'female'],
      validate: {
        in: ['male', 'female']
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password is required'
        }
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    timestamps: true,
    hooks: {
      beforeSave: (user) => {
        // Hash the user's password only if it has been changed before saving to the db
        // This hook is only triggered on entity creation. To ensure this hook is likewise triggered when the user updates password, ensure to set the "individualHooks" option to true to trigger on an update
        if (user.changed('password')) {
          const salt = bcrypt.genSaltSync(14);
          user.password = bcrypt.hashSync(user.password, salt);
        }
      }
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Package, {
      as: 'owner'
    });
  };

  User.findByEmail = (username) => User.findOne({
    where: {
      username
    }
  });

  return User;
};
