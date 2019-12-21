'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

  const { DataTypes } = Sequelize;

  await queryInterface.createTable('users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    avatar: {
      type: DataTypes.STRING
    }
  });

  await queryInterface.createTable('projects', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    },
    name: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.ENUM(['Completed', 'In development', 'Planning', 'Cancelled'])
    },
    leadId: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      field: 'lead_id'
    }
  });

  await queryInterface.createTable('usersProjects', {
    projectId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'projects',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      field: 'project_id'
    },
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      field: 'user_id'
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      field: 'is_admin'
    },
    isSupervisor: {
      type: DataTypes.BOOLEAN,
      field: 'is_supervisor'
    },
    isModerator: {
      type: DataTypes.BOOLEAN,
      field: 'is_moderator'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    },
  });
},

down: async(queryInterface, Sequelize) => {
  await queryInterface.dropAllSchemas();
  await queryInterface.dropAllTables();
}
}
