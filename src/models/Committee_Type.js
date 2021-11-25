module.exports = function (sequelize, DataTypes) {
  const Committee_Type = sequelize.define(
    'CommitteeTypeModel',
    {
      committee_type_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      committee_type_name: DataTypes.TEXT,
    },
    {
      tableName: 'committee_type',
      timestamps: false,
    },
  );

  Committee_Type.associate = function ({ CommitteeModel }) {
    Committee_Type.hasMany(CommitteeModel, {
      foreignKey: 'committee_type_id',
      sourceKey: 'committee_type_id',
    });
  };

  return Committee_Type;
};
