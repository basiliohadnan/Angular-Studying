import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from '../token.service';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarioSubject = new BehaviorSubject<Usuario>({})

  constructor(private tokenService: TokenService) { 
    if (this.tokenService.possuiToken()) this.decodificaJWT
  }

  private decodificaJWT() {
    const token = this.tokenService.retornaToken()
    const usuario = jwtDecode(token) as Usuario
    this.usuarioSubject.next(usuario)
  }

  retornaUsuario(){
    return this.usuarioSubject.asObservable()
  }

  salvaToken(token: string){
    this.tokenService.salvaToken(token)
    this.decodificaJWT()
  }
}
