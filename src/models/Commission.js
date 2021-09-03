module.exports = function (sequelize, DataTypes) {
  const Commission = sequelize.define(
    'CommissionModel',
    {
      commission_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      commission_name: DataTypes.TEXT,
      commission_type_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'CommissionTypeModel',
          key: 'commission_type_id',
        },
      },
      start_date: DataTypes.DATE,
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'commission',
      timestamps: false,
    },
  );

  Commission.associate = function ({
    CongresspersonModel,
    ParliamentaryGroupModel,
    CommissionTypeModel,
    ParliamentaryGroupXCommissionModel,
    CongresspersonXCommissionModel,
  }) {
    Commission.belongsTo(CommissionTypeModel, {
      foreignKey: 'commission_type_id',
      targetKey: 'commission_type_id',
    });

    /**
     * Super Many-to-many relationships
     * See: https://sequelize.org/master/manual/advanced-many-to-many.html#the-best-of-both-worlds--the-super-many-to-many-relationship
     */

    Commission.belongsToMany(ParliamentaryGroupModel, {
      through: ParliamentaryGroupXCommissionModel,
      foreignKey: 'commission_id',
      otherKey: 'parliamentary_group_id',
    });

    Commission.hasMany(ParliamentaryGroupXCommissionModel, {
      foreignKey: 'commission_id',
      sourceKey: 'commission_id',
    });

    Commission.belongsToMany(CongresspersonModel, {
      through: CongresspersonXCommissionModel,
      foreignKey: 'commission_id',
      otherKey: 'cv_id',
    });

    Commission.hasMany(CongresspersonXCommissionModel, {
      foreignKey: 'commission_id',
      sourceKey: 'commission_id',
    });
  };

  return Commission;
};
