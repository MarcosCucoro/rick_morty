import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { CharacterService } from '../../core/services/character.service';
import { UserProfile } from '../../shared/models/userProfile.model';
import { Character } from '../../shared/models/character.model';

@Component({
  selector: 'app-profile-user',
  imports: [CommonModule, RouterLink],
  templateUrl: './profile-user.html',
  styleUrl: './profile-user.scss',
})
export class ProfileUser implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  private characterService = inject(CharacterService);

  profile = signal<UserProfile | null>(null);
  favoriteCharacter = signal<Character | null>(null);
  loading = signal<boolean>(true);

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.loading.set(true);
    const userInfo = this.authService.getUserInfo();

    if (userInfo) {
      const favoriteCharacterId = Math.floor(Math.random() * 826) + 1;
      this.characterService.getCharacterById(favoriteCharacterId).subscribe({
        next: (character) => {
          this.favoriteCharacter.set(character);

          this.profile.set({
            username: userInfo.username,
            email: `${userInfo.username.toLowerCase()}@rickandmorty.com`,
            memberSince: new Date(),
            favoriteCharacter: character.name,
            favoriteCharacterImage: character.image,
            totalVisits: Math.floor(Math.random() * 1000)
          });

          this.loading.set(false);
        },
        error: (err) => {
          console.error('Erro ao carregar personagem favorito:', err);
          this.profile.set({
            username: userInfo.username,
            email: `${userInfo.username.toLowerCase()}@rickandmorty.com`,
            memberSince: new Date(),
            favoriteCharacter: 'Rick Sanchez',
            favoriteCharacterImage: null,
            totalVisits: 42
          });

          this.loading.set(false);
        }
      });
    } else {
      this.loading.set(false);
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  logout(): void {
    this.authService.logout();
  }
}
