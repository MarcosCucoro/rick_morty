import { Component, inject, signal, OnInit } from '@angular/core';
import { LocationService } from '../../core/services/location.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Location as RMLocation } from '../../shared/models/location.model';

@Component({
  selector: 'app-location-details',
  imports: [CommonModule],
  templateUrl: './location-details.html',
  styleUrl: './location-details.scss',
})
export class LocationDetails implements OnInit {
  private locationService = inject(LocationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  location = signal<RMLocation | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadlocationDetails(Number(id));
    }
  }

  loadlocationDetails(id: number): void {
    this.loading.set(true);
    this.locationService.getLocationById(id).subscribe({
      next: (locationData) => {
        this.location.set(locationData);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar localização:', err);
        this.error.set('Failed to load location details.');
        this.loading.set(false);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/location']);
  }

  retry(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadlocationDetails(Number(id));
    }
  }

  getLocationNumber(locationUrl: string): string {
    return locationUrl.split('/').pop() || '';
  }

}
