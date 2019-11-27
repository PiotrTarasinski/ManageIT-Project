import { RouteComponentProps } from 'react-router';

export interface IRoute {
  pathname: string;
  params: string[];
  component: React.ComponentType<RouteComponentProps> | React.ComponentType<any>;
  permission: boolean;
  sidebarVisible: boolean;
}

export interface IRouteObj {
  [key: string]: IRoute;
}
