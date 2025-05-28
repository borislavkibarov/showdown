import { CategoryDto, QuestionDto } from '../models/category.dto';
import { Category } from '../models/category.model';
import { Question } from '../models/question.model';

export function mapCategoryDtoToModel(dto: CategoryDto): Category {
  return new Category(
    dto.id,
    dto.name,
    dto.questions.map(mapQuestionDtoToModel)
  );
}

function mapQuestionDtoToModel(dto: QuestionDto): Question {
  return new Question(
    dto.id,
    dto.text,
    dto.correctAnswer,
    dto.options,
    dto.hasBonus,
    dto.bonusQuestion
      ? new Question(
          dto.bonusQuestion.id,
          dto.bonusQuestion.text,
          dto.bonusQuestion.correctAnswer
        )
      : undefined
  );
}
