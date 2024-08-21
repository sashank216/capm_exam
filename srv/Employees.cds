using { ust.vishnu.sashank.db.master, ust.vishnu.sashank.db } from '../db/datamodel';

service Employees @(path:'Employees'){

    entity EmployeeSet  as projection on master.employees;

}