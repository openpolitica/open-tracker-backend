module.exports = function (sequelize, DataTypes) {
  const Congressperson_x_Committee = sequelize.define(
    'CongresspersonXCommitteeModel',
    {
      cv_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'CongresspersonModel',
          key: 'cv_id',
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
      tableName: 'committee_x_congressperson',
      timestamps: false,
    },
  );

  Congressperson_x_Committee.associate = function ({
    CongresspersonModel,
    CommitteeModel,
    RoleModel,
  }) {
    Congressperson_x_Committee.belongsTo(CongresspersonModel, {
      foreignKey: 'cv_id',
      targetKey: 'cv_id',
      as: 'congressperson',
    });

    Congressperson_x_Committee.belongsTo(CommitteeModel, {
      foreignKey: 'committee_id',
      targetKey: 'committee_id',
      as: 'committee',
    });

    Congressperson_x_Committee.belongsTo(RoleModel, {
      foreignKey: 'committee_role_id',
      targetKey: 'role_id',
      as: 'role_detail',
    });
  };

  return Congressperson_x_Committee;
};
