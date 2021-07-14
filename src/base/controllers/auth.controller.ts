import { Controller, Get, Post, UseGuards, Req, Res, Body, HttpService, HttpStatus } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import axios, { AxiosRequestConfig } from 'axios';
import type { Request, Response } from 'express';
import { loginDTO } from 'src/base/dto/login.dto';

import { AuthService, LocalLoginGuard, Payload, AuthenticatedGuard, LocalAuthGuard, JwtAuthGuard, JwtPayload } from '../../auth';
import { ReqUser } from '../../common';

/**
 * https://docs.nestjs.com/techniques/authentication
 */
@Controller()
export class AuthController {
  constructor(private auth: AuthService, private httpService: HttpService) {}

  /**
   * See test/e2e/local-auth.spec.ts
   * need username, password in body
   * skip guard to @Public when using global guard
   */
  // @Post('login')
  // @UseGuards(LocalLoginGuard)
  // public login(@Req() req: Request): Payload | undefined {
  //   return req.user;
  // }

  // @Get('logout')
  // public logout(@Req() req: Request, @Res() res: Response): void {
  //   req.logout();
  //   res.redirect('/');
  // }

  // @Get('check')
  // @UseGuards(AuthenticatedGuard)
  // public check(@ReqUser() user: Payload): Payload | undefined {
  //   return user;
  // }

  /**
   * See test/e2e/jwt-auth.spec.ts
   */
  // @UseGuards(LocalAuthGuard)
  // @Post('jwt/login')
  // public jwtLogin(@Req() req: Request): { access_token: string } {
  //   return this.auth.signJwt(<Payload>req.user);
  // }
  @Post('jwt/login')
  public jwtLogin(@Body() loginData: loginDTO) {
    try {
      // const loginData = {};

      const data = JSON.stringify(loginData);
      console.log(data);

      const config: AxiosRequestConfig = {
        // method: 'post',
        // url: 'http://localhost:1337/auth/local',
        headers: {
          'Content-Type': 'application/json',
        },
        // data: data,
      };
      // axios(config)

      // this.httpService.post('http://localhost:1337/auth/local', data, config).toPromise()
      return this.httpService
        .post('https://localhost:1339/auth/local', data, config)
        .toPromise()
        .then((x) => {
          // console.log(x);
          return x.data;
        });
      // if (response.status === 200) {
      //   return response.data;
      // } else {
      //   res.status(HttpStatus.BAD_REQUEST);
      //   return { status: false, msg: response.data };

      //   // return { status: false, msg: response.data };
      // }
      // axios(config)
      //   .then(function (response) {
      //     console.log(JSON.stringify(response.data));
      //     if (response.status === 200) {
      //       resolve(response.data);
      //     } else {
      //       reject(response.data);
      //     }
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });

      // console.log(loginData);

      // return await axios.post('http://localhost:1337/auth/local', JSON.stringify(loginData));
    } catch (error) {
      return error;
    }
    // return this.auth.signJwt(<Payload>req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('jwt/check')
  public jwtCheck(@ReqUser() user: JwtPayload) {
    console.log(user);

    return user;
  }
}
