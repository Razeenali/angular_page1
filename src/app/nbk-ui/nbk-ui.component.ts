import { Component, ElementRef, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nbk-ui',
  templateUrl: './nbk-ui.component.html',
  styleUrls: ['./nbk-ui.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class NbkUiComponent {
  nbkInputs: string[] = [''];  // Initialize with one empty input
  tableData: { nbk: string; requirement1: boolean; requirement2: boolean; requirement3: boolean }[] = []; 
  sidebarOpen: boolean = false;

  @ViewChildren('nbkInput') nbkInputRefs!: QueryList<ElementRef>;

  addNBK(): void {
    if (this.nbkInputs.length < 10) {
      this.nbkInputs.push('');
      setTimeout(() => {
        const inputs = this.nbkInputRefs.toArray();
        const lastInput = inputs[inputs.length - 1];
        if (lastInput) {
          lastInput.nativeElement.focus();
        }
      });
    }
  }

  removeNBK(index: number): void {
    this.nbkInputs.splice(index, 1);
    if (this.nbkInputs.length === 0) {
      this.nbkInputs.push(''); // Always keep at least one input
    }
  }

  getData(): void {
    this.tableData = this.nbkInputs.filter(nbk => nbk.trim() !== '').map(nbk => ({
      nbk,
      requirement1: Math.random() > 0.5,
      requirement2: Math.random() > 0.5,
      requirement3: Math.random() > 0.5
    }));
  }

  clearAll(): void {
    this.nbkInputs = [''];  // Reset to one empty input
    this.tableData = [];    // Clear the table data
  }

  trackByFn(index: number): number {
    return index;
  }
}