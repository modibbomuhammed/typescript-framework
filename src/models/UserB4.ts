import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = "http://localhost:3000/users";

export class User {
  private events: Eventing = new Eventing();
  private sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  private attributes: Attributes<UserProps>;

  constructor(attr: UserProps) {
    this.attributes = new Attributes<UserProps>(attr);
  }

  //   get get() {
  //     return this.attributes.get.bind(this.attributes);
  //   }

  //   get on() {
  //     return this.events.on;
  //   }

  //   get trigger() {
  //     return this.events.trigger;
  //   }

  //   set(update: UserProps): void {
  //     this.attributes.set(update);
  //     this.events.trigger("change");
  //   }

  //   async fetch(): Promise<void> {
  //     const id = this.attributes.get("id");
  //     if (!id) throw new Error("Cannot Fetch Without an Id");
  //     this.set(await this.sync.fetch(id));
  //   }

  //   async save(): Promise<void> {
  //     await this.sync.save(this.attributes.getAllProps());
  //     this.events.trigger("save");
  //   }
}
