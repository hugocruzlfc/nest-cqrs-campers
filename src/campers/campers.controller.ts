import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateCamperRequest } from "./dto/request/create-camper-request.dto";
import { UpdateCamperAllergiesRequest } from "./dto/request/update-camper-allergies-request.dto";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateCamperCommand } from "./commands/create-camper/create-camper.commands";
import { UpdateAllergiesCommand } from "./commands/update-allergies/update-allergies.command";
import { CamperQueryDto } from "./dto/camper-query";
import { CamperQuery } from "./queries/camper.query";

@Controller("campers")
export class CampersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Get(":id")
  async getCamper(@Param("id") camperId: string): Promise<void> {}

  @Get()
  async getCampers(): Promise<CamperQueryDto[]> {
    return this.queryBus.execute<CamperQuery, CamperQueryDto[]>(
      new CamperQuery()
    );
  }

  @Post()
  async createCamper(
    @Body() createCamperRequest: CreateCamperRequest
  ): Promise<void> {
    await this.commandBus.execute<CreateCamperCommand, void>(
      new CreateCamperCommand(createCamperRequest)
    );
  }

  @Patch(":id")
  async updateCamperAllergies(
    @Param("id") camperId: string,
    @Body() updateCamperAllergiesRequest: UpdateCamperAllergiesRequest
  ): Promise<void> {
    await this.commandBus.execute<UpdateAllergiesCommand, void>(
      new UpdateAllergiesCommand(
        camperId,
        updateCamperAllergiesRequest.allergies
      )
    );
  }
}
