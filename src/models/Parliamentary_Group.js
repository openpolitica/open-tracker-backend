module.exports = function (sequelize, DataTypes) {
  const Parliamentary_Group = sequelize.define(
    'ParliamentaryGroupModel',
    {
      parliamentary_group_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      parliamentary_group_name: DataTypes.TEXT,
      parliamentary_group_slug: DataTypes.TEXT,
      parliamentary_group_url: DataTypes.TEXT,
      start_date: DataTypes.DATE,
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: 'parliamentary_group',
    },
  );

  Parliamentary_Group.associate = function ({
    CongresspersonModel,
    CommissionModel,
    ParliamentaryGroupXCommissionModel,
    CongresspersonXParliamentaryGroupModel,
  }) {
    Parliamentary_Group.belongsToMany(CommissionModel, {
      through: ParliamentaryGroupXCommissionModel,
      foreignKey: 'parliamentary_group_id',
      otherKey: 'commission_id',
    });

    Parliamentary_Group.hasMany(ParliamentaryGroupXCommissionModel, {
      foreignKey: 'parliamentary_group_id',
      sourceKey: 'parliamentary_group_id',
    });

    Parliamentary_Group.belongsToMany(CongresspersonModel, {
      as: 'congressperson',
      through: CongresspersonXParliamentaryGroupModel,
      foreignKey: 'parliamentary_group_id',
      otherKey: 'cv_id',
    });

    Parliamentary_Group.hasMany(CongresspersonXParliamentaryGroupModel, {
      foreignKey: 'parliamentary_group_id',
      sourceKey: 'parliamentary_group_id',
      as: 'congresspeople',
    });
  };

  return Parliamentary_Group;
};
