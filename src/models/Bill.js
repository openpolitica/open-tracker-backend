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
      legislature_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'LegislatureModel',
          key: 'legislature_id',
        },
      },
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
      title: DataTypes.TEXT,
      summary: DataTypes.TEXT,
      last_committee_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'CommitteeModel',
          key: 'committee_id',
        },
      },
      last_status_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'BillStatusModel',
          key: 'bill_status_id',
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
    BillStatusModel,
    BillAuthorshipModel,
    CongresspersonModel,
    BillTrackingModel,
    BillGroupedModel,
    LegislatureModel,
    ParliamentaryGroupModel,
    CommitteeModel,
  }) {
    Bill.belongsTo(CommitteeModel, {
      foreignKey: 'last_committee_id',
      targetKey: 'committee_id',
      as: 'last_committee',
    });

    Bill.belongsTo(BillStatusModel, {
      foreignKey: 'last_status_id',
      targetKey: 'bill_status_id',
      as: 'last_status',
    });

    Bill.belongsTo(LegislatureModel, {
      foreignKey: 'legislature_id',
      targetKey: 'legislature_id',
      as: 'legislature',
    });

    Bill.belongsTo(ParliamentaryGroupModel, {
      foreignKey: 'parliamentary_group_id',
      targetKey: 'parliamentary_group_id',
      as: 'parliamentary_group',
    });

    Bill.belongsToMany(CommitteeModel, {
      through: BillTrackingModel,
      foreignKey: 'bill_id',
      otherKey: 'committee_id',
      as: 'associated_committee',
    });

    Bill.hasMany(BillTrackingModel, {
      foreignKey: 'bill_id',
      sourceKey: 'id',
      as: 'tracking',
    });

    Bill.hasMany(BillGroupedModel, {
      foreignKey: 'bill_id',
      sourceKey: 'id',
      as: 'grouped_initiative',
    });

    Bill.belongsToMany(BillModel, {
      through: BillGroupedModel,
      foreignKey: 'bill_id',
      otherKey: 'grouped_initiative',
      as: 'bill',
    });

    Bill.belongsToMany(BillModel, {
      through: BillGroupedModel,
      foreignKey: 'grouped_initiative',
      otherKey: 'bill_id',
      as: 'associated',
    });

    Bill.hasMany(BillGroupedModel, {
      foreignKey: 'grouped_initiative',
      sourceKey: 'id',
    });

    Bill.belongsToMany(CongresspersonModel, {
      as: 'congressperson',
      through: BillAuthorshipModel,
      foreignKey: 'bill_id',
      otherKey: 'cv_id',
    });

    Bill.hasMany(BillAuthorshipModel, {
      foreignKey: 'bill_id',
      sourceKey: 'id',
      as: 'authorship',
    });
  };

  return Bill;
};
