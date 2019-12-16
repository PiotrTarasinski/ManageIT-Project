export interface INotification {
  text: string;
  variant?: 'default' | 'error' | 'success' | 'warning' | 'info';
  key?: string;
}
