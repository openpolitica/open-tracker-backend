module.exports = function (sequelize, DataTypes) {
  const BillGrouped = sequelize.define(
    'BillGroupedModel',
    {
      bill_id: {
        type: DataTypes.TEXT,
        allowNull: false,
        references: {
          model: 'BillModel',
          key: 'id',
        },
      },
      grouped_initiative: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'BillModel',
          key: 'id',
        },
      },
    },
    {
      tableName: 'grouped_initiative',
      timestamps: false,
    },
  );

  BillGrouped.associate = function ({ BillModel }) {
    BillGrouped.belongsTo(BillModel, {
      foreignKey: 'bill_id',
      targetKey: 'id',
    });

    BillGrouped.belongsTo(BillModel, {
      foreignKey: 'grouped_initiative',
      targetKey: 'id',
      as: 'bill',
    });

    /**
     * Super Manybill-to-many relationships
     * See: https://sequelize.org/master/manual/advanced-many-to-many.html#the-best-of-both-worlds--the-super-many-to-many-relationship
     */
  };

  return BillGrouped;
};
