import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers.authorization;

    if (!accessToken) {
      throw new UnauthorizedException();
    }
    if (accessToken === 'me') {
      return true;
    } else {
      throw new ForbiddenException();
    }
  }
}
