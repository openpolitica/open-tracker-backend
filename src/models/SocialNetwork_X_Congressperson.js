module.exports = function (sequelize, DataTypes) {
  const SocialNetwork_x_Congressperson = sequelize.define(
    'SocialNetworkXCongresspersonModel',
    {
      cv_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'CongresspersonModel',
          key: 'cv_id',
        },
      },
      social_network_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'SocialNetworkModel',
          key: 'social_network_id',
        },
      },
      social_network_url: DataTypes.TEXT,
      last_update_date: DataTypes.DATE,
    },
    {
      tableName: 'social_network_x_congressperson',
    },
  );

  SocialNetwork_x_Congressperson.associate = function ({
    CongresspersonModel,
    SocialNetworkModel,
  }) {
    SocialNetwork_x_Congressperson.belongsTo(CongresspersonModel, {
      foreignKey: 'cv_id',
      targetKey: 'cv_id',
    });

    SocialNetwork_x_Congressperson.belongsTo(SocialNetworkModel, {
      foreignKey: 'social_network_id',
      targetKey: 'social_network_id',
    });
  };

  return SocialNetwork_x_Congressperson;
};
