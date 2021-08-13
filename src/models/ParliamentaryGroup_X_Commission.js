module.exports = function (sequelize, DataTypes) {
  const ParliamentaryGroup_x_Commission = sequelize.define(
    'CongresspersonXParliamentaryGroupModel',
    {
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'RoleModel',
          key: 'role_id',
        }
      },
      start_date: DataTypes.DATE,
      end_date: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      tableName: 'ParliamentaryGroup_x_Commission'
    }
  );

  ParliamentaryGroup_x_Commission.associate = function ({ Commission, Parliamentary_Group, Role }) {
    ParliamentaryGroup_x_Commission.belongsTo(Commission, {
      foreignKey: 'commission_id',
      targetKey: 'commission_id',
    });

    ParliamentaryGroup_x_Commission.belongsTo(Parliamentary_Group, {
      foreignKey: 'pgroup_id',
      targetKey: 'pgroup_id',
    });

    ParliamentaryGroup_x_Commission.hasOne(Role, {
      foreignKey: 'role_id',
      sourceKey: 'role_id',
    });
  };

  return ParliamentaryGroup_x_Commission;
};
