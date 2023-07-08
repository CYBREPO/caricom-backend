import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTreeModule} from '@angular/material/tree';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,MatDialogModule,MatProgressBarModule,MatFormFieldModule,
    MatInputModule,MatMenuModule,FormsModule, ReactiveFormsModule,MatTreeModule,MatPaginatorModule
  ],
  exports: [MatDialogModule,MatProgressBarModule,MatFormFieldModule,
    MatInputModule,MatMenuModule,FormsModule, ReactiveFormsModule,MatTreeModule,
    MatPaginatorModule]
})
export class MaterialModule { }
