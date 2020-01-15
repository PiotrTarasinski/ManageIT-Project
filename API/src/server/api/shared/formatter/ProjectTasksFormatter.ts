import ResponseFormatter from '../template/ResponseFormatter';
import { ProjectInstance } from '../../../database/models/Project';
import { TaskInstance } from '../../../database/models/Task';
import bulkFormat from '../../../../utils/bulkFormat';
import TaskFormatter, { TaskResponseFormat } from './TaskFormatter';

export type ProjectTasksResponseFormat = {
  id: string;
  name: string;
  state: string;
  leadId?: string;
  activeSprintId?: string;
  taskList: TaskResponseFormat[]
};

class ProjectTasksFormatter implements ResponseFormatter<ProjectInstance, ProjectTasksResponseFormat> {
  async format(project: ProjectInstance) {
    return {
      id: <string>project.id,
      name: project.name,
      state: <string>project.state,
      leadId: project.leadId,
      activeSprintId: project.activeSprintId,
      taskList: await bulkFormat(new TaskFormatter(), <TaskInstance[]>project.tasks)
    };
  }
}

export default ProjectTasksFormatter;
