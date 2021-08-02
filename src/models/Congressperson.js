module.exports = function (sequelize, DataTypes) {
  const Congressperson = sequelize.define(
    'CongresspersonModel',
    {
      cv_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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

  return Congressperson;
};
