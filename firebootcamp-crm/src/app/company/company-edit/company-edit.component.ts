import { Component, OnInit } from '@angular/core';
import { Company } from '../company';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../company.service';

@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  company = {} as Company;
  companyId: any; // THIS IS BAD
  isNewCompany: boolean;
  companyForm: FormGroup

  constructor(private router:Router, private activatedRoute: ActivatedRoute,
  private companyService: CompanyService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.companyId = this.activatedRoute.snapshot.params['id'];
    this.isNewCompany = this.companyId === 'new';

    this.buildForm();


    if (!this.isNewCompany) {
      this.getCompany();
    }

    this.companyForm.get('checkPhone').valueChanges
    .subscribe(value => {
      if(value){
        this.companyForm.get('phone').setValidators(Validators.required)
      }else{
        this.companyForm.get('phone').clearValidators();
      }
      this.companyForm.get('phone').updateValueAndValidity();
    });
  }

  buildForm(){
    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: [''],
      phone: [''],
      checkPhone: []
    });
  }

  saveCompany(): void {
    if (this.isNewCompany) {
      this.companyService.addCompany(this.companyForm.value)
        .subscribe(() => this.router.navigateByUrl('/company/list'));
    } else {
      const newCompany = {...this.companyForm.value, id: this.companyId };

      this.companyService.updateCompany(newCompany)
        .subscribe(() => this.router.navigateByUrl('/company/list'));
    }
  }

  getCompany(): void {
    this.companyService.getCompany(this.companyId)
      .subscribe(company => {
        this.companyForm.patchValue(company);
      });
  }



}
