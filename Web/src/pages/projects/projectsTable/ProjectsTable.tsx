import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useStyles from './projectsTable.style';
import ProjectsTableToolbar from './ProjectsTableToolbar';
import SortableTableHead from 'components/sortableTableHead/SortableTableHead';
import { Tooltip, IconButton, Chip, Avatar } from '@material-ui/core';
import { AppState, Action } from 'models/types/store';
import { ProjectsListData } from 'models/types/project';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Delete, Cancel } from '@material-ui/icons';
import defaultAvatar from 'assets/images/utils/default_avatar.png';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { ROUTES } from 'models/variables/routes';
import { StoreAction } from 'store/actions';
import { orderTypes } from 'models/enums/orderTypes';
import ProjectStateChip from 'components/projectStateChip/ProjectStateChip';
import { headCell } from 'models/types/table';
import { History } from 'history';

interface IDispatchProps {
  handleLeaveProject: (id: string, name: string) => void;
  handleDeleteProject: (id: string, name: string) => void;
  getProjectList: (
    order: orderTypes,
    orderBy: string,
    page: number,
    rowsPerPage: number,
    search: string,
  ) => void;
  setActiveProject: (projectId: string, history: History) => void;
}

interface IStoreProps {
  userId?: string;
  projectList: ProjectsListData[];
  projectListCount: number;
}

type Props = RouteComponentProps<any> & IStoreProps & IDispatchProps;

function ProjectsTable(props: Props) {
  const classes = useStyles();

  const [order, setOrder] = React.useState<orderTypes>(orderTypes.ASC);
  const [orderBy, setOrderBy] = React.useState<string>('name');
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(15);
  const [search, setSearch] = React.useState<string>('');

  useEffect(() => {
    props.getProjectList(order, orderBy, page, rowsPerPage, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, orderBy, page, rowsPerPage, search]);

  const headCells: headCell[] = [
    { id: 'name', label: 'Project Name', icon: 'bookmark' },
    { id: 'createdAt', label: 'Creation Date', icon: 'calendar_today' },
    { id: 'lead', label: 'Project Lead', icon: 'person' },
    { id: 'state', label: 'Project State', icon: 'timeline' },
    { id: 'actions', label: 'Actions', disableSorting: true, icon: 'games', align: 'center' },
  ];

  let timer: any;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer);
    const search = event.target.value;

    timer = setTimeout(() => {
      setSearch(search);
    }, 500);
  };

  const handleRequestSort = (property: string) => {
    const isDesc = orderBy === property && order === orderTypes.DESC;
    setOrder(isDesc ? orderTypes.ASC : orderTypes.DESC);
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleLeaveProject = (event: React.MouseEvent<HTMLElement>, project: ProjectsListData) => {
    event.stopPropagation();
    props.handleLeaveProject(project.id, project.name);
  };

  const handleDeleteProject = (event: React.MouseEvent<HTMLElement>, project: ProjectsListData) => {
    event.stopPropagation();
    props.handleDeleteProject(project.id, project.name);
  };

  const selectProject = (project: ProjectsListData) => {
    props.setActiveProject(project.id, props.history);
  };

  return (
    <Paper className={classes.paper}>
      <ProjectsTableToolbar classes={classes} handleSearch={handleSearch} />
      <div className={classes.tableWrapper}>
        <Table className={classes.table} aria-labelledby="tableTitle" aria-label="projects table">
          <SortableTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headCells={headCells}
          />
          <TableBody>
            {props.projectList &&
              props.projectList.map(row => {
                return (
                  <TableRow
                    hover
                    onClick={() => selectProject(row)}
                    key={row.name}
                    className={classes.tableRow}
                  >
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{new Date(row.createdAt).toDateString()}</TableCell>
                    <TableCell>
                      <Chip
                        component={Link}
                        to={`${ROUTES.profile.pathname}/${row.lead.id}`}
                        avatar={
                          <Avatar
                            alt={row.lead.name}
                            src={row.lead.avatar ? row.lead.avatar : defaultAvatar}
                          />
                        }
                        label={row.lead.name}
                        onClick={(event: React.MouseEvent<HTMLElement>) => event.stopPropagation()}
                      />
                    </TableCell>
                    <TableCell>
                      <ProjectStateChip projectState={row.state} />
                    </TableCell>
                    <TableCell align="center">
                      {row.lead.id === props.userId && (
                        <Tooltip title="Delete project">
                          <IconButton
                            aria-label="delete project"
                            onClick={(event: React.MouseEvent<HTMLElement>) =>
                              handleDeleteProject(event, row)
                            }
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      )}
                      {row.lead.id !== props.userId && (
                        <Tooltip title="Leave project">
                          <IconButton
                            aria-label="leave project"
                            onClick={(event: React.MouseEvent<HTMLElement>) =>
                              handleLeaveProject(event, row)
                            }
                          >
                            <Cancel />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 15, 20]}
        component="div"
        count={props.projectListCount}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
        onChangePage={(event: unknown, newPage: number) => setPage(newPage)}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

const mapStateToProps = (state: AppState) => ({
  userId: state.user.id,
  projectList: state.project.projectList,
  projectListCount: state.project.projectListCount,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, any, Action>) => ({
  setActiveProject: (projectId: string, history: History) =>
    dispatch(StoreAction.user.setActiveProject(projectId, history)),
  handleLeaveProject: (id: string, name: string) =>
    dispatch(StoreAction.project.handleLeaveProject(id, name)),
  handleDeleteProject: (id: string, name: string) =>
    dispatch(StoreAction.project.handleDeleteProject(id, name)),
  getProjectList: (
    order: orderTypes,
    orderBy: string,
    page: number,
    rowsPerPage: number,
    search: string,
  ) => dispatch(StoreAction.project.getProjectList(order, orderBy, page, rowsPerPage, search)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectsTable));
