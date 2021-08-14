module.exports = function (sequelize, DataTypes) {
  const Social_Network = sequelize.define(
    'SocialNetworkModel',
    {
      social_network_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      social_network_name: DataTypes.TEXT,
    },
    {
      tableName: 'social_network',
      timestamps: false,
    },
  );

  Social_Network.associate = function ({
    CongresspersonModel,
    SocialNetworkXCongresspersonModel,
  }) {
    Social_Network.belongsToMany(CongresspersonModel, {
      through: SocialNetworkXCongresspersonModel,
      foreignKey: 'social_network_id',
      otherKey: 'cv_id',
    });

    Social_Network.hasMany(SocialNetworkXCongresspersonModel, {
      foreignKey: 'social_network_id',
      sourceKey: 'social_network_id',
    });
  };

  return Social_Network;
};
