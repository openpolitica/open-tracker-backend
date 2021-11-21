module.exports = function (sequelize, DataTypes) {
  const ParliamentaryGroup_x_Committee = sequelize.define(
    'ParliamentaryGroupXCommitteeModel',
    {
      parliamentary_group_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'ParliamentaryGroupModel',
          key: 'parliamentary_group_id',
        },
      },
      committee_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'CommitteeModel',
          key: 'committee_id',
        },
      },
      committee_role_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'RoleModel',
          key: 'role_id',
        },
      },
    },
    {
      tableName: 'parliamentaryGroup_x_committee',
    },
  );

  ParliamentaryGroup_x_Committee.associate = function ({
    CommitteeModel,
    ParliamentaryGroupModel,
    RoleModel,
  }) {
    ParliamentaryGroup_x_Committee.belongsTo(CommitteeModel, {
      foreignKey: 'committee_id',
      targetKey: 'committee_id',
    });

    ParliamentaryGroup_x_Committee.belongsTo(ParliamentaryGroupModel, {
      foreignKey: 'parliamentary_group_id',
      targetKey: 'parliamentary_group_id',
    });

    ParliamentaryGroup_x_Committee.belongsTo(RoleModel, {
      foreignKey: 'committee_role_id',
      targetKey: 'role_id',
    });
  };

  return ParliamentaryGroup_x_Committee;
};
