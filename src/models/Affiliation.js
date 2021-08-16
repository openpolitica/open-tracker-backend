module.exports = function (sequelize, DataTypes) {
  const Affiliation = sequelize.define(
    'AffiliationModel',
    {
      cv_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'CongresspersonModel',
          key: 'cv_id',
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
    },
  );

  Affiliation.associate = function ({ CongresspersonModel }) {
    Affiliation.belongsTo(CongresspersonModel, {
      foreignKey: 'cv_id',
      targetKey: 'cv_id',
    });
  };

  return Affiliation;
};
