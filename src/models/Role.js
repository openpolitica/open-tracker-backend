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

  Role.associate = function ({}) {};

  return Role;
};
