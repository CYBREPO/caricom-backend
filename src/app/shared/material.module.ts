import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTreeModule} from '@angular/material/tree';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,MatDialogModule,MatProgressSpinnerModule,MatFormFieldModule,
    MatInputModule,MatMenuModule,FormsModule, ReactiveFormsModule,MatTreeModule,MatPaginatorModule
  ],
  exports: [MatDialogModule,MatProgressSpinnerModule,MatFormFieldModule,
    MatInputModule,MatMenuModule,FormsModule, ReactiveFormsModule,MatTreeModule,
    MatPaginatorModule]
})
export class MaterialModule { }
