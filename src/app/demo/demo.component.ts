import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Category } from '../shared/models/category.model';
import { DemoGameService } from '../shared/services/demo-game.service';

@Component({
  standalone: true,
  selector: 'app-demo',
  imports: [CommonModule, RouterLink],
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private demoGameService: DemoGameService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.demoGameService.initializeDemo();
    this.categories = this.demoGameService.getCategories();
  }

  selectQuestion(id: string) {
    this.router.navigate(['/demo/question', id]);
  }
}
