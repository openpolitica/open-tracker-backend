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

  Role.associate = function ({ Congressperson_x_Commission, Congressperson_x_Mainboard, Congressperson_x_ParliamentaryGroup, ParliamentaryGroup_x_Commission }) {
    Role.belongsTo(Congressperson_x_Commission, {
      foreignKey: 'role_id',
      targetKey: 'role_id',
    });

    Role.belongsTo(Congressperson_x_Mainboard, {
      foreignKey: 'role_id',
      targetKey: 'role_id',
    });

    Role.belongsTo(Congressperson_x_ParliamentaryGroup, {
      foreignKey: 'role_id',
      targetKey: 'role_id',
    });

    Role.belongsTo(ParliamentaryGroup_x_Commission, {
      foreignKey: 'role_id',
      targetKey: 'role_id',
    });
  };

  return Role;
};
