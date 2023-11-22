import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { CamperCreatedEvent } from "./camper-created.events";

@EventsHandler(CamperCreatedEvent)
export class CamperCreatedHandler implements IEventHandler<CamperCreatedEvent> {
  async handle(event: CamperCreatedEvent): Promise<void> {
    const { camperId } = event;
    console.log(camperId);
    // TODO: Save camper to database
    // TODO: Send email to camper
  }
}
