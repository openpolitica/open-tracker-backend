module.exports = function (sequelize, DataTypes) {
  const ParliamentaryGroup_x_Commission = sequelize.define(
    'ParliamentaryGroupXCommissionModel',
    {
      parliamentary_group_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'ParliamentaryGroupModel',
          key: 'parliamentary_group_id',
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
    },
    {
      tableName: 'parliamentaryGroup_x_commission',
    },
  );

  ParliamentaryGroup_x_Commission.associate = function ({
    CommissionModel,
    ParliamentaryGroupModel,
    RoleModel,
  }) {
    ParliamentaryGroup_x_Commission.belongsTo(CommissionModel, {
      foreignKey: 'commission_id',
      targetKey: 'commission_id',
    });

    ParliamentaryGroup_x_Commission.belongsTo(ParliamentaryGroupModel, {
      foreignKey: 'parliamentary_group_id',
      targetKey: 'parliamentary_group_id',
    });

    ParliamentaryGroup_x_Commission.belongsTo(RoleModel, {
      foreignKey: 'commission_role_id',
      targetKey: 'role_id',
    });
  };

  return ParliamentaryGroup_x_Commission;
};
