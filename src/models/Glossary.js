module.exports = function (sequelize, DataTypes) {
  const Glossary = sequelize.define(
    'GlossaryModel',
    {
      glossary_id: {
        type: DataTypes.TEXT,
        primaryKey: true,
      },
      glossary_name: DataTypes.TEXT,
      category_id: {
        type: DataTypes.TEXT,
        allowNull: true,
        references: {
          model: 'CategoryModel',
          key: 'category_id',
        },
      },
      glossary_description: DataTypes.DATE,
      glossary_source: DataTypes.TEXT,
      glossary_source_url: DataTypes.TEXT,
    },
    {
      tableName: 'glossary',
      timestamps: false,
    },
  );

  Glossary.associate = function ({ CategoryModel }) {
    Glossary.belongsTo(CategoryModel, {
      foreignKey: 'category_id',
      targetKey: 'category_id',
      as: 'category',
    });
  };

  return Glossary;
};
