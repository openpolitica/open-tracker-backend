module.exports = function (sequelize, DataTypes) {
  const Judgment_EC = sequelize.define(
    'JudgmentECModel',
    {
      cv_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'CongresspersonModel',
          key: 'cv_id',
        },
      },
      crime: DataTypes.TEXT,
      process: DataTypes.INTEGER,
      type: DataTypes.TEXT,
      verdict: DataTypes.TEXT,
    },
    {
      tableName: 'judgment_ec',
    },
  );

  Judgment_EC.associate = function ({ CongresspersonModel }) {
    Judgment_EC.belongsTo(CongresspersonModel, {
      foreignKey: 'cv_id',
      targetKey: 'cv_id',
    });
  };

  return Judgment_EC;
};
