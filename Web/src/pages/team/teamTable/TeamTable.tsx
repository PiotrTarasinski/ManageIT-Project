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
import { AppState, Action, UserState } from 'models/types/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Edit, Cancel, SupervisedUserCircle, AccountCircle } from '@material-ui/icons';
import defaultAvatar from 'assets/images/utils/default_avatar.png';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ROUTES } from 'models/variables/routes';
import { StoreAction } from 'store/actions';
import { orderTypes } from 'models/enums/orderTypes';
import SortableTableHead from 'components/sortableTableHead/SortableTableHead';
import { headCell } from 'models/types/table';
import { IPerson } from 'models/types/person';
import { userPermission } from 'models/enums/userPermission';
import { green, blue } from '@material-ui/core/colors';

interface IDispatchProps {
  handleRemoveMember: (
    projectId: string,
    member: IPerson,
    order: orderTypes,
    orderBy: string,
    page: number,
    rowsPerPage: number,
    search: string,
  ) => void;
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
  user: UserState;
  projectMemberList: IPerson[];
  projectMemberCount: number;
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
    props.getProjectMembers(projectId, order, orderBy, page, rowsPerPage, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, orderBy, page, rowsPerPage, search]);

  const headCells: headCell[] = [
    { id: 'avatar', label: 'Avatar', disableSorting: true, icon: 'face', align: 'center' },
    { id: 'name', label: 'Name', icon: 'person' },
    { id: 'email', label: 'Email', icon: 'email' },
    { id: 'dateOfJoin', label: 'Date Of Join', icon: 'calendar_today' },
    { id: 'role', label: 'Role', disableSorting: true, icon: 'work', align: 'center' },
    { id: 'permissions', label: 'Permissions', icon: 'verified_user', align: 'center' },
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

  const handleRemoveMember = (event: React.MouseEvent<HTMLElement>, member: IPerson) => {
    event.stopPropagation();
    const projectId = props.match.params.id;
    props.handleRemoveMember(projectId, member, order, orderBy, page, rowsPerPage, search);
  };

  const handleEditMember = (event: React.MouseEvent<HTMLElement>, member: IPerson) => {
    event.stopPropagation();
  };

  const renderPermissionChip = (member: IPerson) => {
    let icon: JSX.Element | undefined = undefined;
    let color = '';
    if (member.permissions === userPermission.ADMIN) {
      icon = <SupervisedUserCircle />;
      color = blue[500];
    }
    if (member.permissions === userPermission.USER) {
      icon = <AccountCircle />;
      color = green[700];
    }

    if (member.permissions) {
      return (
        <Chip
          label={member.permissions}
          icon={icon}
          className={classes.memberPermissionChip}
          style={{ backgroundColor: color }}
        />
      );
    }
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
            {props.projectMemberList &&
              props.projectMemberList.map(member => {
                return (
                  <TableRow
                    hover
                    onClick={() => props.history.push(`${ROUTES.profile.pathname}/${member.id}`)}
                    key={member.id}
                    className={classes.tableRow}
                  >
                    <TableCell align="center">
                      <Avatar
                        alt={member.name}
                        src={member.avatar || defaultAvatar}
                        className={classes.avatar}
                      />
                    </TableCell>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>
                      {member.dateOfJoin ? new Date(member.dateOfJoin).toDateString() : ''}
                    </TableCell>
                    <TableCell align="center">
                      <div className={classes.rolesContainer}>
                        {(member.roles || []).map(role => {
                          return (
                            <Chip
                              key={role.id}
                              style={{ background: role.color }}
                              className={classes.role}
                              label={role.name}
                            />
                          );
                        })}
                      </div>
                    </TableCell>
                    <TableCell align="center">{renderPermissionChip(member)}</TableCell>
                    <TableCell align="center">
                      {member.id !== props.user.id && (
                        <Tooltip title="Edit member">
                          <IconButton
                            aria-label="Edit member"
                            onClick={(event: React.MouseEvent<HTMLElement>) =>
                              handleEditMember(event, member)
                            }
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                      )}
                      {member.id !== props.user.id && (
                        <Tooltip title="Remove meber">
                          <IconButton
                            aria-label="Remove meber"
                            onClick={(event: React.MouseEvent<HTMLElement>) =>
                              handleRemoveMember(event, member)
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
        count={props.projectMemberCount}
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
  user: state.user,
  projectMemberList: state.project.projectMemberList,
  projectMemberCount: state.project.projectMemberCount,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, any, Action>) => ({
  handleRemoveMember: (
    projectId: string,
    member: IPerson,
    order: orderTypes,
    orderBy: string,
    page: number,
    rowsPerPage: number,
    search: string,
  ) =>
    dispatch(
      StoreAction.project.handleRemoveMember(
        projectId,
        member,
        order,
        orderBy,
        page,
        rowsPerPage,
        search,
      ),
    ),
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
