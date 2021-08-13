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
      commission_type: DataTypes.TEXT
    },
    {
      tableName: 'commission',
    },
  );

  Commission.associate = function ({ Congressperson, Parliamentary_Group, ParliamentaryGroup_x_Commission, Congressperson_x_Commission }) {
    /**
     * Super Many-to-many relationships
     * See: https://sequelize.org/master/manual/advanced-many-to-many.html#the-best-of-both-worlds--the-super-many-to-many-relationship
     */

    Commission.belongsToMany(Parliamentary_Group, {
      through: ParliamentaryGroup_x_Commission,
      foreignKey: 'commission_id',
      otherKey: 'pgroup_id'
    });

    Commission.hasMany(ParliamentaryGroup_x_Commission, {
      foreignKey: 'commission_id',
      sourceKey: 'commission_id'
    });

    Commission.belongsToMany(Congressperson, {
      through: Congressperson_x_Commission,
      foreignKey: 'commission_id',
      otherKey: 'cv_id'
    });

    Commission.hasMany(Congressperson_x_Commission, {
      foreignKey: 'commission_id',
      sourceKey: 'commission_id'
    });
  };

  return Commission;
};
