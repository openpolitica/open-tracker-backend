module.exports = function (sequelize, DataTypes) {
  const Location = sequelize.define(
    'LocationModel',
    {
      postulation_ubigeo: {
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

  Location.associate = function ({ CongresspersonModel }) {
    Location.hasMany(CongresspersonModel, {
      foreignKey: 'postulation_ubigeo',
      sourceKey: 'postulation_ubigeo',
    });
  };

  return Location;
};
