import { IEmployee } from './IEmployee';

export interface IHREmployee extends IEmployee {
  password: string;
}