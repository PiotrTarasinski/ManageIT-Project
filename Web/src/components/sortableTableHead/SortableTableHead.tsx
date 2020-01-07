import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { Icon } from '@material-ui/core';
import useStyles from './sortableTableHead.style';
import { headCell } from 'models/types/table';
import { orderTypes } from 'models/enums/orderTypes';

interface SortableTableHeadProps {
  onRequestSort: (property: string) => void;
  order: orderTypes;
  orderBy: string;
  headCells: headCell[];
}

// const headCells: headCell[] = [
//   { id: 'avatar', label: 'Avatar', disableSorting: true, icon: 'face' },
//   { id: 'name', label: 'name', icon: 'person' },
//   { id: 'email', label: 'email', icon: 'email' },
//   { id: 'dateOfJoin', label: 'Date Of Join', icon: 'calendar_today' },
//   { id: 'role', label: 'Role', icon: 'work' },
//   { id: 'permissions', label: 'Permissions', icon: 'verified_user' },
//   { id: 'actions', label: 'Actions', disableSorting: true, icon: 'games', align: 'center' },
// ];

function SortableTableHead(props: SortableTableHeadProps) {
  const classes = useStyles();

  const { order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler = (property: string) => () => {
    onRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            sortDirection={!headCell.disableSorting && orderBy === headCell.id ? order : false}
            align={headCell.align ? headCell.align : 'inherit'}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={!headCell.disableSorting ? createSortHandler(headCell.id) : undefined}
              hideSortIcon={headCell.disableSorting ? true : false}
            >
              {headCell.icon ? <Icon className={classes.headCellIcon}>{headCell.icon}</Icon> : null}
              {headCell.label}
              {!headCell.disableSorting && orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default SortableTableHead;
