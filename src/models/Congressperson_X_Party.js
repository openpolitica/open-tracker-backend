module.exports = function (sequelize, DataTypes) {
  const Congressperson_x_Party = sequelize.define(
    'CongresspersonXPartyModel',
    {
      start_date: DataTypes.DATE,
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      }
    },
    {
      tableName: 'congressperson_x_party'
    },
  );

  Congressperson_x_Party.associate = function ({ Congressperson, Party }) {
    Congressperson_x_Party.belongsTo(Congressperson, {
      foreignKey: 'cv_id',
      targetKey: 'cv_id',
    });

    Congressperson_x_Party.belongsTo(Party, {
      foreignKey: 'party_id',
      targetKey: 'party_id',
    });
  };

  return Congressperson_x_Party;
};
