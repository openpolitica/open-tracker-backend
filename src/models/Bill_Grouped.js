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
      tableName: 'bill',
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
    });

    /**
     * Super Many-to-many relationships
     * See: https://sequelize.org/master/manual/advanced-many-to-many.html#the-best-of-both-worlds--the-super-many-to-many-relationship
     */
  };

  return BillGrouped;
};
