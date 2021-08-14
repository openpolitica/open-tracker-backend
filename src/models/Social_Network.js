module.exports = function (sequelize, DataTypes) {
  const Social_Network = sequelize.define(
    'SocialNetworkModel',
    {
      cv_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'CongresspersonModel',
          key: 'cv_id',
        },
      },
      platform: DataTypes.TEXT,
      url: DataTypes.TEXT,
    },
    {
      tableName: 'social_network',
      timestamps: false,
    },
  );

  Social_Network.associate = function ({ CongresspersonModel }) {
    Social_Network.belongsTo(CongresspersonModel, {
      foreignKey: 'cv_id',
      targetKey: 'cv_id',
    });
  };

  return Social_Network;
};
