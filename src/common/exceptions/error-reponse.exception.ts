import express from 'express';

export class ErrorResponseException {
  msg: string = '';
  status_code?: number;
  error_code: any;

  private res: any;
  /**
   *
   */
  constructor(msg: string = '', status_code: number = null, error_code: any = null, res: any) {
    // super();
    this.msg = msg;
    this.status_code = status_code;
    this.error_code = error_code;
    this.res = res;
  }

  send() {
    if (this.status_code === null) {
      return this.res.status(400).send({
        msg: this.msg,
        error_code: this.error_code,
      });
    } else {
      return this.res.status(this.status_code).send({
        msg: this.msg,
        error_code: this.error_code,
      });
    }
  }
}
