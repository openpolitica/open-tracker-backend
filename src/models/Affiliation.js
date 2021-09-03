module.exports = function (sequelize, DataTypes) {
  const Affiliation = sequelize.define(
    'AffiliationModel',
    {
      dni: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'CongresspersonModel',
          key: 'id_dni',
        },
      },
      active: DataTypes.BOOLEAN,
      political_party: DataTypes.TEXT,
      political_party_scope: DataTypes.TEXT,
      political_party_status: DataTypes.TEXT,
      political_party_registration_date: DataTypes.TEXT,
      affiliation_status: DataTypes.TEXT,
      affiliation_begin: DataTypes.TEXT,
      affiliation_cancellation: DataTypes.TEXT,
      affiliation_representative: DataTypes.TEXT,
      affiliation_committee: DataTypes.TEXT,
    },
    {
      tableName: 'affiliation',
      timestamps: false,
    },
  );

  Affiliation.removeAttribute('id');
  Affiliation.associate = function ({ CongresspersonModel }) {
    Affiliation.belongsTo(CongresspersonModel, {
      foreignKey: 'dni',
      targetKey: 'id_dni',
    });
  };

  return Affiliation;
};
