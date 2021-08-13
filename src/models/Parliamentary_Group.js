module.exports = function (sequelize, DataTypes) {
  const Parliamentary_Group = sequelize.define(
    'ParliamentaryGroupModel',
    {
      parliamentary_group_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      parliamentary_group_name: DataTypes.TEXT,
      start_date: DataTypes.DATE,
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'parliamentary_group',
    },
  );

  Parliamentary_Group.associate = function ({}) {};

  return Parliamentary_Group;
};
