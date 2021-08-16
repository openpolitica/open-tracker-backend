module.exports = function (sequelize, DataTypes) {
  const Political_Party = sequelize.define(
    'PoliticalPartyModel',
    {
      political_party_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      political_party_jne_name: DataTypes.TEXT,
      political_party_name: DataTypes.TEXT,
      political_party_logo_url: DataTypes.TEXT,
    },
    {
      tableName: 'political_party',
      timestamps: false,
    },
  );

  Political_Party.associate = function ({
    CongresspersonModel,
    CongresspersonXPartyModel,
  }) {
    Political_Party.belongsToMany(CongresspersonModel, {
      through: CongresspersonXPartyModel,
      foreignKey: 'political_party_id',
      otherKey: 'cv_id',
    });

    Political_Party.hasMany(CongresspersonXPartyModel, {
      foreignKey: 'political_party_id',
      sourceKey: 'political_party_id',
    });
  };

  return Political_Party;
};
