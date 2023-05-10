import { Component } from '@angular/core';

@Component({
  selector: 'app-appliances-overview',
  templateUrl: './appliances-overview.component.html',
  styleUrls: ['./appliances-overview.component.scss']
})
export class AppliancesOverviewComponent {
  public dataSource:Array<string>=[];
  columns: string[] = [
    'id',
    'name',
    'consumptionWh',
    'applianceCategory',
    'runningHoursPerDay',
    'active',
    'count',
    'actions',
  ];

}
