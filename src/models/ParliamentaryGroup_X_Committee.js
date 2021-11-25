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
      start_date: DataTypes.DATE,
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: 'committee_x_parliamentary_group',
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
      as: 'parliamentary_group',
    });

    ParliamentaryGroup_x_Committee.belongsTo(RoleModel, {
      foreignKey: 'committee_role_id',
      targetKey: 'role_id',
      as: 'role_detail',
    });
  };

  return ParliamentaryGroup_x_Committee;
};
