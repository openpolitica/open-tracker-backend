module.exports = function (sequelize, DataTypes) {
  const Data_EC = sequelize.define(
    'DataECModel',
    {
      cv_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'CongresspersonModel',
          key: 'cv_id',
        },
      },
      ballots_sat: DataTypes.INTEGER,
      driver_license: DataTypes.TEXT,
      servir_sanction_registry: DataTypes.TEXT,
      servir_sanction_institution: DataTypes.TEXT,
      sunat_debt: DataTypes.DECIMAL(12, 2),
      electoral_contributions: DataTypes.DECIMAL(12, 2),
      electoral_process_participated: DataTypes.INTEGER,
      electoral_process_won: DataTypes.INTEGER,
      designated: DataTypes.TEXT,
    },
    {
      tableName: 'data_ec',
      timestamps: false,
    },
  );

  Data_EC.associate = function ({ CongresspersonModel }) {
    Data_EC.belongsTo(CongresspersonModel, {
      foreignKey: 'cv_id',
      targetKey: 'cv_id',
    });
  };

  return Data_EC;
};
