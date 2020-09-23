import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

import { PageLoaderComponent } from "./page-loader/page-loader.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from "@angular/router";
import { MatListModule } from "@angular/material/list";
import { ChangeDisplayNameComponent } from './change-display-name/change-display-name.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatDialogModule,MatInputModule  } from '@angular/material';
import { HttpClientModule } from "@angular/common/http";
import { MatButtonModule } from "@angular/material/button";
import {  MatNativeDateModule, MatProgressSpinnerModule, MatProgressBarModule, MatToolbarModule, MatSelectModule } from "@angular/material";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDividerModule } from "@angular/material/divider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { BrowserModule } from "@angular/platform-browser";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from '@angular/material';
import {MatSliderModule} from '@angular/material/slider';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  imports: [CommonModule, NgbModule, RouterModule, MatListModule,FormsModule,MatFormFieldModule,MatDialogModule,
    MatInputModule,MatButtonModule ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    PageLoaderComponent,
    ChangeDisplayNameComponent,
    ChangeEmailComponent,
    ChangePasswordComponent,
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    PageLoaderComponent
  ],
  entryComponents:[
    ChangeDisplayNameComponent,
    ChangeEmailComponent,
    ChangePasswordComponent
  ]
  
})
export class LayoutModule {}
