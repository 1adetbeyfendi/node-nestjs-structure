import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';

// export class MyLogger implements LoggerService {
export class MyLogger implements LoggerService {
  private context?: string = '';
  // private files: winston.transports.FileTransportInstance;
  // private console: winston.transports.ConsoleTransportInstance;
  logger: winston.Logger;

  /**
   *
   */
  constructor(context?: string, isTimestampEnabled?: boolean) {
    if (context) {
      this.context = context;
    }
    // super();
    //   this.logger
    // .clear()          // Remove all transports
    // .add(console)     // Add console transport
    // .add(files)       // Add file transport
    // .remove(console); // Remove console transport

    // this.logger = winston.createLogger({
    //   transports: [
    //     new winston.transports.Console(),
    //     new winston.transports.File({ filename: 'combined.log' })
    //   ]
    // });
    this.logger = winston.createLogger({
      // format: winston.format.json(),
      transports: [
        new winston.transports.File({
          filename: 'logs/combined.log',
          level: 'info',
        }),
        new winston.transports.File({
          filename: 'logs/errors.log',
          level: 'error',
        }),
      ],
    });
    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(
        new winston.transports.Console({
          // format: winston.format.simple(),
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
          level: 'debug',
        }),
      );
      this.logger.add(
        new winston.transports.File({
          // format: winston.format.simple(),
          filename: 'logs/debug.log',
          level: 'debug',
        }),
      );
    }

    // this.files = new winston.transports.File({ filename: 'combined.log' });
    // this.console = new winston.transports.Console();
  }
  log(message: any, context?: string) {
    // this.
    // super.error.apply(this, arguments);

    // write file
    // throw new Error('Method not implemented.');
    // TODO: toString
    this.logger.log('info', `${this.context} - ${message}`);
    // if (context) {

    // } else {
    //   this.logger.log('info', `${message}`);
    // }
  }
  error(message: any, trace?: string) {
    // send telegram
    this.logger.log(
      'error',
      `${this.context} - ${trace ? trace : ''} -  ${message}`,
    );
    // if (context) {
    // } else {
    //   this.logger.log('error', `${message}`);
    // }
    // throw new Error('Method not implemented.');
  }
  warn(message: any) {
    // uyarı
    this.logger.log('warn', `${this.context} - ${message}`);

    // throw new Error('Method not implemented.');
  }
  debug(message: any) {
    // process env dev mode
    this.logger.log('debug', `${this.context} - ${message}`);
  }
  verbose?(message: any) {
    this.logger.log('verbose', `${this.context} - ${message}`);
  }
}
