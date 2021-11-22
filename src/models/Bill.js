module.exports = function (sequelize, DataTypes) {
  const Bill = sequelize.define(
    'BillModel',
    {
      id: {
        type: DataTypes.TEXT,
        primaryKey: true,
      },
      period: DataTypes.TEXT,
      number: DataTypes.INTEGER,
      period_number: DataTypes.TEXT,
      legislature: DataTypes.TEXT,
      presentation_date: DataTypes.DATE,
      proponent: DataTypes.TEXT,
      parliamentary_group_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'ParliamentaryGroupModel',
          key: 'parliamentary_group_id',
        },
      },
      last_status: DataTypes.TEXT,
      title: DataTypes.TEXT,
      summary: DataTypes.TEXT,
      last_committe_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'CommitteeModel',
          key: 'committee_id',
        },
      },
      file_url: DataTypes.TEXT,
      adherents: DataTypes.TEXT,
    },
    {
      tableName: 'bill',
      timestamps: false,
    },
  );

  Bill.associate = function ({
    BillModel,
    BillAuthorshipModel,
    CongresspersonModel,
    BillTrackingModel,
    BillGroupedModel,
    ParliamentaryGroupModel,
    CommitteeModel,
  }) {
    Bill.belongsTo(CommitteeModel, {
      foreignKey: 'last_committe_id',
      targetKey: 'committee_id',
      as: 'committee',
    });

    Bill.belongsTo(ParliamentaryGroupModel, {
      foreignKey: 'parliamentary_group_id',
      targetKey: 'parliamentary_group_id',
      as: 'parliamentary_group',
    });

    Bill.belongsToMany(CommitteeModel, {
      through: BillTrackingModel,
      foreignKey: 'id',
      otherKey: 'committee_id',
    });

    Bill.hasMany(BillTrackingModel, {
      foreignKey: 'bill_id',
      sourceKey: 'id',
    });

    Bill.hasMany(BillGroupedModel, {
      foreignKey: 'bill_id',
      sourceKey: 'id',
    });

    Bill.belongsToMany(BillModel, {
      through: BillGroupedModel,
      foreignKey: 'id',
      otherKey: 'bill_id',
      as: 'grouped_initiative',
    });

    Bill.hasMany(BillGroupedModel, {
      foreignKey: 'grouped_initiative',
      sourceKey: 'id',
    });

    Bill.belongsToMany(CongresspersonModel, {
      through: BillAuthorshipModel,
      foreignKey: 'id',
      otherKey: 'cv_id',
    });

    Bill.hasMany(BillAuthorshipModel, {
      foreignKey: 'bill_id',
      sourceKey: 'id',
    });
  };

  return Bill;
};
