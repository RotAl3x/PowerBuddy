import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Appliance} from "../../Models/appliance.model";
import {ApplianceService} from "../../services/appliance.service";
import {ApplianceCategoryService} from "../../services/appliance-category.service";
import {combineLatest, filter} from "rxjs";
import {ApplianceCategory} from "../../Models/appliance-category.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-appliances-overview',
  templateUrl: './appliances-overview.component.html',
  styleUrls: ['./appliances-overview.component.scss']
})
export class AppliancesOverviewComponent implements OnInit, AfterViewInit {
  public dataSource = new MatTableDataSource<Appliance>();
  public appliances: Appliance[] = [];
  public appliancesCount = 0;
  columns: string[] = [
    'id',
    'name',
    'consumptionWh',
    'applianceCategory',
    'active',
    'count',
    'actions',
  ];

  sortField: string | undefined;
  sortDir: string | undefined;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private applianceService: ApplianceService, private applianceCategoryService: ApplianceCategoryService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getAppliances(0,10);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }

  getAppliances(pageSize:number, offset:number): void {
    combineLatest([
      this.applianceService.getAppliances(offset, pageSize, '',''),
      this.applianceCategoryService.getApplianceCategory(),
    ]).pipe(filter((r) => !!r[0] && !!r[1])
    ).subscribe(
      ([appliancesResult, applianceCategories]) => {
        this.matchAppliancesCategory(appliancesResult.appliances, applianceCategories);
        this.dataSource.data = appliancesResult.appliances;
        this.appliancesCount = appliancesResult.totalCount;
      }
    )
  }

  private matchAppliancesCategory(
    appliances: Appliance[],
    applianceCategories: ApplianceCategory[],
  ) {
    appliances.forEach((appliance) => {
      const applianceCategory = applianceCategories.find(
        (ac) => ac.id == appliance.applianceCategoryId
      )
      appliance.applianceCategory = applianceCategory
    })
  }

  onNavigateToDetails(row: Appliance) {
    this.router.navigate([row.id], {relativeTo: this.route})
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onPageChanged(event: PageEvent) {

  }

}
