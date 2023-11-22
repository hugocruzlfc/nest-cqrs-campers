import { Injectable } from "@nestjs/common";
import { CamperSchema } from "./camper.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CamperQueryDto } from "../dto/camper-query";

@Injectable()
export class CamperDtoRepository {
  constructor(
    @InjectModel(CamperSchema.name)
    private readonly camperModel: Model<CamperSchema>
  ) {}

  async findAll(): Promise<CamperQueryDto[]> {
    const campers = await this.camperModel.find({}, {}, { lean: true });
    return campers.map((camper) => {
      const allergiesLower = camper.allergies.map((allergy) =>
        allergy.toLowerCase()
      );
      const isAllergicToPeanuts = allergiesLower.includes("peanuts");
      return {
        ...camper,
        isAllergicToPeanuts,
      };
    });
  }
}
