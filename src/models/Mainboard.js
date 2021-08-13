module.exports = function (sequelize, DataTypes) {
  const Mainboard = sequelize.define(
    'MainboardModel',
    {
      mainboard_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      mainboard_name: DataTypes.TEXT,
      start_date: DataTypes.DATE,
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'mainboard',
    },
  );

  Mainboard.associate = function ({Congressperson, Mainboard_x_Congressperson}) {
    Mainboard.belongsToMany(Congressperson, {
      through: Mainboard_x_Congressperson,
      foreignKey: 'mainboard_id',
      otherKey: 'cv_id'
    });

    Mainboard.hasMany(Mainboard_x_Congressperson, {
      foreignKey: 'mainboard_id',
      sourceKey: 'mainboard_id'
    });
  };

  return Mainboard;
};
