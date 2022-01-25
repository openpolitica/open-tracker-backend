module.exports = function (sequelize, DataTypes) {
  const Legislature = sequelize.define(
    'LegislatureModel',
    {
      legislature_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      legislature_name: DataTypes.TEXT,
      legislature_period: DataTypes.TEXT,
      legislature_slug: DataTypes.TEXT,
      legislature_order: DataTypes.TEXT,
    },
    {
      tableName: 'legislature',
      timestamps: false,
    },
  );

  Legislature.associate = function ({ BillModel }) {
    Legislature.hasMany(BillModel, {
      foreignKey: 'legislature_id',
      sourceKey: 'legislature_id',
      as: 'bill',
    });
  };

  return Legislature;
};
