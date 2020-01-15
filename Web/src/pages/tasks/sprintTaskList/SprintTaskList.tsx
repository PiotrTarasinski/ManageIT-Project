import React from 'react';
import useStyles from '../tasksPage.style';
import { Table, TableBody, TableRow, TableCell, Chip, Checkbox, Paper } from '@material-ui/core';
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
import SprintTaskListToolbar from './SprintTaskListToolbar';

interface IStoreProps {
  sprint: SprintState;
}

type Props = RouteComponentProps<any> & IStoreProps;

function SprintTaskList(props: Props) {
  const classes = useStyles();

  const { sprint } = props;

  const taskList = [
    ...sprint.taskList.toDoList,
    ...sprint.taskList.inProgressList,
    ...sprint.taskList.toReviewList,
    ...sprint.taskList.doneList,
  ];

  const [order, setOrder] = React.useState<orderTypes>(orderTypes.DESC);
  const [orderBy, setOrderBy] = React.useState<string>('identifier');
  const [search, setSearch] = React.useState<string>('');
  const [selectedTaskList, setselectedTaskList] = React.useState<ITask[]>([]);

  const handleRequestSort = (property: string) => {
    const isDesc = orderBy === property && order === orderTypes.DESC;
    setOrder(isDesc ? orderTypes.ASC : orderTypes.DESC);
    setOrderBy(property);
  };

  const handleTaskSelect = (task: ITask) => {
    selectedTaskList.filter(taskFromList => taskFromList.id === task.id).length === 0
      ? setselectedTaskList([...selectedTaskList, task])
      : setselectedTaskList(selectedTaskList.filter(taskFromList => taskFromList.id !== task.id));
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
      <SprintTaskListToolbar
        handleSearch={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(event.target.value);
        }}
      />
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
                      // onClick={() => props.history.push(`${ROUTES.profile.pathname}/${member.id}`)}
                      key={task.id}
                      className={classes.tableRow}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedTaskList.includes(task)}
                          onClick={() => handleTaskSelect(task)}
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
                      <TableCell></TableCell>
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
  sprint: state.sprint,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, any, Action>) => ({
  // getProjectTaskList: (projectId: string) =>
  //   dispatch(StoreAction.project.getProjectTaskList(projectId)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SprintTaskList));
