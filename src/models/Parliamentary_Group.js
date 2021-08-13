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
      start_date: DataTypes.DATE,
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'parliamentary_group',
    },
  );

  Parliamentary_Group.associate = function ({ Congressperson, Commission, ParliamentaryGroup_x_Commission, Congressperson_x_ParliamentaryGroup }) {
    Parliamentary_Group.belongsToMany(Commission, {
      through: ParliamentaryGroup_x_Commission,
      foreignKey: 'pgroup_id',
      otherKey: 'commission_id'
    });

    Parliamentary_Group.hasMany(ParliamentaryGroup_x_Commission, {
      foreignKey: 'pgroup_id',
      sourceKey: 'pgroup_id'
    });

    Parliamentary_Group.belongsToMany(Congressperson, {
      through: Congressperson_x_ParliamentaryGroup,
      foreignKey: 'pgroup_id',
      otherKey: 'commission_id'
    });

    Parliamentary_Group.hasMany(Congressperson_x_ParliamentaryGroup, {
      foreignKey: 'pgroup_id',
      sourceKey: 'pgroup_id'
    });
  };

  return Parliamentary_Group;
};
