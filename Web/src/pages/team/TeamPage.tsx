import React from 'react';
import PageContainer from 'components/containers/pageContainer/PageContainer';
import useStyles from './teamPage.style';
import {
  Toolbar,
  Typography,
  InputBase,
  Tooltip,
  IconButton,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
} from '@material-ui/core';
import {
  Group,
  Search,
  AddCircle,
  Email,
  Person,
  CalendarToday,
  Games,
  Face,
  Work,
  VerifiedUser,
} from '@material-ui/icons';
import defaultAvatar from 'assets/images/utils/default_avatar.png';

function TeamPage() {
  const classes = useStyles();

  const [search, setSearch] = React.useState<string>('');

  const members = [
    {
      id: '1',
      name: 'Piotr Tarasiński',
      email: 'piotrt337@gmail.com',
      avatar: null,
      dateOfJoin: new Date(),
    },
    {
      id: '2',
      name: 'Szymon Tokarzewski',
      email: 'szymko@gmail.com',
      avatar: null,
      dateOfJoin: new Date(),
    },
  ];

  return (
    <PageContainer className={classes.mainContainer}>
      <Paper className={classes.paper}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.title}>
            <Group className={classes.headCellIcon} />
            <Typography variant="h6">Team Members</Typography>
          </div>
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
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(event.target.value)
              }
            />
          </div>
          <Tooltip title="Invite to project">
            <IconButton className={classes.addToProjectIcon} aria-label="invite to project">
              <AddCircle />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <Table aria-labelledby="tableTitle" aria-label="team members">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography className={classes.headerLabel}>
                  <Face className={classes.headCellIcon} /> Avatar
                </Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.headerLabel}>
                  <Person className={classes.headCellIcon} /> Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.headerLabel}>
                  <Email className={classes.headCellIcon} /> Email
                </Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.headerLabel}>
                  <CalendarToday className={classes.headCellIcon} /> Date Of Join
                </Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.headerLabel}>
                  <Work className={classes.headCellIcon} /> Role
                </Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.headerLabel}>
                  <VerifiedUser className={classes.headCellIcon} /> Permissions
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography className={classes.headerLabel}>
                  <Games className={classes.headCellIcon} /> Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members
              .filter(
                member =>
                  member.name.toLowerCase().includes(search.toLowerCase()) ||
                  member.email.toLowerCase().includes(search.toLowerCase()),
              )
              .map(member => {
                return (
                  <TableRow
                    hover
                    // onClick={() => props.history.push(`${ROUTES.dashboard.pathname}/${row.id}`)}
                    key={member.id}
                    className={classes.tableRow}
                  >
                    <TableCell>
                      <Avatar
                        alt={member.name}
                        src={member.avatar || defaultAvatar}
                        className={classes.avatar}
                      />
                    </TableCell>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{new Date(member.dateOfJoin).toDateString()}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Paper>
    </PageContainer>
  );
}

export default TeamPage;
