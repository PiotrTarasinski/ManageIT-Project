import { createModels, sequelize } from './models';

export { sequelize };

const db = createModels();

export default db;
