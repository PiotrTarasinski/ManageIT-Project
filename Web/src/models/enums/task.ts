enum taskState {
  TO_DO = 'To do',
  IN_PROGRESS = 'In progress',
  TO_REVIEW_AND_TEST = 'To review / test',
  DONE = 'Done',
}

enum taskType {
  TASK = 'Task',
  IMPROVMENT = 'Improvment',
  BUG = 'Bug',
  IDEA = 'Idea',
}
enum taskPriority {
  HIGH = 'High',
  NORMAL = 'Normal',
  LOW = 'Low',
}

export { taskState, taskType, taskPriority };
