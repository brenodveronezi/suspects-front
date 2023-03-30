import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';
import { API_CONFIG } from 'src/app/config/api.config';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  readonly API_CONFIG = API_CONFIG.baseUrl;

  ELEMENT_DATA: Person[] = []

  displayedColumns: string[] = ['image','firstname', 'lastname', 'idade', 'cidade', 'symbol'];
  dataSource = new MatTableDataSource<Person>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private personService: PersonService
  ) {  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.personService.findAll().subscribe({
      next: response => { this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Person>(response);
      this.dataSource.paginator = this.paginator;
      console.log(response);
      }, error: error => {
        console.log(error);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
