import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Company } from '../company';
import { Output } from '@angular/core';

@Component({
  selector: 'fbc-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.scss']
})
export class CompanyTableComponent implements OnInit {

  @Input() companies: Company[]
  @Output() onDeleteCompany = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

}
