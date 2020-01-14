import React from 'react';
import useStyles from '../tasksPage.style';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Checkbox,
  Paper,
  Tooltip,
  IconButton,
  Toolbar,
  Typography,
  Icon,
  InputBase,
} from '@material-ui/core';
import SortableTableHead from 'components/sortableTableHead/SortableTableHead';
import { orderTypes } from 'models/enums/orderTypes';
import { headCell } from 'models/types/table';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AppState, Action, SprintState } from 'models/types/store';
import { ThunkDispatch } from 'redux-thunk';
import { StoreAction } from 'store/actions';
import { connect } from 'react-redux';
import { ITask } from 'models/types/task';
import TaskTypeChip from 'components/taskTypeChip/TaskTypeChip';
import TaskPriorityChip from 'components/taskPriorityChip/TaskPriorityChip ';
import { deepPurple } from '@material-ui/core/colors';
import { Cancel, Edit, Search, AddCircle, MoveToInbox } from '@material-ui/icons';
import clsx from 'clsx';
import Swal from 'sweetalert2';

interface IDispatchProps {
  addTasksToSprint: (projectId: string, sprintId: string, taskIdList: string[]) => void;
  deleteTasks: (projectId: string, taskIdList: string[]) => void;
}

interface IStoreProps {
  taskList: ITask[];
  sprint: SprintState;
}

type Props = RouteComponentProps<any> & IStoreProps & IDispatchProps;

function ProjectTaskList(props: Props) {
  const classes = useStyles();

  const { taskList, sprint } = props;

  const [order, setOrder] = React.useState<orderTypes>(orderTypes.DESC);
  const [orderBy, setOrderBy] = React.useState<string>('identifier');
  const [search, setSearch] = React.useState<string>('');
  const [selectedTaskList, setselectedTaskList] = React.useState<ITask[]>([]);

  const handleRequestSort = (property: string) => {
    const isDesc = orderBy === property && order === orderTypes.DESC;
    setOrder(isDesc ? orderTypes.ASC : orderTypes.DESC);
    setOrderBy(property);
  };

  const handleTaskSelect = (event: React.MouseEvent<HTMLElement>, task: ITask) => {
    event.stopPropagation();
    selectedTaskList.filter(taskFromList => taskFromList.id === task.id).length === 0
      ? setselectedTaskList([...selectedTaskList, task])
      : setselectedTaskList(selectedTaskList.filter(taskFromList => taskFromList.id !== task.id));
  };

  const handleDeleteTasks = (taskList: ITask[]) => {
    const projectId = props.match.params.id;
    const taskIdList: string[] = taskList.map(task => task.id);

    Swal.fire({
      title: 'Are you sure?',
      text: `Please confirm that you want to delete this ${
        taskList.length > 1 ? 'tasks' : 'task'
      }.`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
    }).then((result: any) => {
      if (result.value) {
        props.deleteTasks(projectId, taskIdList);
        setselectedTaskList([]);
      }
    });
  };

  const addTasksToSprint = () => {
    const projectId = props.match.params.id;
    const sprintId = sprint.id;
    const taskIdList: string[] = selectedTaskList.map(task => task.id);

    Swal.fire({
      title: 'Are you sure?',
      text: `Please confirm that you want to modify the sprint`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
    }).then((result: any) => {
      if (result.value) {
        props.addTasksToSprint(projectId, sprintId, taskIdList);
        setselectedTaskList([]);
      }
    });
  };

  const onSelectAllClick = () => {
    if (selectedTaskList.length > 0) {
      setselectedTaskList([]);
    } else {
      setselectedTaskList(taskList);
    }
  };

  const headCells: headCell[] = [
    { id: 'identifier', label: 'Identifier', icon: 'vpn_key' },
    { id: 'title', label: 'Title', icon: 'title' },
    { id: 'type', label: 'Type', icon: 'dns', align: 'center' },
    { id: 'priority', label: 'Priority', icon: 'priority_high', align: 'center' },
    { id: 'labels', label: 'Labels', disableSorting: true, icon: 'label', align: 'center' },
    { id: 'points', label: 'Points', icon: 'star', align: 'center' },
    { id: 'actions', label: 'Actions', disableSorting: true, icon: 'games', align: 'center' },
  ];

  const compare = (a: any, b: any) => {
    const compA = typeof a[orderBy] === 'string' ? a[orderBy].toLowerCase() : a[orderBy];
    const compB = typeof b[orderBy] === 'string' ? b[orderBy].toLowerCase() : b[orderBy];

    let comparison = 0;
    if (compA > compB) {
      comparison = 1;
    } else if (compA < compB) {
      comparison = -1;
    }
    if (order === orderTypes.ASC) return comparison;
    return -comparison;
  };

  const filterBySearch = (task: ITask) => {
    return (
      task.identifier.toLowerCase().includes(search.toLowerCase()) ||
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.type.toLowerCase().includes(search.toLowerCase()) ||
      task.priority.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <Paper className={classes.paper}>
      <Toolbar
        className={clsx({
          [classes.toolbar]: selectedTaskList.length === 0,
          [classes.toolbarActive]: selectedTaskList.length > 0,
        })}
      >
        {selectedTaskList.length === 0 && (
          <div className={classes.title}>
            <Icon className={classes.headCellIcon}>list_alt</Icon>
            <Typography variant="h6">Task List</Typography>
          </div>
        )}
        {selectedTaskList.length > 0 && (
          <div className={classes.title}>
            <Typography variant="h6">{`${selectedTaskList.length} tasks selected`}</Typography>
          </div>
        )}
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <Search />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSearch(event.target.value);
            }}
          />
        </div>
        {selectedTaskList.length === 0 && (
          <Tooltip title="Create New Task">
            <IconButton className={classes.createNewTaskIcon} aria-label="Create New Task">
              <AddCircle />
            </IconButton>
          </Tooltip>
        )}
        {selectedTaskList.length > 0 && (
          <React.Fragment>
            <Tooltip title="Delete tasks">
              <IconButton
                className={classes.createNewTaskIcon}
                aria-label="Delete tasks"
                onClick={() => handleDeleteTasks(selectedTaskList)}
              >
                <Cancel />
              </IconButton>
            </Tooltip>
            {sprint.id && (
              <Tooltip title="Add tasks to sprint">
                <IconButton
                  className={classes.createNewTaskIcon}
                  aria-label="Add tasks to sprint"
                  onClick={() => addTasksToSprint()}
                >
                  <MoveToInbox />
                </IconButton>
              </Tooltip>
            )}
          </React.Fragment>
        )}
      </Toolbar>
      <div className={classes.tableWrapper}>
        <Table
          className={classes.table}
          size="small"
          aria-labelledby="tableTitle"
          aria-label="projects table"
        >
          <SortableTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headCells={headCells}
            withCheckBox={true}
            isIndeterminate={
              selectedTaskList.length > 0 && selectedTaskList.length < taskList.length
            }
            isChecked={selectedTaskList.length === taskList.length}
            onSelectAllClick={onSelectAllClick}
          />
          <TableBody>
            {taskList &&
              taskList
                .sort(compare)
                .filter(filterBySearch)
                .map(task => {
                  return (
                    <TableRow
                      hover
                      onClick={() => alert('task details')}
                      key={task.id}
                      className={classes.tableRow}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedTaskList.includes(task)}
                          onClick={(event: React.MouseEvent<HTMLElement>) =>
                            handleTaskSelect(event, task)
                          }
                        />
                      </TableCell>
                      <TableCell>{task.identifier}</TableCell>
                      <TableCell>{task.title}</TableCell>
                      <TableCell align="center">
                        <TaskTypeChip type={task.type} />
                      </TableCell>
                      <TableCell align="center">
                        <TaskPriorityChip priority={task.priority} />
                      </TableCell>
                      <TableCell align="center">
                        <div className={classes.labelsContainer}>
                          {(task.labels || []).map(label => {
                            return (
                              <Chip
                                key={label.id}
                                style={{ background: label.color }}
                                className={classes.label}
                                label={label.name}
                              />
                            );
                          })}
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={task.points}
                          style={{ background: deepPurple[500] }}
                          className={classes.label}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Edit task">
                          <IconButton
                            aria-label="Edit task"
                            // onClick={(event: React.MouseEvent<HTMLElement>) =>
                            //   handleDeleteProject(event, row)
                            // }
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete task">
                          <IconButton
                            aria-label="Delete task"
                            // onClick={(event: React.MouseEvent<HTMLElement>) =>
                            //   handleDeleteProject(event, row)
                            // }
                          >
                            <Cancel />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </div>
    </Paper>
  );
}

const mapStateToProps = (state: AppState) => ({
  taskList: state.project.projectTaskList,
  sprint: state.sprint,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, any, Action>) => ({
  addTasksToSprint: (projectId: string, sprintId: string, taskIdList: string[]) =>
    dispatch(StoreAction.project.addTasksToSprint(projectId, sprintId, taskIdList)),
  deleteTasks: (projectId: string, taskIdList: string[]) =>
    dispatch(StoreAction.project.deleteTasks(projectId, taskIdList)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectTaskList));
