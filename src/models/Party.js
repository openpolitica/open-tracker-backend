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

  Party.associate = function ({ Congressperson, Congressperson_x_Party }) {
    Party.belongsToMany(Congressperson, {
      through: Congressperson_x_Party,
      foreignKey: 'party_id',
      otherKey: 'cv_id'
    });

    Party.hasMany(Congressperson_x_Party, {
      foreignKey: 'party_id',
      sourceKey: 'party_id'
    });
  };

  return Party;
};
