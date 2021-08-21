module.exports = function (sequelize, DataTypes) {
  const Extra_Data = sequelize.define(
    'ExtraDataModel',
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
      education_higher_level: DataTypes.TEXT,
      judgments_ec_civil_count: DataTypes.INTEGER,
      judgments_ec_penal_count: DataTypes.INTEGER,
      education_primary: DataTypes.INTEGER,
      education_secondary: DataTypes.INTEGER,
      education_higher_technical: DataTypes.INTEGER,
      education_higher_nonuniversity: DataTypes.INTEGER,
      education_higher_university: DataTypes.INTEGER,
      education_postgraduate: DataTypes.INTEGER,
      experience_public: DataTypes.INTEGER,
      experience_private: DataTypes.INTEGER,
      movables_value: DataTypes.DECIMAL(12, 2),
      immovables_value: DataTypes.DECIMAL(12, 2),
    },
    {
      tableName: 'extra_data',
      timestamps: false,
    },
  );

  Extra_Data.associate = function ({ CongresspersonModel }) {
    Extra_Data.belongsTo(CongresspersonModel, {
      foreignKey: 'cv_id',
      targetKey: 'cv_id',
    });
  };

  return Extra_Data;
};
