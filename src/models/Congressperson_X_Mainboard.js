module.exports = function (sequelize, DataTypes) {
  const Congressperson_x_Mainboard = sequelize.define(
    'CongresspersonXMainboardModel',
    {
      cv_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'CongresspersonModel',
          key: 'cv_id',
        },
      },
      mainboard_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'MainboardModel',
          key: 'mainboard_id',
        },
      },
      mainboard_role_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'RoleModel',
          key: 'role_id',
        },
      },
      start_date: DataTypes.DATE,
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'congressperson_x_mainboard',
    },
  );

  Congressperson_x_Mainboard.associate = function ({
    CongresspersonModel,
    MainboardModel,
    RoleModel,
  }) {
    Congressperson_x_Mainboard.belongsTo(CongresspersonModel, {
      foreignKey: 'cv_id',
      targetKey: 'cv_id',
    });

    Congressperson_x_Mainboard.belongsTo(MainboardModel, {
      foreignKey: 'mainboard_id',
      targetKey: 'mainboard_id',
    });

    Congressperson_x_Mainboard.belongsTo(RoleModel, {
      foreignKey: 'mainboard_role_id',
      targetKey: 'role_id',
    });
  };

  return Congressperson_x_Mainboard;
};
