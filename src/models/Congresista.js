module.exports = function(sequelize, DataTypes) {
  const Congresista = sequelize.define('CongresistaModel', {
    hoja_vida_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    estado_id: DataTypes.INTEGER,
    postula_anio: DataTypes.INTEGER,
    expediente_id: DataTypes.INTEGER,
    tipo_eleccion_id: DataTypes.INTEGER,
    proceso_electoral_id: DataTypes.INTEGER,
    candidato_id: DataTypes.INTEGER,
    posicion: DataTypes.INTEGER,
    cargo_id: DataTypes.INTEGER,
    org_politica_id: DataTypes.INTEGER,
    id_dni: DataTypes.INTEGER,
    domicilio_ubigeo: DataTypes.INTEGER,
    org_politica_tipo: DataTypes.TEXT,
    hoja_vida: DataTypes.TEXT,
    enlace_foto: DataTypes.TEXT,
    id_nombres: DataTypes.TEXT,
    id_apellido_paterno: DataTypes.TEXT,
    id_apellido_materno: DataTypes.TEXT,
    id_sexo: DataTypes.TEXT,
    nacimiento_fecha: DataTypes.TEXT,
    cargo_nombre: DataTypes.TEXT,
    org_politica_nombre: DataTypes.TEXT
  }, {
    tableName: 'candidato',
    timestamps: false,
  });

  return Congresista;
}