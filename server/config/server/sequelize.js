import db from '../../models';

export default () => {
  const { sequelize } = db;

  sequelize.sync({force:false,hooks:true})
};
