export type Order = 'asc' | 'desc';

export interface headCell {
  id: string;
  label: string;
  disableSorting?: boolean;
  icon?: string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
}
