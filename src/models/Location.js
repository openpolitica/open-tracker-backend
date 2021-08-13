module.exports = function (sequelize, DataTypes) {
  const Location = sequelize.define(
    'LocationModel',
    {
      ubigeo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      location_name: DataTypes.TEXT,
    },
    {
      tableName: 'location',
      timestamps: false,
    },
  );

  Location.associate = function ({ Congressperson }) {
    Location.belongsTo(Congressperson, {
      foreignKey: 'ubigeo',
      targetKey: 'ubigeo',
    });
  };

  return Location;
};
