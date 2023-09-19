import { Injectable } from '@angular/core';
import { ProJsToAdvpl, ProJsToAdvplService } from '@totvs/protheus-lib-core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private proJsToAdvplService: ProJsToAdvplService) { }

  jsAdvplObs() {
    // Variável que enviará as informações para o Protheus
    let sendIfo: ProJsToAdvpl = {
      autoDestruct: false, // Informa se o Observable será destruído assim que tiver um retorno
      receiveId: "receiveId1", // ID que será recebido pela aplicação Angular no retorno do Protheus
      sendInfo: { // Objeto com os dados que serão enviados ao Protheus
        type: "jstoadvplPar1", // ID que será enviado ao protheus (Recebido na static function JsToAdvpl)
        content: "content" // Conteúdo enviado ao Protheus
      }
    };

    // Callback que será executado após o retorno do AdplToJs
    const observableCallback = ({protheusResponse, subscriber}: {protheusResponse: any, subscriber: any}) => {
      console.log(protheusResponse);

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
    this.proJsToAdvplService.buildObservable( observableCallback, sendIfo).subscribe({
      next: payLoad => {
        console.log(payLoad);
        console.log("buildObservable subscribe");
      }
    });

  }

}
