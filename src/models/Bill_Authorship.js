module.exports = function (sequelize, DataTypes) {
  const BillAuthorship = sequelize.define(
    'BillAuthorshipModel',
    {
      bill_id: {
        type: DataTypes.TEXT,
        allowNull: false,
        references: {
          model: 'BillModel',
          key: 'id',
        },
      },
      congressperson_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'CongresspersonModel',
          key: 'cv_id',
        },
      },
      authorship_type: DataTypes.TEXT,
    },
    {
      tableName: 'authorship',
      timestamps: false,
    },
  );

  BillAuthorship.associate = function ({ BillModel, CongresspersonModel }) {
    BillAuthorship.belongsTo(BillModel, {
      foreignKey: 'bill_id',
      targetKey: 'id',
      as: 'bill',
    });

    BillAuthorship.belongsTo(CongresspersonModel, {
      foreignKey: 'congressperson_id',
      targetKey: 'cv_id',
      as: 'congressperson',
    });

    /**
     * Super Many-to-many relationships
     * See: https://sequelize.org/master/manual/advanced-many-to-many.html#the-best-of-both-worlds--the-super-many-to-many-relationship
     */
  };

  return BillAuthorship;
};
