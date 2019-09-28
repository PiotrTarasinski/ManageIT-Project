import AppConfig from '../typings/AppConfig';

const pkg = process.env.NODE_ENV === 'production' ? require('../package.json') : require('../../package.json');

const app: AppConfig = {

  displayName: 'NotesHub',
  version: pkg.version,

  salt: '0DxCKmFj6EgdR5XklkvThu5RAKvjvpFy',

  api: {
    timestampValidTimeInMinutes: 5
  },

  passwordPolicy: {
    length: 8,
    specialCharactersRegExp: /[£!@#\$%\^&\*\(\)_\+§\-=\[\]\{\};':",\.\/<>\?`~]/
  },


  defaultRoutePermissions: {
    notes: {
      view: true,
      create: true,
      edit: true,
      delete: true
    }
  }
};

export default app;
