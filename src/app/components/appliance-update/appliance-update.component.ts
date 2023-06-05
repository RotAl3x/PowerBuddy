import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {filter, first, Observable} from "rxjs";
import {ApplianceCategory} from "../../models/appliance-category.model";
import {ApplianceCategoryService} from "../../services/appliance-category.service";
import {ApplianceService} from "../../services/appliance.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-appliance-update',
  templateUrl: './appliance-update.component.html',
  styleUrls: ['./appliance-update.component.scss']
})
export class ApplianceUpdateComponent {
  public form: FormGroup = new FormGroup({});
  public applianceCategories$: Observable<Array<ApplianceCategory>> = new Observable<[]>();
  public id: string | null=null;

  constructor(
    public applianceCategoryService: ApplianceCategoryService,
    public applianceService: ApplianceService,
    private route: ActivatedRoute,
    private router: Router) {
    this.createForm()
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id')
      if (!this.id) {
        this.router.navigate(['/', 'appliances']);
        return;
      }
      this.applianceService.getAppliance(+this.id)
        .pipe(
          filter((r) => !!r)
        )
        .subscribe(appliance => {
          this.form.patchValue(appliance);
        });
    });
    this.applianceCategories$ = this.applianceCategoryService.getApplianceCategories();
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const appliance = {...this.form.value};
    if(this.id !==null)
    this.applianceService
      .updateAppliance(+this.id, appliance)
      .pipe(first())
      .subscribe(() => {
        alert('Appliance successfully updated!');
        this.router.navigate(['../../'], {relativeTo: this.route});
      });
  }

  private createForm() {
    this.form = new FormGroup({
      name: new FormControl<string>(''),
      consumptionWh: new FormControl<number>(1),
      count: new FormControl<number>(1),
      active: new FormControl<boolean>(false, [Validators.required]),
      applianceCategoryId: new FormControl<number | null>(null, [Validators.required])
    })
  }
}
