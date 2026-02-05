import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonaleService } from '../../services/personale.service';
import { AnagraficaRifiutiService } from '../../services/anagrafica-rifiuti.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  countPersonale: number = 0;
  countRifiuti: number = 0;
  loading: boolean = true;

  constructor(
    private personaleService: PersonaleService,
    private rifiutiService: AnagraficaRifiutiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCounts();
  }

  loadCounts(): void {
    this.loading = true;

    this.personaleService.getCount().subscribe({
      next: (count) => {
        this.countPersonale = count;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Errore nel caricamento conteggio personale:', error);
      }
    });

    this.rifiutiService.getCount().subscribe({
      next: (count) => {
        this.countRifiuti = count;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Errore nel caricamento conteggio rifiuti:', error);
        this.loading = false;
      }
    });
  }
}
