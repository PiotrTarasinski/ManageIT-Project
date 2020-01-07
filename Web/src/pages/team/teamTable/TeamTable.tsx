import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useStyles from './teamTable.style';
import ProjectsTableToolbar from './TeamTableToolbar';
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
import SortableTableHead from 'components/sortableTableHead/SortableTableHead';
import { headCell } from 'models/types/table';

interface IDispatchProps {
  handleLeaveProject: (id: string, name: string) => void;
  handleDeleteProject: (id: string, name: string) => void;
  getProjectMembers: (
    projectId: string,
    order: orderTypes,
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

type Props = RouteComponentProps<any> & IStoreProps & IDispatchProps;

function TeamTable(props: Props) {
  const classes = useStyles();

  const [order, setOrder] = React.useState<orderTypes>(orderTypes.ASC);
  const [orderBy, setOrderBy] = React.useState<string>('name');
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(15);
  const [search, setSearch] = React.useState<string>('');

  useEffect(() => {
    const projectId = props.match.params.id;
    console.log(projectId);
    props.getProjectMembers(projectId, order, orderBy, page, rowsPerPage, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, orderBy, page, rowsPerPage, search]);

  const headCells: headCell[] = [
    { id: 'avatar', label: 'Avatar', disableSorting: true, icon: 'face' },
    { id: 'name', label: 'Name', icon: 'person' },
    { id: 'email', label: 'Email', icon: 'email' },
    { id: 'dateOfJoin', label: 'Date Of Join', icon: 'calendar_today' },
    { id: 'role', label: 'Role', disableSorting: true, icon: 'work' },
    { id: 'permissions', label: 'Permissions', icon: 'verified_user' },
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
            {/* {props.projectList &&
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
              })} */}
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
  getProjectMembers: (
    projectId: string,
    order: orderTypes,
    orderBy: string,
    page: number,
    rowsPerPage: number,
    search: string,
  ) =>
    dispatch(
      StoreAction.project.getProjectMembers(projectId, order, orderBy, page, rowsPerPage, search),
    ),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeamTable));
