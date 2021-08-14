module.exports = function (sequelize, DataTypes) {
  const Role = sequelize.define(
    'RoleModel',
    {
      role_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      role_name: DataTypes.TEXT,
      entity: DataTypes.TEXT,
    },
    {
      tableName: 'role',
    },
  );

  Role.associate = function ({
    CongresspersonXCommissionModel,
    CongresspersonXMainboardModel,
    CongresspersonXParliamentaryGroupModel,
    ParliamentaryGroupXCommissionModel,
  }) {
    Role.hasMany(CongresspersonXCommissionModel, {
      foreignKey: 'role_id',
      sourceKey: 'role_id',
    });

    Role.hasMany(CongresspersonXMainboardModel, {
      foreignKey: 'role_id',
      sourceKey: 'role_id',
    });

    Role.hasMany(CongresspersonXParliamentaryGroupModel, {
      foreignKey: 'role_id',
      sourceKey: 'role_id',
    });

    Role.hasMany(ParliamentaryGroupXCommissionModel, {
      foreignKey: 'role_id',
      sourceKey: 'role_id',
    });
  };

  return Role;
};
