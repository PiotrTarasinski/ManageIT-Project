import { ITaskList, ITask } from 'models/types/task';
import { taskState } from 'models/enums/task';

function reordedTaskList(
  taskList: ITaskList,
  indexFrom: number,
  indexTo: number,
  stateFrom: taskState,
  stateTo: taskState,
): ITaskList {
  let source: ITask[] = Array.from(taskList[taskStateToList(stateFrom)]);
  let destination = Array.from(taskList[taskStateToList(stateTo)]);
  let movedTask: ITask = source[indexFrom];
  movedTask.index = indexTo;
  movedTask.state = stateTo;

  if (stateFrom === stateTo) {
    source.splice(indexFrom, 1);
    source.splice(indexTo, 0, movedTask);

    source.forEach((task: ITask, index: number) => {
      task.index = index;
    });

    taskList[taskStateToList(stateFrom)] = source;
    return taskList;
  }

  source.splice(indexFrom, 1);
  destination.splice(indexTo, 0, movedTask);

  source
    .filter((task: ITask) => task.index > indexFrom)
    .forEach((task: ITask) => {
      task.index = task.index - 1;
    });

  destination
    .filter((task: ITask) => task.index >= indexTo && task.id !== movedTask.id)
    .forEach((task: ITask) => {
      task.index = task.index + 1;
    });

  taskList[taskStateToList(stateFrom)] = source;
  taskList[taskStateToList(stateTo)] = destination;

  return taskList;
}

const taskStateToList = (state: taskState) => {
  if (state === taskState.TO_DO) return 'toDoList';
  if (state === taskState.IN_PROGRESS) return 'inProgressList';
  if (state === taskState.TO_REVIEW_AND_TEST) return 'toReviewList';
  return 'doneList';
};

export { reordedTaskList };
