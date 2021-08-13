module.exports = function (sequelize, DataTypes) {
  const Congressperson = sequelize.define(
    'CongresspersonModel',
    {
      cv_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      postulation_ubigeo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'LocationModel',
          key: 'postulation_ubigeo',
        },
      },
      status_id: DataTypes.INTEGER,
      postulation_year: DataTypes.INTEGER,
      file_id: DataTypes.INTEGER,
      election_type_id: DataTypes.INTEGER,
      electoral_process_id: DataTypes.INTEGER,
      candidate_id: DataTypes.INTEGER,
      place: DataTypes.INTEGER,
      position_id: DataTypes.INTEGER,
      political_party_id: DataTypes.INTEGER,
      id_dni: DataTypes.INTEGER,
      residence_ubigeo: DataTypes.INTEGER,
      political_party_type: DataTypes.TEXT,
      cv: DataTypes.TEXT,
      link_photo: DataTypes.TEXT,
      id_name: DataTypes.TEXT,
      id_first_surname: DataTypes.TEXT,
      id_second_surname: DataTypes.TEXT,
      id_gender: DataTypes.TEXT,
      birth_date: DataTypes.TEXT,
      position_postulation: DataTypes.TEXT,
      position_elected: DataTypes.TEXT,
      political_party_name: DataTypes.TEXT,
    },
    {
      tableName: 'candidate',
      timestamps: false,
    },
  );

  Congressperson.associate = function ({ Social_Network, Location, Party, Mainboard, Commission, Parliamentary_Group, Congressperson_x_Party, Congressperson_x_Mainboard, Congressperson_x_Commission, Congressperson_x_ParliamentaryGroup }) {
    Congressperson.hasMany(Social_Network, {
      foreignKey: 'cv_id',
      sourceKey: 'cv_id',
    });

    Congressperson.belongsTo(Location, {
      foreignKey: 'postulation_ubigeo',
      targetKey: 'postulation_ubigeo',
    });

    /**
     * Super Many-to-many relationships
     * See: https://sequelize.org/master/manual/advanced-many-to-many.html#the-best-of-both-worlds--the-super-many-to-many-relationship
     */

    Congressperson.belongsToMany(Party, {
      through: Congressperson_x_Party,
      foreignKey: 'cv_id',
      otherKey: 'party_id'
    });

    Congressperson.hasMany(Congressperson_x_Party, {
      foreignKey: 'cv_id',
      sourceKey: 'cv_id'
    });

    Congressperson.belongsToMany(Mainboard, {
      through: Congressperson_x_Mainboard,
      foreignKey: 'cv_id',
      otherKey: 'mainboard_id'
    });

    Congressperson.hasMany(Congressperson_x_Mainboard, {
      foreignKey: 'cv_id',
      sourceKey: 'cv_id'
    });

    Congressperson.belongsToMany(Commission, {
      through: Congressperson_x_Commission,
      foreignKey: 'cv_id',
      otherKey: 'commission_id'
    });

    Congressperson.hasMany(Congressperson_x_Commission, {
      foreignKey: 'cv_id',
      sourceKey: 'cv_id'
    });

    Congressperson.belongsToMany(Parliamentary_Group, {
      through: Congressperson_x_ParliamentaryGroup,
      foreignKey: 'cv_id',
      otherKey: 'commission_id'
    });

    Congressperson.hasMany(Congressperson_x_ParliamentaryGroup, {
      foreignKey: 'cv_id',
      sourceKey: 'cv_id'
    });
  };

  return Congressperson;
};
