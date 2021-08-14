module.exports = function (sequelize, DataTypes) {
  const Congressperson_x_Party = sequelize.define(
    'CongresspersonXPartyModel',
    {
      cv_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'CongresspersonModel',
          key: 'cv_id',
        },
      },
      party_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'PoliticalPartyModel',
          key: 'party_id',
        },
      },
      start_date: DataTypes.DATE,
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'political_party_x_congressperson',
    },
  );

  Congressperson_x_Party.associate = function ({
    CongresspersonModel,
    PoliticalPartyModel,
  }) {
    Congressperson_x_Party.belongsTo(CongresspersonModel, {
      foreignKey: 'cv_id',
      targetKey: 'cv_id',
    });

    Congressperson_x_Party.belongsTo(PoliticalPartyModel, {
      foreignKey: 'party_id',
      targetKey: 'party_id',
    });
  };

  return Congressperson_x_Party;
};
