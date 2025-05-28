import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoGameService } from '../../shared/services/demo-game.service';
import { Question } from '../../shared/models/question.model';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-demo-question',
  imports: [CommonModule, FormsModule],
  templateUrl: './demo-question.component.html',
  styleUrls: ['./demo-question.component.css']
})
export class DemoQuestionComponent implements OnInit {
  
  question: Question | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private game: DemoGameService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const q = this.game.getQuestionById(id);
      if (q) {
        this.question = q;
      } else {
        this.router.navigate(['/demo']);
      }
    }
  }

  answerMode: 'open' | 'tips' | null = null;
  lastAnswerMode: 'open' | 'tips' | null = null;
  userAnswer = '';
  stealAnswer = '';
  bonusAnswer = '';
  feedback = '';
  bonusFeedback = '';
  stealFeedback = '';
  answered = false;
  isStealActive = false;
  isBonusActive = false;
  revealCorrectAnswer = false;
  showStealIntro = false;
  stealSubmitted = false;
  showBonusIntro = false;
  bonusSubmitted = false;

  chooseAnswerMode(mode: 'open' | 'tips') {
    this.answerMode = mode;
    this.lastAnswerMode = mode;
    this.answered = false;
    this.feedback = '';
    this.userAnswer = '';
    this.revealCorrectAnswer = false;
  }

  submitOpenAnswer() {
    this.answered = true;
    const correct = this.userAnswer.trim().toLowerCase() === this.question?.correctAnswer.toLowerCase();

    this.feedback = correct
      ? '✅ Correct! You scored 3 points.'
      : '❌ Incorrect. Team B may attempt to steal.';

    if (correct) {
      this.feedback = '✅ Correct! You scored 3 points.';
      if (this.question?.hasBonus && this.question.bonusQuestion) {
        this.feedback += '<br>⭐ Bonus question unlocked!';
        this.showBonusIntro = true;
      } else {
        this.question!.answered = true;
      }
    } else {
      this.showStealIntro = true;
    }
  }

  submitTipAnswer(option: string) {
    this.answered = true;
    const correct = option === this.question?.correctAnswer;

    this.feedback = correct
      ? '✅ Correct! You scored 1 point.'
      : '❌ Incorrect.';

    this.revealCorrectAnswer = !correct;

    if (this.question?.hasBonus && this.question.bonusQuestion) {
      if (correct) {
        this.feedback += '<br>⭐ Bonus question unlocked!';
        this.showBonusIntro = true;
      } else {
        this.feedback += '<br>🟡 You miseed out on a bonus question!';
      }
    }

    this.question!.answered = true;
  }

  submitSteal() {
    const correct = this.stealAnswer.trim().toLowerCase() === this.question?.correctAnswer.toLowerCase();

    this.stealFeedback = correct
      ? '✅ Team B steals and earns 2 points!'
      : '❌ Team B missed the steal. No points.';

    if (this.question?.hasBonus && this.question.bonusQuestion) {
      if (correct) {
        this.stealFeedback += '<br>⭐ Bonus question unlocked!';
        this.showBonusIntro = true;
      } else {
        this.stealFeedback += '<br>🟡 You miseed out on a bonus question!';
      }
    }

    this.question!.answered = true;
    this.answered = true;
    this.stealSubmitted = true;
    this.revealCorrectAnswer = !correct;
  }

  submitBonus() {
    const correct = this.bonusAnswer.trim().toLowerCase() === this.question?.bonusQuestion?.correctAnswer.toLowerCase();
    this.bonusFeedback = correct
      ? '🟡 Correct! You earned 2 bonus points!'
      : '❌ Incorrect. No bonus points awarded.';
    this.question!.answered = true;
    this.bonusSubmitted = true;
  }

  proceedToSteal() {
    this.showStealIntro = false;
    this.isStealActive = true;
  }

  proceedToBonus() {
    this.showBonusIntro = false;
    this.isBonusActive = true;
  }

  resetAnswerFlow() {
    this.answerMode = null;
    this.lastAnswerMode = null;
    this.userAnswer = '';
    this.stealAnswer = '';
    this.feedback = '';
    this.bonusAnswer = '';
    this.bonusFeedback = '';
    this.answered = false;
    this.isBonusActive = false;
    this.isStealActive = false;
    this.revealCorrectAnswer = false;
    this.stealSubmitted = false;
    this.showBonusIntro = false;
    this.bonusSubmitted = false;
    this.router.navigateByUrl('/demo');
  }
}
