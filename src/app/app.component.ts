import { Component } from '@angular/core';

import { PoTableColumn } from '@po-ui/ng-components';
import { AppService } from './app.service';
import { Customer } from './model/customer';

interface CustomerResponse {
  data: Customer[]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private appService:AppService) {}

  public items:Customer[] = []

  public columns:PoTableColumn[] = [
    { label: 'Codigo',property: 'code', width: '30%'},
    { label: 'Nome',property: 'name', width: '70%'}
  ];

  ngOnInit() {
    this.appService.jsAdvplObs().subscribe({
      next: payLoad => {
        const data = JSON.parse(payLoad) as CustomerResponse;
        console.log(data);
        this.items = data.data;
      }
    });
  }

}
