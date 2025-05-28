export class Question {
  
  constructor(
    public id: string,
    public text: string,
    public correctAnswer: string,
    public options?: string[],
    public hasBonus: boolean = false,
    public bonusQuestion?: Question,
    public answered: boolean = false
  ) {}
}
