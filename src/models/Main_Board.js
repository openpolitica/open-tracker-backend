module.exports = function (sequelize, DataTypes) {
  const Main_Board = sequelize.define(
    'MainBoardModel',
    {
      main_board_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      main_board_period: DataTypes.TEXT,
      start_date: DataTypes.DATE,
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'main_board',
    },
  );

  Main_Board.associate = function ({}) {};

  return Main_Board;
};
