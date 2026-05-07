import { CanActivate, ExecutionContext, ForbiddenException, Injectable, } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../../customDecorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request =context.switchToHttp().getRequest();
    const userRole = request.user.role

    const routeRole= this.reflector.getAllAndOverride<string>(`Role`,
    [context.getHandler(),
      context.getClass(),
    ]);
   if (routeRole!== userRole){throw new ForbiddenException}(`No tiene permiso para acceder a esta ruta`)
    return true;
  }
}
