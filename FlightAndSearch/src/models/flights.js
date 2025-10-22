

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Flights extends Model {
    static associate(models) {
      // define association here
    }
  }

  Flights.init({
    flightNumber: { 
      type: DataTypes.STRING,
      allowNull: false,
      //  unique: true
    },
    airplaneId: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    departureAirportId: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    arrivalAirportId: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    arrivalTime: { 
      type: DataTypes.DATE,
      allowNull: false
    },
    departurTime: {  // maybe typo? should be `departureTime`
      type: DataTypes.DATE,
      allowNull: false
    },
    price: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    boarding: DataTypes.STRING,
    totalSeats: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize, // ✅ moved here
    modelName: 'Flights', // ✅ moved here
    tableName: 'flights', // optional but recommended
    timestamps: false     // optional
  });

  return Flights;
};
