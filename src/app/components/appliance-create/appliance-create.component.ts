import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, Observable } from 'rxjs';
import { ApplianceCategory } from 'src/app/models/appliance-category.model';
import { Appliance } from 'src/app/models/appliance.model';
import { ApplianceCategoryService } from 'src/app/services/appliance-category.service';
import { ApplianceService } from 'src/app/services/appliance.service';

@Component({
  selector: 'app-appliance-create',
  templateUrl: './appliance-create.component.html',
  styleUrls: ['./appliance-create.component.scss']
})
export class ApplianceCreateComponent implements OnInit{
  public form: FormGroup = new FormGroup({});
  public applianceCategories$: Observable<Array<ApplianceCategory>> = new Observable<[]>();

  constructor(
    public applianceCategoryService: ApplianceCategoryService,
    public applianceService: ApplianceService,
    private route: ActivatedRoute,
    private router: Router)
  {
    this.createForm()
  }

  ngOnInit(): void {
    this.applianceCategories$ = this.applianceCategoryService.getApplianceCategories();
  }

  onSubmit(): void {
     if (this.form.invalid) return;

     const appliance: Appliance = { ...this.form.value };
     this.applianceService
     .addAppliance(appliance)
     .pipe(first())
     .subscribe(() => {
       alert('Appliance successfully created!');
       this.router.navigate(['../'], { relativeTo: this.route });
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
