import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CamperFactory } from "../../camper.factory";
import { UpdateAllergiesCommand } from "./update-allergies.command";
import { CamperEntityRepository } from "src/campers/db/camper-entity.repository";

@CommandHandler(UpdateAllergiesCommand)
export class UpdateAllergiesHandler
  implements ICommandHandler<UpdateAllergiesCommand> {
  constructor(
    private readonly camperEntityRepository: CamperEntityRepository,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute({
    camperId,
    allergies,
  }: UpdateAllergiesCommand): Promise<void> {
    const camper = this.eventPublisher.mergeObjectContext(
      await this.camperEntityRepository.findOneById(camperId)
    );
    camper.updateAllergies(allergies);
    await this.camperEntityRepository.findOneAndReplaceById(camperId, camper);
    camper.commit();
  }
}
