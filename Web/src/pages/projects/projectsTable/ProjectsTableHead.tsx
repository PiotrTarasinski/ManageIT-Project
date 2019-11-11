import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { Icon } from '@material-ui/core';
import useStyles from './projectsTable.style';
import { Order, headCell } from 'models/types/table';

interface ProjectsTableHeadProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (property: string) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const headCells: headCell[] = [
  { id: 'projectName', label: 'Project Name', icon: 'bookmark' },
  { id: 'creationDate', label: 'Creation Date', icon: 'calendar_today' },
  { id: 'projectLead', label: 'Project Lead', icon: 'person' },
  { id: 'projectState', label: 'Project State', icon: 'timeline' },
  { id: 'actions', label: 'Actions', disableSorting: true, icon: 'games', align: 'center' },
];

function ProjectsTableHead(props: ProjectsTableHeadProps) {
  const { classes, order, orderBy, onRequestSort } = props;
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

export default ProjectsTableHead;
