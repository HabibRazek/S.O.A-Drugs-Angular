import { DrugClass } from "./DrugClass.model";
import { Image } from "./Image.model";

export class Drugs {
  id!: number;
  genericName!: string;
  brandNames!: string;
  dosageForm!: string;
  lastUpdated!: Date;
  drugClass!: DrugClass;
  image! : Image;
  imageStr!:string;
  images!: Image[];

}
