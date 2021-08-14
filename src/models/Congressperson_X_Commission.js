module.exports = function (sequelize, DataTypes) {
  const Congressperson_x_Commission = sequelize.define(
    'CongresspersonXCommissionModel',
    {
      cv_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'CongresspersonModel',
          key: 'cv_id',
        },
      },
      commission_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'CommissionModel',
          key: 'commission_id',
        },
      },
      commission_role_id: {
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
      tableName: 'congressperson_x_commission',
    },
  );

  Congressperson_x_Commission.associate = function ({
    CongresspersonModel,
    CommissionModel,
    RoleModel,
  }) {
    Congressperson_x_Commission.belongsTo(CongresspersonModel, {
      foreignKey: 'cv_id',
      targetKey: 'cv_id',
    });

    Congressperson_x_Commission.belongsTo(CommissionModel, {
      foreignKey: 'commission_id',
      targetKey: 'commission_id',
    });

    Congressperson_x_Commission.belongsTo(RoleModel, {
      foreignKey: 'commission_role_id',
      targetKey: 'role_id',
    });
  };

  return Congressperson_x_Commission;
};
