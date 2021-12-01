import { User } from "./models/User";
import { UserCollection } from "./views/UserCollection";
import { UserEdit } from "./views/UserEdit";
import { UserList } from "./views/UserList";
import { Collections } from "./models/Collection";
import { UserProps } from "./models/User";

const root = document.getElementById("root");

const users = new Collections(
  "http://localhost:3000/users",
  (json: UserProps) => User.buildUser(json)
);

users.on("change", () => {
  new UserList(root, users).render();
});

users.fetch();
