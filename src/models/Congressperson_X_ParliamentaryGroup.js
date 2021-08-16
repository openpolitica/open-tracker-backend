module.exports = function (sequelize, DataTypes) {
  const Congressperson_x_ParliamentaryGroup = sequelize.define(
    'CongresspersonXParliamentaryGroupModel',
    {
      cv_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'CongresspersonModel',
          key: 'cv_id',
        },
      },
      parliamentary_group_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'ParliamentaryGroupModel',
          key: 'parliamentary_group_id',
        },
      },
      parliamentary_group_role_id: {
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
      tableName: 'parliamentary_group_x_congressperson',
    },
  );

  Congressperson_x_ParliamentaryGroup.associate = function ({
    CongresspersonModel,
    ParliamentaryGroupModel,
    RoleModel,
  }) {
    Congressperson_x_ParliamentaryGroup.belongsTo(CongresspersonModel, {
      foreignKey: 'cv_id',
      targetKey: 'cv_id',
    });

    Congressperson_x_ParliamentaryGroup.belongsTo(ParliamentaryGroupModel, {
      foreignKey: 'parliamentary_group_id',
      targetKey: 'parliamentary_group_id',
      as: 'parliamentary_group',
    });

    Congressperson_x_ParliamentaryGroup.belongsTo(RoleModel, {
      foreignKey: 'parliamentary_group_role_id',
      targetKey: 'role_id',
      as: 'role_detail',
    });
  };

  return Congressperson_x_ParliamentaryGroup;
};
