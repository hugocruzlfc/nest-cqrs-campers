import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseEntityRepository } from "src/database/base-entity.repository";
import { CamperSchema } from "./camper.schema";
import { CamperSchemaFactory } from "./camper-schema.factory";
import { Camper } from "../Camper";

@Injectable()
export class CamperEntityRepository extends BaseEntityRepository<
  CamperSchema,
  Camper
> {
  constructor(
    @InjectModel(CamperSchema.name)
    camperModel: Model<CamperSchema>,
    camperSchemaFactory: CamperSchemaFactory
  ) {
    super(camperModel, camperSchemaFactory);
  }
}
