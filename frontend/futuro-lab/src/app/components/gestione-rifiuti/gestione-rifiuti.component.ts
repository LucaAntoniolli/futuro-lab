import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { AnagraficaRifiuti } from '../../models/anagrafica-rifiuti.model';
import { AnagraficaRifiutiService } from '../../services/anagrafica-rifiuti.service';

@Component({
  selector: 'app-gestione-rifiuti',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gestione-rifiuti.component.html',
  styleUrl: './gestione-rifiuti.component.scss'
})
export class GestioneRifiutiComponent implements OnInit {
  rifiuti: AnagraficaRifiuti[] = [];
  rifiutiForm!: FormGroup;
  showDialog = false;
  isEditMode = false;
  editingId: number = 0;

  constructor(
    private rifiutiService: AnagraficaRifiutiService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadRifiuti();
  }

  loadRifiuti(): void {
    this.rifiutiService.getAll().subscribe({
      next: (data) => {
        this.rifiuti = data;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Errore nel caricamento dei rifiuti:', error);
      }
    });
  }

  openAddDialog(): void {
    this.isEditMode = false;
    this.editingId = 0;
    this.rifiutiForm = this.fb.group({
      tipo: ['', Validators.required],
      descrizione: [''],
      luogoProduzione: [''],
      dataProduzione: [''],
      note: ['']
    });
    this.showDialog = true;
    this.cdr.markForCheck();
  }

  openEditDialog(rifiuto: AnagraficaRifiuti): void {
    this.isEditMode = true;
    this.editingId = rifiuto.id;
    this.rifiutiForm = this.fb.group({
      tipo: [rifiuto.tipo, Validators.required],
      descrizione: [rifiuto.descrizione],
      luogoProduzione: [rifiuto.luogoProduzione],
      dataProduzione: [rifiuto.dataProduzione ? rifiuto.dataProduzione.format('YYYY-MM-DD') : ''],
      note: [rifiuto.note]
    });
    this.showDialog = true;
    this.cdr.markForCheck();
  }

  closeDialog(): void {
    this.showDialog = false;
    this.rifiutiForm.reset();
    this.cdr.markForCheck();
  }

  saveRifiuto(): void {
    if (this.rifiutiForm.invalid) return;

    const formValue = this.rifiutiForm.value;
    const rifiuto: AnagraficaRifiuti = {
      id: this.editingId,
      tipo: formValue.tipo,
      descrizione: formValue.descrizione || null,
      luogoProduzione: formValue.luogoProduzione || null,
      dataProduzione: formValue.dataProduzione ? moment(formValue.dataProduzione) : null,
      note: formValue.note || null
    };

    if (this.isEditMode && this.editingId) {
      this.rifiutiService.update(this.editingId, rifiuto).subscribe({
        next: () => {
          this.loadRifiuti();
          this.closeDialog();
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Errore nell\'aggiornamento:', error);
        }
      });
    } else {
      this.rifiutiService.create(rifiuto).subscribe({
        next: () => {
          this.loadRifiuti();
          this.closeDialog();
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Errore nella creazione:', error);
        }
      });
    }
  }

  deleteRifiuto(id: number): void {
    if (confirm('Sei sicuro di voler eliminare questo elemento?')) {
      this.rifiutiService.delete(id).subscribe({
        next: () => {
          this.loadRifiuti();
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Errore nell\'eliminazione:', error);
        }
      });
    }
  }

}
