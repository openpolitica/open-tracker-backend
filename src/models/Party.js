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

  Party.associate = function ({ Congressperson }) {};

  return Party;
};
