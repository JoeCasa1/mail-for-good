'use strict';
export default function(sequelize, DataTypes) {
  var analysis = sequelize.define('analysis', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        analysis.belongsTo(models.user);
      }
    }
  });
  return analysis;
};
