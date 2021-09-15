module.exports = function (sequelize, DataTypes) {
  const Location = sequelize.define(
    'LocationModel',
    {
      ubigeo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      location_name: DataTypes.TEXT,
      location_slug: DataTypes.TEXT,
    },
    {
      tableName: 'location',
      timestamps: false,
    },
  );

  Location.associate = function ({ CongresspersonModel }) {
    Location.hasMany(CongresspersonModel, {
      foreignKey: 'postulation_ubigeo',
      sourceKey: 'ubigeo',
      as: 'congresspeople',
    });
  };

  return Location;
};
