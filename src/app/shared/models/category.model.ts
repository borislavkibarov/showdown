import { Question } from './question.model';

export class Category {
  constructor(
    public id: string,
    public name: string,
    public questions: Question[] = []
  ) {}
}
