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
      committee_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'CommitteeModel',
          key: 'committee_id',
        },
      },
      status_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'BillStatusModel',
          key: 'bill_status_id',
        },
      },
    },
    {
      tableName: 'tracking',
      timestamps: false,
    },
  );

  BillTracking.associate = function ({
    BillModel,
    BillStatusModel,
    CommitteeModel,
  }) {
    BillTracking.belongsTo(BillModel, {
      foreignKey: 'bill_id',
      targetKey: 'id',
      as: 'bill',
    });

    BillTracking.belongsTo(CommitteeModel, {
      foreignKey: 'committee_id',
      targetKey: 'committee_id',
      as: 'committee',
    });

    BillTracking.belongsTo(BillStatusModel, {
      foreignKey: 'status_id',
      targetKey: 'bill_status_id',
      as: 'status',
    });

    /**
     * Super Many-to-many relationships
     * See: https://sequelize.org/master/manual/advanced-many-to-many.html#the-best-of-both-worlds--the-super-many-to-many-relationship
     */
  };

  return BillTracking;
};
