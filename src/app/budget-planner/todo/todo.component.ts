import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  todoForm: any;
  selectedMonth: any;
  expenses: { month: string; expenseAmount: number }[] = [
    { month: 'January', expenseAmount: 1500 },
    { month: 'February', expenseAmount: 2000 },
    { month: 'March', expenseAmount: 2310 },
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
  toggleSelection: any;

  constructor(public fb: FormBuilder, private router: Router) {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', {
      month: 'long',
    });
    this.selectedMonth = currentMonth;
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
      switch (this.selectedMonth) {
        case 'January':
          this.januaryExpense.push(newExpense);
          break;
        case 'February':
          this.februaryExpense.push(newExpense);
          break;
        case 'March':
          this.marchExpense.push(newExpense);
          break;
        default:
          break;
      }
      this.todoForm.reset();
      this.todoForm.patchValue({
        month: '',
        expenseType: '',
        expenseAmount: '',
      });
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
        fileteredExpense = [...this.januaryExpense];
        break;
      case 'February':
        fileteredExpense = [...this.februaryExpense];
        break;
      case 'March':
        fileteredExpense = [...this.marchExpense];
        break;
      default:
        break;
    }
    return fileteredExpense;
  }

  calculateTotalExpense(month: string): number {
    let totalExpense = 0;
    for (const income of this.gettodoFormonth(month)) {
      totalExpense += income.expenseAmount;
    }
    return totalExpense;
  }

  gettodoFormonth(month: string): any[] {
    switch (month) {
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
