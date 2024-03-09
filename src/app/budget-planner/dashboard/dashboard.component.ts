import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, SideNavComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  //income
  lastMonthsIncome = [
    'January: $45 000',
    'February: $60 800',
    'March: $49 900',
  ];
  currentMonthIncome = '$190 000';

  //expense
  lastMonthsExpense = [
    'January: $32 000',
    'February: $70 000',
    'March: $19 000',
  ];
  currentMonthExpense = '$140 000';

  //Todo Trans
  todoTransactions = [
    { description: 'Pay electricity bill' },
    { description: 'Submit monthly report' },
    { description: 'Buy groceries' },
    { description: 'Call insurance company' },
  ];
  totalCurrentMonthIncome = 190000;
  totalCurrentMonthExpense = 140000;

  constructor(public router: Router) {}
  onIncome() {
    this.router.navigate(['/budget-planner/income']);
  }

  onExpense() {
    this.router.navigate(['/budget-planner/expense']);
  }
  onTodo() {
    this.router.navigate(['/budget-planner/todo']);
  }
  get currentMonthSavings(): number {
    return this.totalCurrentMonthIncome - this.totalCurrentMonthExpense;
  }
}
