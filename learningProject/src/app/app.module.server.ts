import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from './services/category.service';


@NgModule({
  imports: [
    AppModule,
    ServerModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  providers:[CategoryService]

})
export class AppServerModule {}
