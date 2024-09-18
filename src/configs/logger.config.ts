import { createLogger, format, transports, addColors } from 'winston';

addColors({
  error: 'red',
  warn: 'yellow',
  info: 'blue',
  http: 'magenta',
  success: 'green'
});

export const logger = createLogger({
  level: 'info',
  format: format.json(),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize({ all: true }),
        format.simple()
      )
    }),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'import.log' })
  ],
});
