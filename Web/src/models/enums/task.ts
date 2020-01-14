enum taskState {
  TO_DO = 'To do',
  IN_PROGRESS = 'In progress',
  TO_REVIEW_AND_TEST = 'To review / test',
  DONE = 'Done',
}

enum taskType {
  TASK = 'Task',
  IMPROVEMENT = 'Improvement',
  BUG = 'Bug',
  IDEA = 'Idea',
}
enum taskPriority {
  HIGH = 'High',
  NORMAL = 'Normal',
  LOW = 'Low',
}

enum assignType {
  ASSIGN = 'Assign',
  REVIEW = 'Review',
}

export { taskState, taskType, taskPriority, assignType };
