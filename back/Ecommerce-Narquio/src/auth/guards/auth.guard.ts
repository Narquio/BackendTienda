import { CanActivate,
         ExecutionContext,
         Injectable,
         UnauthorizedException,
        
          } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthGuard implements CanActivate { constructor(private readonly jwtService: JwtService, private readonly configService:ConfigService,) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    

    const request =context.switchToHttp().getRequest();
    
    

    const authHeader =request.headers[`authorization`];
    if (!authHeader) { throw new UnauthorizedException(`No se proporcionó un token de autenticación`);}
    
    const [type, token] = authHeader.split(` `);
    if (type !== `Bearer` || !token) { throw new UnauthorizedException(`Formato de token inválido`);}
      const secret = this.configService.get<string>(`JWT`)
      const payload = this.jwtService.verify(token,{secret:secret})
      request.user = payload
      return true
    } catch (error: any) {if (error.name===`tokenExpiredError`)
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }

