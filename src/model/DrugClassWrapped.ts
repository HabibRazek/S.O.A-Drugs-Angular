import { DrugClass } from './DrugClass.model';

export class DrugClassWrapped {
  _embedded!: { drugClass: DrugClass[] };
}
