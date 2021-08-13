module.exports = function (sequelize, DataTypes) {
  const Congressperson_x_ParliamentaryGroup = sequelize.define(
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
      tableName: 'Congressperson_x_ParliamentaryGroup'
    }
  );

  Congressperson_x_ParliamentaryGroup.associate = function ({ Congressperson, Parliamentary_Group, Role }) {
    Congressperson_x_ParliamentaryGroup.belongsTo(Congressperson, {
      foreignKey: 'cv_id',
      targetKey: 'cv_id',
    });

    Congressperson_x_ParliamentaryGroup.belongsTo(Parliamentary_Group, {
      foreignKey: 'pgroup_id',
      targetKey: 'pgroup_id',
    });

    Congressperson_x_ParliamentaryGroup.hasOne(Role, {
      foreignKey: 'role_id',
      sourceKey: 'role_id',
    });
  };

  return Congressperson_x_ParliamentaryGroup;
};
