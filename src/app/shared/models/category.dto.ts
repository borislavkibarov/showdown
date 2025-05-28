export interface BonusQuestionDto {
  id: string;
  text: string;
  correctAnswer: string;
}

export interface QuestionDto {
  id: string;
  text: string;
  correctAnswer: string;
  options?: string[];
  hasBonus?: boolean;
  bonusQuestion?: BonusQuestionDto;
}

export interface CategoryDto {
  id: string;
  name: string;
  questions: QuestionDto[];
}
