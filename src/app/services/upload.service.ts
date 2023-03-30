import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Upload } from '../models/upload';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  create(upload: Upload): Observable<Upload> {
    return this.http.post<Upload>(`${API_CONFIG.baseUrl}/upload`, upload);
  }

  update(upload: Upload, id: string): Observable<Upload> {
    return this.http.put<Upload>(`${API_CONFIG.baseUrl}/upload/${id}`, upload)
  }

  findById(id: any): Observable<Upload> {
    return this.http.get<Upload>(`${API_CONFIG.baseUrl}/upload/${id}`);
  } 
}
