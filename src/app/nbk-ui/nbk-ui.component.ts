// Import necessary Angular modules
import { Component, ElementRef, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nbk-ui', // Defines the component's selector
  templateUrl: './nbk-ui.component.html', // Links the component to its HTML file
  styleUrls: ['./nbk-ui.component.css'], // Links the component to its CSS file
  standalone: true,
  imports: [CommonModule, FormsModule] // Imports necessary Angular modules
})
export class NbkUiComponent {
  nbkInputs: string[] = [''];  // Initialize with one empty input field
  tableData: { nbk: string; requirement1: boolean; requirement2: boolean; requirement3: boolean }[] = []; 
  sidebarOpen: boolean = false; // Controls the visibility of the sidebar

  @ViewChildren('nbkInput') nbkInputRefs!: QueryList<ElementRef>; // Captures input elements for focusing

  // Function to add a new NBK search input (maximum of 10 inputs)
  addNBK(): void {
    if (this.nbkInputs.length < 10) {
      this.nbkInputs.push(''); // Add an empty string to the array to create a new input field
      
      // Delay focus setting to ensure new input is rendered first
      setTimeout(() => {
        const inputs = this.nbkInputRefs.toArray();
        const lastInput = inputs[inputs.length - 1];
        if (lastInput) {
          lastInput.nativeElement.focus(); // Automatically focus on the newly added input
        }
      });
    }
  }

  // Function to remove a specific NBK input field
  removeNBK(index: number): void {
    this.nbkInputs.splice(index, 1); // Remove the input at the specified index
    
    // Ensure there is always at least one input field
    if (this.nbkInputs.length === 0) {
      this.nbkInputs.push('');
    }
  }

  // Function to generate mock data for the table based on entered NBKs
  getData(): void {
    this.tableData = this.nbkInputs.filter(nbk => nbk.trim() !== '').map(nbk => ({
      nbk,
      requirement1: Math.random() > 0.5, // Randomly assign boolean values
      requirement2: Math.random() > 0.5,
      requirement3: Math.random() > 0.5
    }));
  }

  // Function to reset all input fields and clear table data
  clearAll(): void {
    this.nbkInputs = [''];  // Reset to one empty input field
    this.tableData = [];    // Clear the table data
  }

  // Function to improve performance by tracking elements by their index
  trackByFn(index: number): number {
    return index;
  }
}