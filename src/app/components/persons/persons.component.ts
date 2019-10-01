import { Component, OnInit } from '@angular/core';
import { faDownload, faUser } from '@fortawesome/free-solid-svg-icons';
import { IPerson } from '../../models/person.model';
import { APIService } from '../../services/api/api.service';
import { parse } from 'json2csv';
import { DownloadService } from '../../services/download/download.service';


// @ts-ignore
const language = require('./translation.json');

@Component({
  selector: 'heritage-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {

  public persons: IPerson[];
  public faUser = faUser;
  public faDownload = faDownload;
  public dtOptions: DataTables.Settings = {};

  constructor(private apiService: APIService, private downloadService: DownloadService) {
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      autoWidth: true,
      responsive: true,
      language,
      columns: this.getColumns(),
      ajax: this.getAjax(),
    };
  }

  private getAjax() {
    return (ajaxDataRequest: DataTables.AjaxDataRequest, callback) =>
      this.apiService
        .post<DataTables.AjaxData>('person/all', ajaxDataRequest)
        .subscribe((persons: DataTables.AjaxData) => {
          this.persons = persons.data;
          callback({
            recordsTotal: persons.recordsTotal,
            recordsFiltered: persons.recordsFiltered,
            data: []
          });
        });
  }

  private getColumns(): DataTables.ColumnSettings[] {
    return [
      {data: '_key'},
      {data: 'givenName'},
      {data: 'surName'},
      {data: 'birthName'},
      {data: 'nickName', visible: false},
      {data: 'sex', visible: false},
      {data: 'birthDate'},
      {data: 'birthPlace', visible: false},
      {data: 'dead', visible: false},
      {data: 'deathDate'},
      {data: 'deathPlace', visible: false},
      {data: 'lastUpdated', visible: false},
    ];
  }

  public getCurrentPersonsCSV() {
    const fields = this.getColumns().map((column: DataTables.ColumnSettings) => column.data);
    const csv = parse(this.persons, { fields, delimiter: ';' });
    this.downloadService.download( 'persons.csv', csv);
  }

  public getAllPersonsCSV() {
    const fields = this.getColumns().map((column: DataTables.ColumnSettings) => column.data);
    this.apiService
      .fetch<IPerson[]>('person')
      .subscribe((persons: IPerson[]) => {
        const csv = parse(persons, { fields, delimiter: ';' });
        this.downloadService.download( 'persons.csv', csv);
      });
  }

}
