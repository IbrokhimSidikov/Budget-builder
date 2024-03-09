import { Component } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  standalone: true,
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
  imports: [SideNavComponent, ReactiveFormsModule, CommonModule, MatIconModule],
})
export class HistoryComponent {
  todoForm: any;
  selectedMonth: string;
  expenses: { month: string; expenseAmount: number }[] = [
    { month: 'January', expenseAmount: 35000 },
    { month: 'February', expenseAmount: 78000 },
    { month: 'March', expenseAmount: 21000 },
  ];
  monthSelected: boolean = false;

  januaryExpense: any[] = [
    { expenseType: 'Rent', expenseAmount: 1000 },
    { expenseType: 'Groceries', expenseAmount: 800 },
  ];
  februaryExpense: any[] = [
    { expenseType: 'utilities', expenseAmount: 1000 },
    { expenseType: 'Groceries', expenseAmount: 800 },
  ];
  marchExpense: any[] = [
    { expenseType: 'Rent', expenseAmount: 1000 },
    { expenseType: 'Utilities', expenseAmount: 800 },
  ];

  constructor(public fb: FormBuilder, private router: Router) {
    this.selectedMonth = new Date().toLocaleDateString('default', {
      month: 'long',
    });
  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      month: ['', Validators.required],
      expenseType: ['', Validators.required],
      expenseAmount: ['', Validators.required],
    });
  }

  onSubmitExpense() {
    if (this.todoForm.valid) {
      const newExpense = this.todoForm.value;
      this.getFilteredExpenses().push(newExpense);
      this.todoForm.reset();
    }
  }

  onChangeExpense(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredExpenses();
  }

  getFilteredExpenses() {
    let fileteredExpense: any[] = [];
    switch (this.selectedMonth) {
      case 'January':
        return this.januaryExpense;
      case 'February':
        return this.februaryExpense;
      case 'March':
        return this.marchExpense;
      default:
        return [];
    }
  }

  calculateTotalExpense(month: string): number {
    return this.getFilteredExpenses().reduce(
      (acc, curr) => acc + curr.expenseAmount,
      0
    );
  }

  onSave() {
    if (this.todoForm.valid) {
      const incomeData = this.todoForm.value;
      this.todoForm.reset({ month: this.selectedMonth });
      this.getFilteredExpenses();
    }
  }

  saveForm() {
    console.log('Form Saved!');
  }
  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  }
}
