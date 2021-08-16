module.exports = function (sequelize, DataTypes) {
  const Income = sequelize.define(
    'IncomeModel',
    {
      cv_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'CongresspersonModel',
          key: 'cv_id',
        },
      },
      total: DataTypes.DECIMAL(15, 2),
      total_private: DataTypes.DECIMAL(15, 2),
      total_public: DataTypes.DECIMAL(15, 2),
    },
    {
      tableName: 'income',
    },
  );

  Income.associate = function ({ CongresspersonModel }) {
    Income.belongsTo(CongresspersonModel, {
      foreignKey: 'cv_id',
      targetKey: 'cv_id',
    });
  };

  return Income;
};
