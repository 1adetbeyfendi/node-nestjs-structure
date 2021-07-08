import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  public getRequest(context: ExecutionContext): Request {
    if (context.getType<GqlContextType>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context).getContext();
      // console.log('jwtauthguard', ctx.req);
      /*
      jwtauthguard {
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwidXNlcklkIjo4LCJyb2xlcyI6WyJhdXRoZW50aWNhdGVkIl0sInVzZXJuYW1lIjoic2tlc2tpbjE5OTQiLCJhY2NJZCI6MzA0MzE0MDcsImlhdCI6MTYyNTczMDM4NywiZXhwIjoxNjI4MzIyMzg3fQ.vkkkrNTCDd3AvteC0kyZaGba7vvrunnkOk8TIgYKKL0'
  }
}
      */
      return <Request>ctx.req;
    }

    const log = context.switchToHttp().getRequest<Request>();
    // console.log('httpreq', log);
    return log;
  }
}
