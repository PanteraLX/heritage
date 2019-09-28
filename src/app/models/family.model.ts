import { IPerson } from './person.model';

export interface IFamily extends IPerson {
  children?: IFamily[];
  parents?: IFamily[];
  partners?: IFamily[];
}
