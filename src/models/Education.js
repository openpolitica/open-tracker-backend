module.exports = function (sequelize, DataTypes) {
  const Education = sequelize.define(
    'EducationModel',
    {
      cv_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'CongresspersonModel',
          key: 'cv_id',
        },
      },
      type: DataTypes.TEXT,
      finished: DataTypes.BOOLEAN,
      study_centre: DataTypes.TEXT,
      career: DataTypes.TEXT,
    },
    {
      tableName: 'education',
    },
  );

  Education.associate = function ({ CongresspersonModel }) {
    Education.belongsTo(CongresspersonModel, {
      foreignKey: 'cv_id',
      targetKey: 'cv_id',
    });
  };

  return Education;
};
