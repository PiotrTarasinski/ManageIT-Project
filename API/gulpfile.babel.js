import gulp from 'gulp';
import rename from 'gulp-rename';
import tsc from 'gulp-typescript';
import gulpLoadPlugins from 'gulp-load-plugins';
import path from 'path';
import del from 'del';
import runSequence from 'run-sequence';

const tsProject = tsc.createProject('./tsconfig.json');
const plugins = gulpLoadPlugins();

const paths = {
  ts: ['./src/**/*.ts', '!dist/**', '!node_modules/**', '!coverage/**'],
  nonJs: ['./package.json', './.gitignore', './.env'],
  tests: ['./tests/**/*.spec.ts']
};

// Clean up dist and coverage directory
gulp.task('clean', () =>
  del.sync(['dist/**', 'dist/.*', 'coverage/**', '!dist', '!coverage'])
);

// Copy non-js files to dist
gulp.task('copy', () =>
  gulp.src(paths.nonJs)
    .pipe(gulp.dest('dist'))
);

// Copy migrations files to dist
gulp.task('copy-migrations', () =>
  Promise.all([
    gulp.src(['./.sequelizerc.prod'])
      .pipe(rename('.sequelizerc'))
      .pipe(gulp.dest('dist')),
    gulp.src(['./src/server/database/migrations/**'])
      .pipe(gulp.dest('dist/server/database/migrations/')),
    gulp.src(['./src/config/sequelize.js'])
      .pipe(gulp.dest('dist/config/')),
    gulp.src(['./src/server/database/seeders/**'])
      .pipe(gulp.dest('dist/server/database/seeders/'))
  ])
);

// Copy mail templates to dist
gulp.task('copy-mail-templates', () =>
  Promise.all([
    gulp.src(['./src/server/services/mailer/emails/**'])
      .pipe(gulp.dest('dist/server/services/mailer/emails/'))
  ])
);

gulp.task('compile', ['copy', 'copy-migrations', 'copy-mail-templates'], () => {
  const tsResult = gulp.src(paths.ts)
    .pipe(plugins.sourcemaps.init())
    .pipe(tsProject());

  return tsResult.js
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

// Start server with restart on file changes
gulp.task('nodemon', ['copy', 'copy-migrations', 'copy-mail-templates', 'compile'], () => {

  const config = {
    script: path.join('dist', 'index.js'),
    ext: 'ts',
    ignore: ['node_modules/**/*.js', 'dist/**/*'],
    tasks: ['copy', 'copy-migrations', 'copy-mail-templates', 'compile'],
    nodeArgs: ['--inspect-brk']
  };

  return plugins.nodemon(config);
});

// gulp serve for development
gulp.task('serve', ['clean'], () => runSequence('nodemon'));

// default task: clean dist, compile js files and copy non-js files.
gulp.task('default', ['clean'], () => {
  runSequence(
    ['copy', 'copy-migrations', 'copy-mail-templates', 'compile']
  );
});
