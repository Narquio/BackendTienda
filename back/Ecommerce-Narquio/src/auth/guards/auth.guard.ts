import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthGuard implements CanActivate { constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    

    const request =context.switchToHttp().getRequest();
    
    

    const authHeader =request.headers[`authorization`];
    if (!authHeader) { throw new UnauthorizedException(`No se proporcionó un token de autenticación`);}
    
    const [type, token] = authHeader.split(` `);
    if (type !== `Bearer` || !token) { throw new UnauthorizedException(`Formato de token inválido`);}

     try { const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      request.user = payload; 
    } catch (error: any) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
    
    return true
  }
}
