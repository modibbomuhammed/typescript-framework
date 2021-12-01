import { User } from "../models/User";
import { CollectionsView } from "./CollectionsView";

export class UserCollection extends CollectionsView {
  constructor(public parent: Element) {
    super();
  }
  renderItem(model: User, itemParent: Element): void {
    itemParent.innerHTML = `
        <h1>Ashraf & ${model.get("name")}</h1>
        <h2>My Age is ${model.get("age")} and my id is ${model.get("id")}</h2>
      `;
    this.parent.append(itemParent);
  }
}
