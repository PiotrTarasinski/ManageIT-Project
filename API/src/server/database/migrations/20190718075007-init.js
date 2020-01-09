'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { DataTypes } = Sequelize;

    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      avatar: {
        type: DataTypes.STRING,
      }
    });

    await queryInterface.createTable('sprints', {
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
      description: {
        type: DataTypes.STRING
      },
      start: {
        type: DataTypes.DATE
      },
      end: {
        type: DataTypes.DATE
      }
    });

    await queryInterface.createTable('projects', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
      name: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.ENUM(['Completed', 'In Development', 'Planning', 'Cancelled']),
      },
      leadId: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        field: 'lead_id',
      },
      activeSprintId: {
        type: DataTypes.UUID,
        references: {
          model: 'sprints',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: true,
        field: 'active_sprint_id'
      }
    });

    await queryInterface.addColumn('users', 'active_project_id', {
      type: Sequelize.UUID,
      references: {
        model: 'projects',
        key: 'id'
      },
      allowNull: true
    });

    await queryInterface.addColumn('users', 'active_sprint_id', {
      type: Sequelize.UUID,
      references: {
        model: 'sprints',
        key: 'id'
      },
      allowNull: true
    });

    await queryInterface.createTable('usersProjects', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      projectId: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
          model: 'projects',
          key: 'id'
        },
        field: 'project_id'
      },
      userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id'
        },
        field: 'user_id'
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      },
      permissions: {
        type: DataTypes.ENUM(['User', 'Admin']),
        defaultValue: 'User'
      }
    });

    

    await queryInterface.createTable('sprintEntries', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      sprintId: {
        type: DataTypes.UUID,
        references: {
          model: 'sprints',
          key: 'id'
        },
        field: 'sprint_id',
        allowNull: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      projectId: {
        type: DataTypes.UUID,
        references: {
          model: 'projects',
          key: 'id'
        },
        field: 'project_id',
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      },
      identifier: {
        type: DataTypes.STRING
      },
      state: {
        type: DataTypes.ENUM(['To do', 'In progress', 'To review / test', 'Done']),
        allowNull: true
      },
      type: {
        type: DataTypes.ENUM(['Idea', 'Task', 'Bug', 'Improvement'])
      },
      index: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      points: {
        type: DataTypes.INTEGER
      },
      priority: {
        type: DataTypes.ENUM(['High', 'Normal', 'Low'])
      },
      title: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      }
    });

    await queryInterface.createTable('comments', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      userId: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id'
        },
        field: 'user_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      sprintEntryId: {
        type: DataTypes.UUID,
        references: {
          model: 'sprintEntries',
          key: 'id'
        },
        field: 'sprint_entry_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      },
      content: {
        type: DataTypes.STRING
      }
    });

    await queryInterface.createTable('labels', {
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
      color: {
        type: DataTypes.STRING
      }
    });

    await queryInterface.createTable('backlogs', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      userId: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id'
        },
        field: 'user_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      projectId: {
        type: DataTypes.UUID,
        references: {
          model: 'projects',
          key: 'id'
        },
        field: 'project_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      },
      message: {
        type: DataTypes.STRING
      },
      action: {
        type: DataTypes.STRING
      },
      eventId: {
        type: DataTypes.UUID,
        field: 'event_id'
      },
      type: {
        type: DataTypes.STRING
      }
    });

    await queryInterface.createTable('roleLabels', {
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
      color: {
        type: DataTypes.STRING
      }
    });

    await queryInterface.createTable('sprintEntryLabels', {
      sprintEntryId: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
          model: 'sprintEntries',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        field: 'sprint_entry_id'
      },
      labelId: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
          model: 'labels',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        field: 'label_id'
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      }
    });

    await queryInterface.createTable('sprintEntryUserAssigns', {
      sprintEntryId: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
          model: 'sprintEntries',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        field: 'sprint_entry_id'
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
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      }
    });

    await queryInterface.createTable('usersProjectsLabels', {
      roleLabelId: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
          model: 'roleLabels',
          key: 'id'
        },
        field: 'role_label_id'
      },
      projectId: {
        type: DataTypes.UUID,
        primaryKey: true,
        field: 'project_id'
      },
      userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        field: 'user_id'
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      }
    });

    await queryInterface.createTable('sprintEntryUserReviewers', {
      sprintEntryId: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
          model: 'sprintEntries',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        field: 'sprint_entry_id'
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
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropAllSchemas();
    await queryInterface.dropAllTables();
  },
};
