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
import { ProjectState } from 'models/types/project';
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
}

interface IStoreProps {
  userId?: string;
}
interface ProjectLead {
  id: string;
  name: string;
  avatar?: string;
}

interface ProjectsListData {
  id: string;
  projectName: string;
  creationDate: string;
  projectLead: ProjectLead;
  projectState: ProjectState;
}

function createData(
  id: string,
  projectName: string,
  creationDate: string,
  projectLead: ProjectLead,
  projectState: ProjectState,
): ProjectsListData {
  return { id, projectName, creationDate, projectLead, projectState };
}

const rows: ProjectsListData[] = [
  createData(
    '1',
    'Super Projekt',
    new Date().toDateString(),
    { id: '923776c8-11cd-42ea-9a01-26d0df861611', name: 'Piotr Tarasiński' },
    'Completed',
  ),
  createData(
    '2',
    'Super Projekt1',
    new Date().toDateString(),
    { id: '1', name: 'Piotr Tarasiński' },
    'In Development',
  ),
  createData(
    '3',
    'Super Projekt3',
    new Date().toDateString(),
    { id: '1', name: 'Piotr Tarasiński' },
    'Planning',
  ),
  createData(
    '4',
    'Super Projekt4',
    new Date().toDateString(),
    { id: '1', name: 'Piotr Tarasiński' },
    'Cancelled',
  ),
  createData(
    '5',
    'Super Projekt5',
    new Date().toDateString(),
    { id: '1', name: 'Piotr Tarasiński' },
    'In Development',
  ),
  createData(
    '6',
    'Super Projekt6',
    new Date().toDateString(),
    { id: '1', name: 'Piotr Tarasiński' },
    'In Development',
  ),
  createData(
    '7',
    'Super Projekt7',
    new Date().toDateString(),
    { id: '1', name: 'Piotr Tarasiński' },
    'In Development',
  ),
  createData(
    '8',
    'Super Projekt8',
    new Date().toDateString(),
    { id: '1', name: 'Piotr Tarasiński' },
    'Planning',
  ),
  createData(
    '9',
    'Super Projekt9',
    new Date().toDateString(),
    { id: '1', name: 'Piotr Tarasiński' },
    'Planning',
  ),
  createData(
    '10',
    'Super Projekt10',
    new Date().toDateString(),
    { id: '1', name: 'Piotr Tarasiński' },
    'Completed',
  ),
  createData(
    '11',
    'Super Projekt11',
    new Date().toDateString(),
    { id: '1', name: 'Piotr Tarasiński' },
    'Completed',
  ),
  createData(
    '12',
    'Super Projekt12',
    new Date().toDateString(),
    { id: '1', name: 'Piotr Tarasiński' },
    'In Development',
  ),
  createData(
    '13',
    'Super Projekt13',
    new Date().toDateString(),
    { id: '1', name: 'Piotr Tarasiński' },
    'In Development',
  ),
  createData(
    '14',
    'Super Projekt14',
    new Date().toDateString(),
    { id: '1', name: 'Piotr Tarasiński' },
    'Completed',
  ),
  createData(
    '15',
    'Super Projekt15',
    new Date().toDateString(),
    { id: '1', name: 'Piotr Tarasiński' },
    'Completed',
  ),
];

const getRows = (
  order: Order,
  orderBy: string,
  page: number,
  rowsPerPage: number,
  search: string,
) => {
  return rows;
};

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

  const [data, setData] = React.useState<ProjectsListData[]>([]);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<string>('projectName');
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(15);
  const [rowCount, setRowCount] = React.useState<number>(50);
  const [search, setSearch] = React.useState<string>('');

  useEffect(() => {
    console.log(order, orderBy, page, rowsPerPage, search);
    setData(getRows(order, orderBy, page, rowsPerPage, search));
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleLeaveProject = (event: React.MouseEvent<HTMLElement>, row: ProjectsListData) => {
    event.stopPropagation();
    props.handleLeaveProject(row.id, row.projectName);
  };

  const handleDeleteProject = (event: React.MouseEvent<HTMLElement>, row: ProjectsListData) => {
    event.stopPropagation();
    props.handleDeleteProject(row.id, row.projectName);
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
            rowCount={data.length}
          />
          <TableBody>
            {data.map(row => {
              return (
                <TableRow
                  hover
                  onClick={() => props.history.push(`${ROUTES.dashboard.pathname}/${row.id}`)}
                  key={row.projectName}
                  className={classes.tableRow}
                >
                  <TableCell>{row.projectName}</TableCell>
                  <TableCell>{row.creationDate}</TableCell>
                  <TableCell>
                    <Chip
                      component={Link}
                      to={`${ROUTES.profile.pathname}/${row.projectLead.id}`}
                      avatar={
                        <Avatar
                          alt={row.projectLead.name}
                          src={row.projectLead.avatar ? row.projectLead.avatar : defaultAvatar}
                        />
                      }
                      label={row.projectLead.name}
                      onClick={(event: React.MouseEvent<HTMLElement>) => event.stopPropagation()}
                    />
                  </TableCell>
                  <TableCell>{renderProjectState(classes, row.projectState)}</TableCell>
                  <TableCell align="center">
                    {row.projectLead.id === props.userId && (
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
                    {row.projectLead.id !== props.userId && (
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
        count={rowCount}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

const mapStateToProps = (state: AppState) => ({
  userId: state.user.id,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, any, Action>) => ({
  handleLeaveProject: (id: string, name: string) =>
    dispatch(StoreAction.project.handleLeaveProject(id, name)),
  handleDeleteProject: (id: string, name: string) =>
    dispatch(StoreAction.project.handleDeleteProject(id, name)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectsTable));
