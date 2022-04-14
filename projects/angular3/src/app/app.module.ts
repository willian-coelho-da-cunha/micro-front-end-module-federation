import { NgModule, Injector, DoBootstrap } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { MicroservicesComponent } from './micro-services/micro-services.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ServicesComponent,
    MicroservicesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'angular3/services', component: ServicesComponent },
      { path: 'angular3/micro-services', component: MicroservicesComponent },
      { path: '**', component: HomeComponent }
    ])
  ]
})
export class AppModule implements DoBootstrap {

  constructor(
    private injector: Injector
  ) { }

  ngDoBootstrap(): void {
    const ce = createCustomElement(AppComponent, { injector: this.injector });

    customElements.define('angular3-element', ce);
    customElements.define('angular3-services-element', createCustomElement(ServicesComponent, { injector: this.injector }));
    customElements.define('angular3-micro-services-element', createCustomElement(MicroservicesComponent, { injector: this.injector }));
  }
}
