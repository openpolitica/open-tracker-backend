module.exports = function (sequelize, DataTypes) {
  const Party = sequelize.define(
    'PartyModel',
    {
      political_party_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      political_party_jne_name: DataTypes.TEXT,
      political_party_name: DataTypes.TEXT,
    },
    {
      tableName: 'party',
      timestamps: false,
    },
  );

  Party.associate = function ({
    CongresspersonModel,
    CongresspersonXPartyModel,
  }) {
    Party.belongsToMany(CongresspersonModel, {
      through: CongresspersonXPartyModel,
      foreignKey: 'political_party_id',
      otherKey: 'cv_id',
    });

    Party.hasMany(CongresspersonXPartyModel, {
      foreignKey: 'political_party_id',
      sourceKey: 'political_party_id',
    });
  };

  return Party;
};
