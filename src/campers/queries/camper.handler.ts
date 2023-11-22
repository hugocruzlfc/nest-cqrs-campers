import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { CamperDtoRepository } from "../db/camper-dto.repository";
import { CamperQueryDto } from "../dto/camper-query";
import { CamperQuery } from "./camper.query";

@QueryHandler(CamperQuery)
export class CamperHandler implements IQueryHandler<CamperQuery> {
  constructor(private readonly camperDtoRepository: CamperDtoRepository) {}

  async execute(): Promise<CamperQueryDto[]> {
    return this.camperDtoRepository.findAll();
  }
}
