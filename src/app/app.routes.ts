import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RulesComponent } from './rules/rules.component';
import { DemoComponent } from './demo/demo.component';
import { TeamSetupComponent } from './game/team-setup/team-setup.component';
import { BoardComponent } from './game/board/board.component';
import { DemoQuestionComponent } from './demo/demo-question/demo-question.component';
import { QuestionComponent } from './game/question/question.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'demo', component: DemoComponent },
  { path: 'start', component: TeamSetupComponent },
  { path: 'game-board', component: BoardComponent },
  { path: 'demo/question/:id', component: DemoQuestionComponent },
  { path: 'game/question/:id', component: QuestionComponent },
  { path: '**', redirectTo: '' }
];
