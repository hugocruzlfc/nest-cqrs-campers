import { ObjectId } from "mongoose";

export class CamperQueryDto {
  readonly _id: ObjectId;
  readonly name: string;
  readonly age: number;
  readonly allergies: string[];
  readonly isAllergicToPeanuts: boolean;
}
