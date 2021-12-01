import { Collections } from "../models/Collection";
import { User, UserProps } from "../models/User";

export abstract class CollectionsView {
  constructor() {
    this.load();
  }
  collection: Collections<User, UserProps> = new Collections<User, UserProps>(
    "http://localhost:3000/users",
    (json: UserProps) => User.buildUser(json)
  );
  abstract renderItem(model: User, itemParent: Element): void;

  load() {
    this.collection.fetch();
    this.collection.on("change", () => {
      this.render();
    });
  }

  render(): void {
    const users = this.collection.models;
    users.forEach((user) => {
      const div = document.createElement("div");
      this.renderItem(user, div);
    });
  }
}
