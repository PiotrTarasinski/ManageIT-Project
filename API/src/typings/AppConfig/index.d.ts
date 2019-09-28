import { RoutePermissions } from './RoutePermissions';

type AppConfig = {
  displayName: string;
  version: string;

  salt: string;

  api: {
    timestampValidTimeInMinutes: number;
  };

  passwordPolicy: {
    length: number,
    specialCharactersRegExp: RegExp
  };

  defaultRoutePermissions: RoutePermissions;
};

export type DateRange = 'td' | 'tw' | 'lw' | 'tm' | 'lm' | 'tq' | 'lq' | 'ty' | 'ly';

export default AppConfig;
