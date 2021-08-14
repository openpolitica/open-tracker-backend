module.exports = function (sequelize, DataTypes) {
  const Party = sequelize.define(
    'PartyModel',
    {
      party_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      party_name: DataTypes.TEXT,
      party_alias: DataTypes.TEXT,
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
      foreignKey: 'party_id',
      otherKey: 'cv_id',
    });

    Party.hasMany(CongresspersonXPartyModel, {
      foreignKey: 'party_id',
      sourceKey: 'party_id',
    });
  };

  return Party;
};
