module.exports = function (sequelize, DataTypes) {
  const Goods_Movable = sequelize.define(
    'GoodsMovableModel',
    {
      cv_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'CongresspersonModel',
          key: 'cv_id',
        },
      },
      vehicle_type: DataTypes.TEXT,
      brand: DataTypes.TEXT,
      model: DataTypes.TEXT,
      year: DataTypes.INTEGER,
      license_plate: DataTypes.TEXT,
      characteristics: DataTypes.TEXT,
      comment: DataTypes.TEXT,
      value: DataTypes.FLOAT,
    },
    {
      tableName: 'goods_movable',
      timestamps: false,
    },
  );

  Goods_Movable.removeAttribute('id');
  Goods_Movable.associate = function ({ CongresspersonModel }) {
    Goods_Movable.belongsTo(CongresspersonModel, {
      foreignKey: 'cv_id',
      targetKey: 'cv_id',
    });
  };

  return Goods_Movable;
};
