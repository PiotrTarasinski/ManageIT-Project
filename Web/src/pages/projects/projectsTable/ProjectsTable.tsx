import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useStyles from './projectsTable.style';
import { Order } from 'models/types/table';
import ProjectsTableHead from './ProjectsTableHead';
import ProjectsTableToolbar from './ProjectsTableToolbar';
import { Tooltip, IconButton, Chip, Avatar } from '@material-ui/core';
import { AppState, Action } from 'models/types/store';
import { ProjectState, ProjectsListData } from 'models/types/project';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { CheckCircle, Delete, Cancel, Settings, EmojiObjectsRounded } from '@material-ui/icons';
import defaultAvatar from 'assets/images/utils/default_avatar.png';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { ROUTES } from 'models/variables/routes';
import clsx from 'clsx';
import { StoreAction } from 'store/actions';

interface IDispatchProps {
  handleLeaveProject: (id: string, name: string) => void;
  handleDeleteProject: (id: string, name: string) => void;
  getProjectList: (
    order: Order,
    orderBy: string,
    page: number,
    rowsPerPage: number,
    search: string,
  ) => void;
}

interface IStoreProps {
  userId?: string;
  projectList: ProjectsListData[];
  projectListCount: number;
}

const renderProjectState = (classes: ReturnType<typeof useStyles>, projectState: ProjectState) => {
  let icon: JSX.Element | undefined = undefined;
  if (projectState === 'Completed') icon = <CheckCircle />;
  if (projectState === 'In Development') icon = <Settings />;
  if (projectState === 'Planning') icon = <EmojiObjectsRounded />;
  if (projectState === 'Cancelled') icon = <Cancel />;

  return (
    <Chip
      label={projectState}
      icon={icon}
      className={clsx(classes.projectStateChip, {
        [classes.completedStateChip]: projectState === 'Completed',
        [classes.inDevelopmentStateChip]: projectState === 'In Development',
        [classes.planningStateChip]: projectState === 'Planning',
        [classes.cancelledStateChip]: projectState === 'Cancelled',
      })}
    />
  );
};

type Props = RouteComponentProps<any> & IStoreProps & IDispatchProps;

function ProjectsTable(props: Props) {
  const classes = useStyles();

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<string>('name');
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(15);
  const [search, setSearch] = React.useState<string>('');

  useEffect(() => {
    props.getProjectList(order, orderBy, page, rowsPerPage, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, orderBy, page, rowsPerPage, search]);

  let timer: any;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer);
    const search = event.target.value;

    timer = setTimeout(() => {
      setSearch(search);
    }, 500);
  };

  const handleRequestSort = (property: string) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleLeaveProject = (event: React.MouseEvent<HTMLElement>, row: ProjectsListData) => {
    event.stopPropagation();
    props.handleLeaveProject(row.id, row.name);
  };

  const handleDeleteProject = (event: React.MouseEvent<HTMLElement>, row: ProjectsListData) => {
    event.stopPropagation();
    props.handleDeleteProject(row.id, row.name);
  };

  return (
    <Paper className={classes.paper}>
      <ProjectsTableToolbar classes={classes} handleSearch={handleSearch} />
      <div className={classes.tableWrapper}>
        <Table className={classes.table} aria-labelledby="tableTitle" aria-label="projects table">
          <ProjectsTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {props.projectList &&
              props.projectList.map(row => {
                return (
                  <TableRow
                    hover
                    onClick={() => props.history.push(`${ROUTES.dashboard.pathname}/${row.id}`)}
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
                    <TableCell>{renderProjectState(classes, row.state)}</TableCell>
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
  handleLeaveProject: (id: string, name: string) =>
    dispatch(StoreAction.project.handleLeaveProject(id, name)),
  handleDeleteProject: (id: string, name: string) =>
    dispatch(StoreAction.project.handleDeleteProject(id, name)),
  getProjectList: (
    order: Order,
    orderBy: string,
    page: number,
    rowsPerPage: number,
    search: string,
  ) => dispatch(StoreAction.project.getProjectList(order, orderBy, page, rowsPerPage, search)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectsTable));
