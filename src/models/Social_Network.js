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

  Social_Network.associate = function ({ Congressperson }) {
    Social_Network.belongsTo(Congressperson, {
      foreignKey: 'cv_id',
      targetKey: 'cv_id',
    });
  };

  return Social_Network;
};
