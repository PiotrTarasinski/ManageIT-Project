import React from 'react';
import { Icon, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import useStyles from './sortableTableHead.style';
import { headCell } from 'models/types/table';
import { orderTypes } from 'models/enums/orderTypes';

interface SortableTableHeadProps {
  onRequestSort: (property: string) => void;
  order: orderTypes;
  orderBy: string;
  headCells: headCell[];
  withCheckBox?: boolean;
  isIndeterminate?: boolean;
  isChecked?: boolean;
  onSelectAllClick?: any;
}

function SortableTableHead(props: SortableTableHeadProps) {
  const classes = useStyles();

  const {
    order,
    orderBy,
    onRequestSort,
    headCells,
    withCheckBox,
    isIndeterminate,
    isChecked,
    onSelectAllClick,
  } = props;
  const createSortHandler = (property: string) => () => {
    onRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow>
        {withCheckBox && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={isIndeterminate}
              checked={isChecked}
              onChange={onSelectAllClick}
            />
          </TableCell>
        )}
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
