module.exports = function (sequelize, DataTypes) {
  const Commission = sequelize.define(
    'CommissionModel',
    {
      commission_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      commission_name: DataTypes.TEXT,
    },
    {
      tableName: 'commission',
    },
  );

  Commission.associate = function ({}) {};

  return Commission;
};
