import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from "@angular/material";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatToolbarModule,
    Material.MatGridListModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatRadioModule,
    Material.MatSelectModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatCheckboxModule,
    Material.MatButtonModule,
    Material.MatSnackBarModule,
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatSortModule,
    Material.MatPaginatorModule,
    Material.MatDialogModule,
   

  ],

  exports: [
      Material.MatToolbarModule,
      Material.MatGridListModule,
      Material.MatFormFieldModule,
      Material.MatInputModule,
      Material.MatRadioModule,
      Material.MatSelectModule,
      Material.MatDatepickerModule,
      Material.MatNativeDateModule,
      Material.MatCheckboxModule,
      Material.MatButtonModule,
      Material.MatSnackBarModule,
      Material.MatTableModule,
      Material.MatIconModule,
      Material.MatSortModule,
      Material.MatPaginatorModule,
      Material.MatDialogModule,
  ],
})
export class MaterialModule { }
