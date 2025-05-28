import { Component, OnInit } from '@angular/core';
import { Category } from '../../shared/models/category.model';
import { mapCategoryDtoToModel } from '../../shared/util/category.mapper';
import { GameStateService, GameState } from '../../shared/services/game-state.service';
import { DataService } from '../../shared/services/data.service';
import { CommonModule } from '@angular/common';
import { GameService } from '../../shared/services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class BoardComponent implements OnInit {

  categories: Category[] = [];
  gameState: GameState | null = null;

  constructor(
    private gameService: GameService,
    private gameStateService: GameStateService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.gameService.initialize();
    this.categories = this.gameService.getCategories();
    this.gameState = this.gameStateService.getGameState();
  }

  selectQuestion(id: string) {
    this.router.navigate(['/game/question', id]);
  }

}
