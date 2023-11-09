import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const handleRole = this.reflector.get(ROLES_KEY, context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.matchRoles(handleRole, user.role);
  }

  private matchRoles(handlerRole: string, userRole: string) {
    return handlerRole === userRole;
  }
}
