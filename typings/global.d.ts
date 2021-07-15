import express from 'express';
import { Payload } from '../src/auth';

declare global {
  export namespace Express {
    export interface Request {
      id: string;
    }
    export interface Response {}
    // tslint:disable-next-line: no-empty-interface
    interface User extends Payload {}
  }
}

// declare type Request = express.Request;
// declare type Response = express.Response;

// declare global {}
