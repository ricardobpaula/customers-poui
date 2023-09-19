import { Component } from '@angular/core';

import { ProAppConfigService, ProJsToAdvpl, ProJsToAdvplService } from '@totvs/protheus-lib-core';

import { PoTableColumn } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private appService:AppService) {}

  public columns:PoTableColumn[] = [
    { label: 'Codigo',property: 'code', width: '30%'},
    { label: 'Nome',property: 'name', width: '70%'}
  ];

  public items:any[] = [
    { code: '0001', name: 'Computador' },
    { code: '0002', name: 'Teclado' }
  ];

  public onClick() {
    this.appService.jsAdvplObs()
  }

}
