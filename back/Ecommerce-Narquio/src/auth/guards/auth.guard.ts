import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    

    const request =context.switchToHttp().getRequest();


    const authHeader =request.headers[`authorization`];
    console.log(authHeader)
    if(! authHeader) return false

    const auth= authHeader.split(` `)[1];
    const[email, password] = auth.split(`:`)
    if(! email|| password) return false;
    return true;
  }
}
