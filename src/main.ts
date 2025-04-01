import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { NbkUiComponent } from './app/nbk-ui/nbk-ui.component';

@Component({
  selector: 'app-root',
  template: `
    <app-nbk-ui></app-nbk-ui>
  `,
  standalone: true,
  imports: [NbkUiComponent]
})
export class App {
}

bootstrapApplication(App);