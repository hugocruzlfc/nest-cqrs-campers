import { BadRequestException } from "@nestjs/common";
import { AggregateRoot } from "@nestjs/cqrs";

export class Camper extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly name: string,
    private readonly age: number,
    private allergies: string[]
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }

  getName(): string {
    return this.name;
  }

  getAge(): number {
    return this.age;
  }

  getAllergies(): string[] {
    return [...this.allergies];
  }

  updateAllergies(allergies: string[]): void {
    const allergiesLower = allergies.map((allergy) => allergy.toLowerCase());
    if (allergiesLower.includes("peanuts")) {
      throw new BadRequestException("Peanuts allergy is not allowed");
    }
    this.allergies = allergies;
  }
}
