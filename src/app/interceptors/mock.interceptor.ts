import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';

import * as blocos_minerados from '../mocks/GET_api_v1_blocos_minerados.json';
import * as enderecos_carteira from '../mocks/GET_api_v1_enderecos_carteira.json';
import * as enderecos_minerador from '../mocks/GET_api_v1_enderecos_minerador.json';
import * as transacoes_pendentes from '../mocks/GET_api_v1_transacoes_pendentes.json';
import * as transacoes_processadas from '../mocks/GET_api_v1_transacoes_processadas.json';

/**
 * Interceptador responsavel por simular respostas.
 */
@Injectable()
export class MockInterceptor implements HttpInterceptor {
  constructor(
  ) {
  }

  /**
   * Intercepta a requisicao afim de responde-la com dados simulados.
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  // gera um observable de uma referencia nula para simular a chamada da API
  return (
    of(null)
    .pipe(
      mergeMap(() => {
        // simula solicitacoes GET
        if( request.method === 'GET') {
          // consulta os enderecos do minerador
          if (/\/api\/v1\/enderecos\/minerador/gi.test(request.url)) {
            // retorna a resposta simulada
            return of(new HttpResponse({ status: 200, body: enderecos_minerador.default }));
          }

          // consulta os enderecos da carteira
          if (/\/api\/v1\/enderecos\/carteira/gi.test(request.url)) {
            // retorna a resposta simulada
            return of(new HttpResponse({ status: 200, body: enderecos_carteira.default }));
          }

          // consulta as transacoes pendentes
          if (/\/api\/v1\/transacoes\/pendentes/gi.test(request.url)) {
            // retorna a resposta simulada
            return of(new HttpResponse({ status: 200, body: transacoes_pendentes.default }));
          }

          // consulta as transacoes processadas
          if (/\/api\/v1\/transacoes\/processadas/gi.test(request.url)) {
            // retorna a resposta simulada
            return of(new HttpResponse({ status: 200, body: transacoes_processadas.default }));
          }

          // consulta os blocos minerados
          if (/\/api\/v1\/blocos\/minerados/gi.test(request.url)) {
            // retorna a resposta simulada
            return of(new HttpResponse({ status: 200, body: blocos_minerados.default }));
          }
        }

        // prossegue com qualquer requisicao que nao seja tratada por este interceptador
        return next.handle(request);
      }),
    )
    // causa um delay na resposta
    .pipe(materialize())
    .pipe(delay(100))
    .pipe(dematerialize())
  );
  }
}
