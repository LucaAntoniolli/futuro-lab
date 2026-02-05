import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { Personale } from '../../models/personale.model';
import { PersonaleService } from '../../services/personale.service';

@Component({
  selector: 'app-gestione-personale',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gestione-personale.component.html',
  styleUrl: './gestione-personale.component.scss'
})
export class GestionePersonaleComponent implements OnInit {
  personale: Personale[] = [];
  personaleForm!: FormGroup;
  showDialog = false;
  isEditMode = false;
  editingId: number = 0;

  constructor(
    private personaleService: PersonaleService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadPersonale();
  }

  loadPersonale(): void {
    this.personaleService.getAll().subscribe({
      next: (data) => {
        this.personale = data;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Errore nel caricamento del personale:', error);
      }
    });
  }

  openAddDialog(): void {
    this.isEditMode = false;
    this.editingId = 0;
    this.personaleForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      societa: [''],
      dataInizio: [''],
      dataFine: ['']
    });
    this.showDialog = true;
    this.cdr.markForCheck();
  }

  openEditDialog(persona: Personale): void {
    this.isEditMode = true;
    this.editingId = persona.id;
    this.personaleForm = this.fb.group({
      nome: [persona.nome, Validators.required],
      cognome: [persona.cognome, Validators.required],
      societa: [persona.societa],
      dataInizio: [persona.dataInizio ? persona.dataInizio.format('YYYY-MM-DD') : ''],
      dataFine: [persona.dataFine ? persona.dataFine.format('YYYY-MM-DD') : '']
    });
    this.showDialog = true;
    this.cdr.markForCheck();
  }

  closeDialog(): void {
    this.showDialog = false;
    this.personaleForm.reset();
    this.cdr.markForCheck();
  }

  savePersona(): void {
    if (this.personaleForm.invalid) return;

    const formValue = this.personaleForm.value;
    const persona: Personale = {
      id: this.editingId,
      nome: formValue.nome,
      cognome: formValue.cognome,
      societa: formValue.societa || null,
      dataInizio: formValue.dataInizio ? moment(formValue.dataInizio) : null,
      dataFine: formValue.dataFine ? moment(formValue.dataFine) : null
    };

    if (this.isEditMode && this.editingId) {
      this.personaleService.update(this.editingId, persona).subscribe({
        next: () => {
          this.loadPersonale();
          this.closeDialog();
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Errore nell\'aggiornamento:', error);
        }
      });
    } else {
      this.personaleService.create(persona).subscribe({
        next: () => {
          this.loadPersonale();
          this.closeDialog();
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Errore nella creazione:', error);
        }
      });
    }
  }

  deletePersona(id: number): void {
    if (confirm('Sei sicuro di voler eliminare questo elemento?')) {
      this.personaleService.delete(id).subscribe({
        next: () => {
          this.loadPersonale();
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Errore nell\'eliminazione:', error);
        }
      });
    }
  }

}
