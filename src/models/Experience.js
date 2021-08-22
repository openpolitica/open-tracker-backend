module.exports = function (sequelize, DataTypes) {
  const Experience = sequelize.define(
    'ExperienceModel',
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
      workplace_political_organization: DataTypes.TEXT,
      occupation_profession_position: DataTypes.TEXT,
      year_from: DataTypes.INTEGER,
      year_to: DataTypes.INTEGER,
      to_the_present: DataTypes.BOOLEAN,
    },
    {
      tableName: 'experience',
      timestamps: false,
    },
  );

  Experience.removeAttribute('id');
  Experience.associate = function ({ CongresspersonModel }) {
    Experience.belongsTo(CongresspersonModel, {
      foreignKey: 'cv_id',
      targetKey: 'cv_id',
    });
  };

  return Experience;
};
