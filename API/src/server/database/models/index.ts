import Sequelize from 'sequelize';
import { env } from '../../../config';
import { UserAttributes, UserFactory, UserInstance } from './User';
import { logger } from '../../../utils';
import { ProjectInstance, ProjectAttributes, ProjectFactory } from './Project';
import { UserProjectInstance, UserProjectAttributes, UserProjectFactory } from './UserProject';
import { SprintInstance, SprintAttributes, SprintFactory } from './Sprint';
import { TaskInstance, TaskAttributes, TaskFactory } from './Task';
import { LabelInstance, LabelAttributes, LabelFactory } from './Label';
import { TaskUserAssignInstance, TaskUserAssignAttributes, TaskUserAssignFactory } from './TaskUserAssign';
import { TaskUserReviewerInstance, TaskUserReviewerAttributes, TaskUserReviewerFactory } from './TaskUserReviewer';
import { CommentInstance, CommentAttributes, CommentFactory } from './Comment';
import { TaskLabelInstance, TaskLabelAttributes, TaskLabelFactory } from './TaskLabel';
import { BacklogInstance, BacklogAttributes, BacklogFactory } from './Backlog';
import { RoleLabelInstance, RoleLabelAttributes, RoleLabelFactory } from './RoleLabel';
import { UserProjectLabelInstance, UserProjectLabelAttributes, UserProjectLabelFactory } from './UserProjectLabel';
import { TaskSprintInstance, TaskSprintAttributes, TaskSprintFactory } from './TaskSprint';


export type DbModels = {
  User: Sequelize.Model<UserInstance, UserAttributes>;
  Project: Sequelize.Model<ProjectInstance, ProjectAttributes>;
  UserProject: Sequelize.Model<UserProjectInstance, UserProjectAttributes>;
  Sprint: Sequelize.Model<SprintInstance, SprintAttributes>;
  Task: Sequelize.Model<TaskInstance, TaskAttributes>;
  Label: Sequelize.Model<LabelInstance, LabelAttributes>;
  TaskUserAssign: Sequelize.Model<TaskUserAssignInstance, TaskUserAssignAttributes>;
  TaskUserReviewer: Sequelize.Model<TaskUserReviewerInstance, TaskUserReviewerAttributes>;
  TaskLabel: Sequelize.Model<TaskLabelInstance, TaskLabelAttributes>;
  Comment: Sequelize.Model<CommentInstance, CommentAttributes>;
  Backlog: Sequelize.Model<BacklogInstance, BacklogAttributes>;
  RoleLabel: Sequelize.Model<RoleLabelInstance, RoleLabelAttributes>;
  UserProjectLabel: Sequelize.Model<UserProjectLabelInstance, UserProjectLabelAttributes>;
  TaskSprint: Sequelize.Model<TaskSprintInstance, TaskSprintAttributes>;
};

export interface DbInterface extends DbModels {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
}

export const sequelize = new Sequelize(
  env.DB.DATABASE,
  env.DB.USERNAME,
  env.DB.PASSWORD,
  {
    host: env.DB.HOST,
    port: <number>env.DB.PORT,
    dialect: env.DB.DIALECT,
    operatorsAliases: false,
    logging: (env.NODE_ENV === 'development' && !env.DB.FORCE_SUPRESS_LOGS) || env.NODE_ENV === 'production' ? (sql: any) => logger.info(sql) : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

export const createModels = (): DbInterface => {
  const db: DbInterface = {
    sequelize,
    Sequelize,
    User: UserFactory(sequelize, Sequelize),
    Sprint: SprintFactory(sequelize, Sequelize),
    Project: ProjectFactory(sequelize, Sequelize),
    UserProject: UserProjectFactory(sequelize, Sequelize),
    Task: TaskFactory(sequelize, Sequelize),
    Label: LabelFactory(sequelize, Sequelize),
    TaskUserAssign: TaskUserAssignFactory(sequelize, Sequelize),
    TaskUserReviewer: TaskUserReviewerFactory(sequelize, Sequelize),
    Comment: CommentFactory(sequelize, Sequelize),
    TaskLabel: TaskLabelFactory(sequelize, Sequelize),
    Backlog: BacklogFactory(sequelize, Sequelize),
    RoleLabel: RoleLabelFactory(sequelize, Sequelize),
    UserProjectLabel: UserProjectLabelFactory(sequelize, Sequelize),
    TaskSprint: TaskSprintFactory(sequelize, Sequelize)
  };

  Object.values(db).forEach((model) => {
    if (model.associate) {
      model.associate(db);
    }
  });

  return db;
};
