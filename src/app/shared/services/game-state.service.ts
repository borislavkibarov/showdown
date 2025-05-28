import { Injectable } from '@angular/core';

export interface Team {
  name: string;
  score: number;
}

export interface GameState {
  teamA: Team;
  teamB: Team;
  currentTeam: 'A' | 'B';
}

@Injectable({ providedIn: 'root' })
export class GameStateService {
  
  private state: GameState | null = null;

  constructor() {
    const saved = localStorage.getItem('gameState');
    if (saved) {
      this.state = JSON.parse(saved);
    }
  }

  getGameState(): GameState | null {
    return this.state;
  }

  getTeam(team: 'A' | 'B'): Team | null {
    return this.state ? this.state[`team${team}` as 'teamA' | 'teamB'] : null;
  }

  getCurrentTeam(): 'A' | 'B' | null {
    return this.state?.currentTeam ?? null;
  }

  addPoints(team: 'A' | 'B', points: number) {
    if (!this.state) return;
    const key = `team${team}` as 'teamA' | 'teamB';
    this.state[key].score += points;
    this.save();
  }

  switchTurn() {
    if (!this.state) return;
    this.state.currentTeam = this.state.currentTeam === 'A' ? 'B' : 'A';
    this.save();
  }

  reset() {
    this.state = null;
    localStorage.removeItem('gameState');
  }

  private save() {
    if (this.state) {
      localStorage.setItem('gameState', JSON.stringify(this.state));
    }
  }
}
