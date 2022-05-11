module.exports = function (sequelize, DataTypes) {
  const Category = sequelize.define(
    'CategoryModel',
    {
      category_id: {
        type: DataTypes.TEXT,
        primaryKey: true,
      },
      category_name: DataTypes.TEXT,
      category_description: DataTypes.DATE,
    },
    {
      tableName: 'category',
      timestamps: false,
    },
  );

  Category.associate = function ({ GlossaryModel }) {
    Category.hasMany(GlossaryModel, {
      foreignKey: 'category_id',
      sourceKey: 'category_id',
      as: 'terms',
    });
  };

  return Category;
};
