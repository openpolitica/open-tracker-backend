module.exports = function (sequelize, DataTypes) {
  const Congressperson_x_Commission = sequelize.define(
    'CongresspersonXCommissionModel',
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
      tableName: 'Congressperson_x_Commission'
    }
  );

  Congressperson_x_Commission.associate = function ({ Congressperson, Commission , Role }) {
    Congressperson_x_Commission.belongsTo(Congressperson, {
      foreignKey: 'cv_id',
      targetKey: 'cv_id',
    });

    Congressperson_x_Commission.belongsTo(Commission, {
      foreignKey: 'commission_id',
      targetKey: 'commission_id',
    });

    Congressperson_x_Commission.hasOne(Role, {
      foreignKey: 'role_id',
      sourceKey: 'role_id',
    });
  };

  return Congressperson_x_Commission;
};
