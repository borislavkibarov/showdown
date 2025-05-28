import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-team-setup',
  imports: [CommonModule, FormsModule],
  templateUrl: './team-setup.component.html',
  styleUrls: ['./team-setup.component.css']
})
export class TeamSetupComponent {
  teamAName = '';
  teamBName = '';
  firstTeam = 'A';

  constructor(private router: Router) {}

  startGame() {
    const teamA = this.teamAName.trim() || 'Team A';
    const teamB = this.teamBName.trim() || 'Team B';

    const gameState = {
      teamA: { name: teamA, score: 0 },
      teamB: { name: teamB, score: 0 },
      currentTeam: this.firstTeam === 'A' ? 'A' : 'B'
    };

    localStorage.setItem('gameState', JSON.stringify(gameState));

    this.router.navigateByUrl('/game-board');
  }
}
