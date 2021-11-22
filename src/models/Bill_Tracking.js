module.exports = function (sequelize, DataTypes) {
  const BillTracking = sequelize.define(
    'BillTrackingModel',
    {
      bill_id: {
        type: DataTypes.TEXT,
        allowNull: false,
        references: {
          model: 'BillModel',
          key: 'id',
        },
      },
      date: DataTypes.DATE,
      details: DataTypes.TEXT,
      committe_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'CommitteeModel',
          key: 'committee_id',
        },
      },
      status: DataTypes.TEXT,
    },
    {
      tableName: 'bill',
      timestamps: false,
    },
  );

  BillTracking.associate = function ({ BillModel, CommitteeModel }) {
    BillTracking.belongsTo(BillModel, {
      foreignKey: 'bill_id',
      targetKey: 'id',
    });

    BillTracking.belongsTo(CommitteeModel, {
      foreignKey: 'committe_id',
      targetKey: 'committee_id',
      as: 'committee',
    });

    /**
     * Super Many-to-many relationships
     * See: https://sequelize.org/master/manual/advanced-many-to-many.html#the-best-of-both-worlds--the-super-many-to-many-relationship
     */
  };

  return BillTracking;
};
