import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryDto } from '../models/category.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private readonly demoDataUrl = 'https://raw.githubusercontent.com/borislavkibarov/showdown/refs/heads/main/src/assets/demo-questions.json';
  private readonly dataUrl = 'https://raw.githubusercontent.com/borislavkibarov/showdown/refs/heads/main/src/assets/questions.json';

  constructor(private http: HttpClient) {}

  loadDemoCategories(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(this.demoDataUrl);
  }

  loadCategories(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(this.dataUrl);
  }
}
