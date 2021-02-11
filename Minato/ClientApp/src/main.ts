import { enableProdMode } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { getPtPaginatorIntl } from './app/pt-paginator-intl';
import { environment } from './environments/environment';

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

const providers = [
  { provide: MatPaginatorIntl, useValue: getPtPaginatorIntl() },
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
];

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.log(err));

//export { renderModule, renderModuleFactory } from '@angular/platform-server';
