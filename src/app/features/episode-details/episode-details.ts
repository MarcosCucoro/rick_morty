import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Episode } from '../../shared/models/episode.model';
import { EpisodeService } from '../../core/services/episode.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-episode-details',
  imports: [CommonModule],
  templateUrl: './episode-details.html',
  styleUrl: './episode-details.scss',
})
export class EpisodeDetails {
  private episodeService = inject(EpisodeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  episode = signal<Episode | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    // Captura o ID da rota
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadepisodeDetails(Number(id));
    }
  }

  loadepisodeDetails(id: number): void {
    this.loading.set(true);
    this.episodeService.getEpisodeById(id).subscribe({
      next: (episodeData) => {
        this.episode.set(episodeData);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar localização:', err);
        this.error.set('Failed to load episode details.');
        this.loading.set(false);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/episode']);
  }

  retry(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadepisodeDetails(Number(id));
    }
  }

  // getFirstEpisodes(): string[] {
  //   const episodes = this.episode()?.episode || [];
  //   return episodes.slice(0, 12);
  // }

  getEpisodeNumber(episodeUrl: string): string {
    return episodeUrl.split('/').pop() || '';
  }

}
