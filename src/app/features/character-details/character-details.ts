import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CharacterService } from '../../core/services/character.service';
import { Character } from '../../shared/models/character.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-character-details',
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './character-details.html',
  styleUrl: './character-details.scss',
})
export class CharacterDetails implements OnInit {
  private characterService = inject(CharacterService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  character = signal<Character | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    // Captura o ID da rota
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCharacterDetails(Number(id));
    }
  }

  loadCharacterDetails(id: number): void {
    this.loading.set(true);
    this.characterService.getCharacterById(id).subscribe({
      next: (character) => {
        this.character.set(character);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar personagem:', err);
        this.error.set('Failed to load character details.');
        this.loading.set(false);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/characters']);
  }

  retry(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCharacterDetails(Number(id));
    }
  }

  getFirstEpisodes(): string[] {
    const episodes = this.character()?.episode || [];
    return episodes.slice(0, 12);
  }

  getEpisodeNumber(episodeUrl: string): string {
    return episodeUrl.split('/').pop() || '';
  }
}
