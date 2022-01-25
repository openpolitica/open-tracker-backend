module.exports = function (sequelize, DataTypes) {
  const BillStatus = sequelize.define(
    'BillStatusModel',
    {
      bill_status_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      bill_status_name: DataTypes.TEXT,
      bill_status_variant: DataTypes.TEXT,
      bill_status_slug: DataTypes.TEXT,
    },
    {
      tableName: 'bill_status',
      timestamps: false,
    },
  );

  BillStatus.associate = function ({ BillModel }) {
    BillStatus.hasMany(BillModel, {
      foreignKey: 'last_status_id',
      sourceKey: 'bill_status_id',
      as: 'bill',
    });
  };
  return BillStatus;
};
