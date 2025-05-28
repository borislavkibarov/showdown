import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { mapCategoryDtoToModel } from '../util/category.mapper';
import { Category } from '../models/category.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private categories: Category[] = [];
  private initialized = false;

  constructor(private dataService: DataService) {}

  async initialize(): Promise<void> {
    if (this.initialized) return;

    const dto = await firstValueFrom(this.dataService.loadCategories());
    this.categories = dto.map(mapCategoryDtoToModel);
    this.initialized = true;
  }

  getCategories(): Category[] {
    return this.categories;
  }

  getQuestionById(id: string) {
    for (const cat of this.categories) {
      const found = cat.questions.find(q => q.id === id);
      if (found) return found;
    }
    return undefined;
  }
}
