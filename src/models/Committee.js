module.exports = function (sequelize, DataTypes) {
  const Committee = sequelize.define(
    'CommitteeModel',
    {
      committee_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      committee_name: DataTypes.TEXT,
      committee_type_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'CommitteeTypeModel',
          key: 'committee_type_id',
        },
      },
      committee_short_name: DataTypes.TEXT,
      committee_slug: DataTypes.TEXT,
      start_date: DataTypes.DATE,
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'committee',
      timestamps: false,
    },
  );

  Committee.associate = function ({
    CongresspersonModel,
    ParliamentaryGroupModel,
    CommitteeTypeModel,
    ParliamentaryGroupXCommitteeModel,
    CongresspersonXCommitteeModel,
    BillModel,
    BillTrackingModel,
  }) {
    Committee.belongsTo(CommitteeTypeModel, {
      foreignKey: 'committee_type_id',
      targetKey: 'committee_type_id',
      as: 'committee_type',
    });

    /**
     * Super Many-to-many relationships
     * See: https://sequelize.org/master/manual/advanced-many-to-many.html#the-best-of-both-worlds--the-super-many-to-many-relationship
     */

    Committee.belongsToMany(ParliamentaryGroupModel, {
      through: ParliamentaryGroupXCommitteeModel,
      foreignKey: 'committee_id',
      otherKey: 'parliamentary_group_id',
    });

    Committee.hasMany(ParliamentaryGroupXCommitteeModel, {
      foreignKey: 'committee_id',
      sourceKey: 'committee_id',
      as: 'committee_parliamentary_groups',
    });

    Committee.belongsToMany(CongresspersonModel, {
      through: CongresspersonXCommitteeModel,
      foreignKey: 'committee_id',
      otherKey: 'cv_id',
    });

    Committee.hasMany(CongresspersonXCommitteeModel, {
      foreignKey: 'committee_id',
      sourceKey: 'committee_id',
      as: 'congresspeople',
    });

    Committee.hasOne(BillModel, {
      foreignKey: 'last_committee_id',
      sourceKey: 'committee_id',
    });

    Committee.belongsToMany(BillModel, {
      as: 'bill',
      through: BillTrackingModel,
      foreignKey: 'committee_id',
      otherKey: 'id',
    });

    Committee.hasMany(BillTrackingModel, {
      foreignKey: 'committee_id',
      sourceKey: 'committee_id',
    });
  };

  return Committee;
};
