module.exports = function (sequelize, DataTypes) {
  const Goods_Immovable = sequelize.define(
    'GoodsImmovableModel',
    {
      cv_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'CongresspersonModel',
          key: 'cv_id',
        },
      },
      good_type: DataTypes.TEXT,
      location_ubigeo: DataTypes.TEXT,
      location_country: DataTypes.TEXT,
      location_department: DataTypes.TEXT,
      location_province: DataTypes.TEXT,
      location_district: DataTypes.TEXT,
      location_address: DataTypes.TEXT,
      sunarp_has: DataTypes.BOOLEAN,
      sunarp_budget: DataTypes.TEXT,
      comment: DataTypes.TEXT,
      property_valuation: DataTypes.FLOAT,
      uit: DataTypes.FLOAT,
    },
    {
      tableName: 'goods_immovable',
      timestamps: false,
    },
  );

  Goods_Immovable.associate = function ({ CongresspersonModel }) {
    Goods_Immovable.belongsTo(CongresspersonModel, {
      foreignKey: 'cv_id',
      targetKey: 'cv_id',
    });
  };

  return Goods_Immovable;
};
