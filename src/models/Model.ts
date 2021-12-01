import { AxiosPromise } from "axios";

interface ModelAttribute<T> {
  set(update: T): void;
  getAllProps(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): Promise<T>;
  save(data: T): Promise<AxiosPromise>;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttribute<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  /// shorthand options
  // get = this.attributes.get.bind(this.attributes);

  // on = this.events.on;

  // trigger = this.events.trigger;
  get get() {
    return this.attributes.get.bind(this.attributes);
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger("change");
  }

  async fetch(): Promise<void> {
    const id = this.attributes.get("id");
    if (!id) throw new Error("Cannot Fetch Without an Id");
    this.set(await this.sync.fetch(id));
  }

  async save(): Promise<void> {
    await this.sync.save(this.attributes.getAllProps());
    this.events.trigger("save");
  }
}
