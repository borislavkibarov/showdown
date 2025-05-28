import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Question } from '../../shared/models/question.model';
import { GameStateService } from '../../shared/services/game-state.service';
import { GameService } from '../../shared/services/game.service';

@Component({
  standalone: true,
  selector: 'app-game-question',
  imports: [CommonModule, FormsModule],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  
  question: Question | null = null;

  userAnswer = '';
  stealAnswer = '';
  bonusAnswer = '';
  feedback = '';
  bonusFeedback = '';
  stealFeedback = '';

  answerMode: 'open' | 'tips' | null = null;
  lastAnswerMode: 'open' | 'tips' | null = null;

  answered = false;
  showStealIntro = false;
  isStealActive = false;
  stealSubmitted = false;

  showBonusIntro = false;
  isBonusActive = false;
  bonusSubmitted = false;

  revealCorrectAnswer = false;
  showCurrentTeam = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    private gameState: GameStateService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const q = this.gameService.getQuestionById(id);
      if (q) this.question = q;
      else this.router.navigateByUrl('/game-board');
    }
  }

  chooseAnswerMode(mode: 'open' | 'tips') {
    this.answerMode = mode;
    this.lastAnswerMode = mode;
    this.userAnswer = '';
    this.feedback = '';
    this.revealCorrectAnswer = false;
  }

  submitOpenAnswer() {
    console.log(this.stealSubmitted)
    const correct = this.userAnswer.trim().toLowerCase() === this.question?.correctAnswer.toLowerCase();
    this.answered = true;

    if (correct) {
      this.feedback = `✅ Correct! ${this.currentTeamName} 3 points.`;
      this.gameState.addPoints(this.gameState.getCurrentTeam()!, 3);

      if (this.question?.hasBonus && this.question.bonusQuestion) {
        this.feedback += '<br>⭐ Bonus question unlocked!';
        this.showBonusIntro = true;
      } else {
        this.question!.answered = true;
        this.gameState.switchTurn();
      }
    } else {
      this.showStealIntro = true;
      this.gameState.switchTurn();
      this.feedback = `❌ Incorrect. ${this.currentTeamName} may attempt to steal.`;
    }
  }

  submitTipAnswer(option: string) {
    const correct = option === this.question?.correctAnswer;
    this.answered = true;

    this.feedback = correct
      ? `✅ Correct! ${this.currentTeamName} scored 1 point.`
      : '❌ Incorrect.';

    this.revealCorrectAnswer = !correct;

    if (correct) {
      this.gameState.addPoints(this.gameState.getCurrentTeam()!, 1);

      if (this.question?.hasBonus && this.question.bonusQuestion) {
        this.feedback += '<br>⭐ Bonus question unlocked!';
        this.showBonusIntro = true;
      } else {
        this.showCurrentTeam = false;
        this.question!.answered = true;
        this.gameState.switchTurn();
      }
    } else {
        this.showCurrentTeam = false;
        if (this.question?.hasBonus && this.question.bonusQuestion) {
        this.feedback += '<br>🟡 You missed out on a bonus question!';
      }
        this.question!.answered = true;
        this.gameState.switchTurn();
    }
  }

  proceedToSteal() {
    this.showStealIntro = false;
    this.isStealActive = true;
  }

  submitSteal() {
    const correct = this.stealAnswer.trim().toLowerCase() === this.question?.correctAnswer.toLowerCase();
    this.answered = true;
    this.stealSubmitted = true;
    this.revealCorrectAnswer = !correct;

    if (correct) {
      this.stealFeedback = `✅ ${this.currentTeamName} steals and earns 2 points!`;
      this.gameState.addPoints(this.gameState.getCurrentTeam()!, 2);

      if (this.question?.hasBonus && this.question.bonusQuestion) {
        this.stealFeedback += '<br>⭐ Bonus question unlocked!';
        this.showBonusIntro = true;
      } else {
        this.showCurrentTeam = false;
        this.question!.answered = true;
      }
    } else {
        this.stealFeedback = `❌ ${this.currentTeamName} missed the steal. No points.`;
        if (this.question?.hasBonus && this.question.bonusQuestion) {
         this.stealFeedback += '<br>🟡 You missed out on a bonus question!';
        }
        this.question!.answered = true;
        this.showCurrentTeam = false;
    }
  }

  proceedToBonus() {
    this.showBonusIntro = false;
    this.isBonusActive = true;
  }

  submitBonus() {
    const correct = this.bonusAnswer.trim().toLowerCase() === this.question?.bonusQuestion?.correctAnswer.toLowerCase();

    this.bonusFeedback = correct
      ? `🟡 Correct! ${this.currentTeamName} earned 1 bonus points!`
      : '❌ Incorrect. No bonus points awarded.';

    if (correct) {
      this.gameState.addPoints(this.gameState.getCurrentTeam()!, 1);
    }

    this.bonusSubmitted = true;
    this.question!.answered = true;
    this.showCurrentTeam = false;

    if (!this.stealSubmitted) {
      this.gameState.switchTurn();
    }
  }

  get currentTeamName(): string | null {
    const teamKey = this.gameState.getCurrentTeam();
    if (!teamKey) return null;
    const team = this.gameState.getTeam(teamKey);
    return team?.name ?? null;
  }


  resetQuestionFlow() {
    this.router.navigateByUrl('/game-board');
  }
}
