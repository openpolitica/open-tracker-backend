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
      congressperson_slug: DataTypes.TEXT,
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
      tableName: 'congressperson',
      timestamps: false,
    },
  );

  Congressperson.associate = function ({
    SocialNetworkModel,
    LocationModel,
    PoliticalPartyModel,
    MainboardModel,
    CommissionModel,
    ParliamentaryGroupModel,
    CongresspersonXPartyModel,
    CongresspersonXMainboardModel,
    CongresspersonXCommissionModel,
    CongresspersonXParliamentaryGroupModel,
    SocialNetworkXCongresspersonModel,
    ExtraDataModel,
    IncomeModel,
    DataECModel,
    EducationModel,
    ExperienceModel,
    GoodsMovableModel,
    GoodsImmovableModel,
    JudgmentECModel,
    AffiliationModel,
  }) {
    Congressperson.belongsTo(LocationModel, {
      foreignKey: 'postulation_ubigeo',
      targetKey: 'ubigeo',
      as: 'location',
    });

    /**
     * Super Many-to-many relationships
     * See: https://sequelize.org/master/manual/advanced-many-to-many.html#the-best-of-both-worlds--the-super-many-to-many-relationship
     */

    Congressperson.belongsToMany(SocialNetworkModel, {
      through: SocialNetworkXCongresspersonModel,
      foreignKey: 'cv_id',
      otherKey: 'social_network_id',
    });

    Congressperson.hasMany(SocialNetworkXCongresspersonModel, {
      foreignKey: 'cv_id',
      sourceKey: 'cv_id',
    });

    Congressperson.belongsToMany(PoliticalPartyModel, {
      through: CongresspersonXPartyModel,
      foreignKey: 'cv_id',
      otherKey: 'political_party_id',
    });

    Congressperson.hasMany(CongresspersonXPartyModel, {
      foreignKey: 'cv_id',
      sourceKey: 'cv_id',
      as: 'congressperson_parties',
    });

    Congressperson.belongsToMany(MainboardModel, {
      through: CongresspersonXMainboardModel,
      foreignKey: 'cv_id',
      otherKey: 'mainboard_id',
    });

    Congressperson.hasMany(CongresspersonXMainboardModel, {
      foreignKey: 'cv_id',
      sourceKey: 'cv_id',
    });

    Congressperson.belongsToMany(CommissionModel, {
      through: CongresspersonXCommissionModel,
      foreignKey: 'cv_id',
      otherKey: 'commission_id',
    });

    Congressperson.hasMany(CongresspersonXCommissionModel, {
      foreignKey: 'cv_id',
      sourceKey: 'cv_id',
    });

    Congressperson.belongsToMany(ParliamentaryGroupModel, {
      as: 'parliamentary_group',
      through: CongresspersonXParliamentaryGroupModel,
      foreignKey: 'cv_id',
      otherKey: 'parliamentary_group_id',
    });

    Congressperson.hasMany(CongresspersonXParliamentaryGroupModel, {
      foreignKey: 'cv_id',
      sourceKey: 'cv_id',
      as: 'congressperson_parliamentary_groups',
    });

    Congressperson.hasOne(ExtraDataModel, {
      foreignKey: 'cv_id',
      sourceKey: 'cv_id',
      as: 'extra_data',
    });

    Congressperson.hasOne(IncomeModel, {
      foreignKey: 'cv_id',
      sourceKey: 'cv_id',
      as: 'income',
    });

    Congressperson.hasOne(DataECModel, {
      foreignKey: 'cv_id',
      sourceKey: 'cv_id',
      as: 'data_ec',
    });

    Congressperson.hasMany(EducationModel, {
      foreignKey: 'cv_id',
      sourceKey: 'cv_id',
      as: 'education',
    });

    Congressperson.hasMany(ExperienceModel, {
      foreignKey: 'cv_id',
      sourceKey: 'cv_id',
      as: 'experience',
    });

    Congressperson.hasMany(GoodsMovableModel, {
      foreignKey: 'cv_id',
      sourceKey: 'cv_id',
      as: 'goods_movable',
    });

    Congressperson.hasMany(GoodsImmovableModel, {
      foreignKey: 'cv_id',
      sourceKey: 'cv_id',
      as: 'goods_immovable',
    });

    Congressperson.hasMany(JudgmentECModel, {
      foreignKey: 'cv_id',
      sourceKey: 'cv_id',
      as: 'judgments',
    });

    Congressperson.hasMany(AffiliationModel, {
      foreignKey: 'dni',
      sourceKey: 'id_dni',
      as: 'affiliations',
    });
  };

  return Congressperson;
};
