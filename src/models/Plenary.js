module.exports = function (sequelize, DataTypes) {
  const Plenary = sequelize.define(
    'PlenaryModel',
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
      link_photo: DataTypes.INTEGER,
      web_page: DataTypes.TEXT,
      email: DataTypes.TEXT,
      vote: DataTypes.INTEGER,
      political_party: DataTypes.TEXT,
      parliamentary_group: DataTypes.TEXT,
      electoral_district: DataTypes.TEXT,
      status: DataTypes.TEXT,
      start_date: DataTypes.DATE,
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'plenary',
      timestamps: false,
    },
  );

  Plenary.associate = function ({ CongresspersonModel }) {
    Plenary.belongsTo(CongresspersonModel, {
      foreignKey: 'cv_id',
      targetKey: 'cv_id',
    });
  };

  return Plenary;
};
