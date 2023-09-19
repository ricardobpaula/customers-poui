import { Injectable } from '@angular/core';
import { ProJsToAdvpl, ProJsToAdvplService } from '@totvs/protheus-lib-core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private proJsToAdvplService: ProJsToAdvplService) { }

  jsAdvplObs():Observable<any> {
    // Variável que enviará as informações para o Protheus
    let sendIfo: ProJsToAdvpl = {
      autoDestruct: false, // Informa se o Observable será destruído assim que tiver um retorno
      receiveId: "receiveGetCustomers", // ID que será recebido pela aplicação Angular no retorno do Protheus
      sendInfo: { // Objeto com os dados que serão enviados ao Protheus
        type: "sendGetCustomers", // ID que será enviado ao protheus (Recebido na static function JsToAdvpl)
        content: "" // Conteúdo enviado ao Protheus
      }
    };

    // Callback que será executado após o retorno do AdplToJs
    const observableCallback = ({protheusResponse, subscriber}: {protheusResponse: any, subscriber: any}) => {
      let isOk = (protheusResponse.length > 0);

      if (!isOk) {
        subscriber.error({
          status: 400,
          description: `Error`
        });
      } else {
        subscriber.next( protheusResponse ); // Dispara e evento do observable
      }
      subscriber.complete();
    };

    // Realiza a inscrição no Observable, enviando o callback e as informações enviadas ao Protheus)
    return this.proJsToAdvplService.buildObservable( observableCallback, sendIfo)

  }

}
