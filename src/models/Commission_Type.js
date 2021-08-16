module.exports = function (sequelize, DataTypes) {
  const Commission_Type = sequelize.define(
    'CommissionTypeModel',
    {
      commission_type_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      commission_type_name: DataTypes.TEXT,
    },
    {
      tableName: 'commission_type',
    },
  );

  Commission_Type.associate = function ({ CommissionModel }) {
    Commission_Type.hasMany(CommissionModel, {
      foreignKey: 'commission_type_id',
      sourceKey: 'commission_type_id',
    });
  };

  return Commission_Type;
};
