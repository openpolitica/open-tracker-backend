module.exports = function (sequelize, DataTypes) {
  const Congressperson_x_Mainboard = sequelize.define(
    'CongresspersonXMainboardModel',
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
      tableName: 'Congressperson_x_Mainboard'
    }
  );

  Congressperson_x_Mainboard.associate = function ({ Congressperson, Mainboard, Role }) {
    Congressperson_x_Mainboard.belongsTo(Congressperson, {
      foreignKey: 'cv_id',
      targetKey: 'cv_id',
    });

    Congressperson_x_Mainboard.belongsTo(Mainboard, {
      foreignKey: 'mainboard_id',
      targetKey: 'mainboard_id',
    });

    Congressperson_x_Mainboard.belongsTo(Role, {
      foreignKey: 'role_id',
      targetKey: 'role_id',
    });
  };

  return Congressperson_x_Mainboard;
};
