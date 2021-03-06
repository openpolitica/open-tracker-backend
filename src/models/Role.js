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
      timestamps: false,
    },
  );

  Role.associate = function ({
    CongresspersonXCommitteeModel,
    CongresspersonXMainboardModel,
    CongresspersonXParliamentaryGroupModel,
    ParliamentaryGroupXCommitteeModel,
  }) {
    Role.hasMany(CongresspersonXCommitteeModel, {
      foreignKey: 'committee_role_id',
      sourceKey: 'role_id',
    });

    Role.hasMany(CongresspersonXMainboardModel, {
      foreignKey: 'mainboard_role_id',
      sourceKey: 'role_id',
    });

    Role.hasMany(CongresspersonXParliamentaryGroupModel, {
      foreignKey: 'parliamentary_group_role_id',
      sourceKey: 'role_id',
    });

    Role.hasMany(ParliamentaryGroupXCommitteeModel, {
      foreignKey: 'committee_role_id',
      sourceKey: 'role_id',
    });
  };

  return Role;
};
