import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private  apiUrl = 'http://localhost:3000/employees';
  constructor(private http: HttpClient) {}
  getEmployees():Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getEmployeeId(id:number){
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }
  addEmployee(employee:Employee):Observable<Employee>{
    return this.http.post<Employee>(this.apiUrl,employee);
  }
  deleteEmployee(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  updateEmployee(id: number, employee: Employee): Observable<Employee> {
  return this.http.put<Employee>(
    `http://localhost:3000/employees/${id}`,
    employee
  );
}
  
  
}
