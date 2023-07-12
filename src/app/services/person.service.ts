import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../models/person';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Upload } from '../models/upload';
import { imageUrl } from '../models/imageUrl';
import { Filter } from '../models/filter';

const uploadHeaders = { "Content-Type": "multipart/form-data"};

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  create(person: Person): Observable<Person> {
    return this.http.post<Person>(`${API_CONFIG.baseUrl}/person`, person);
  } 

  update(person: Person): Observable<Person> {
    return this.http.put<Person>(`${API_CONFIG.baseUrl}/person/${person.id}`, person)
  }

  findAll(): Observable<Person[]> {
    return this.http.get<Person[]>(`${API_CONFIG.baseUrl}/person`);
  }

  findById(id: any): Observable<Person> {
    return this.http.get<Person>(`${API_CONFIG.baseUrl}/person/${id}`);
  }

  findByFilter(firstName: any, lastName: any, startAge: any, endAge: any): Observable<Person> {
    return this.http.get<Person>(`${API_CONFIG.baseUrl}/person/search?firstName=${firstName}&lastName=${lastName}&startAge=${startAge}&endAge=${endAge}`);
  }
}
