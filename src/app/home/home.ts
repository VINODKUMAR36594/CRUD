import { Component, OnInit, signal } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee-service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html'
})
export class Home implements OnInit {

  selectedEmployee = signal<Employee | null>(null);

  editingEmployee = signal<Employee | null>(null);

  employees = signal<Employee[]>([]);

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.employeeService.getEmployees().subscribe(data => {
      this.employees.set(data);
    });

  }

  viewEmployee(employee: Employee): void {

    this.employeeService.getEmployeeId(employee.id!).subscribe(data => {
      this.selectedEmployee.set(data);
    });

  }

  editEmployee(employee: Employee): void {

    this.employeeService.addEmployee(employee).subscribe(data => {
      this.editingEmployee.set(data);
    });

  }

  deleteEmployee(employee: Employee): void {

    this.employeeService.deleteEmployee(employee.id!).subscribe(() => {

      this.employees.update(
        empList => empList.filter(
          emp => emp.id !== employee.id
        )
      );

    });

  }

  updateEmployee(employee: Employee): void {

    this.employeeService
      .updateEmployee(employee.id!, employee)
      .subscribe(data => {

        this.editingEmployee.set(null);

        this.selectedEmployee.set(data);

        this.employeeService
          .getEmployees()
          .subscribe(updatedData => {
            this.employees.set(updatedData);
          });

      });

  }

  // 🔐 Logout
  logout(): void {

    this.authService.logout();

    this.router.navigate(['/login']);

  }

}