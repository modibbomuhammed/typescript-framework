type Callback = () => void;

export class Eventing {
  eventsObj: { [key: string]: Callback[] } = {};

  on = (eventName: string, callback: Callback): void => {
    if (this.eventsObj[eventName]) {
      this.eventsObj[eventName].push(callback);
    } else {
      this.eventsObj[eventName] = [callback];
    }
    // his
    // const handlers = this.eventsObj[eventName] || [];
    // handlers.push(callback);
    // this.eventsObj[eventName] = handlers;
  };

  trigger = (eventName: string): void => {
    const handlers = this.eventsObj[eventName];
    if (!handlers || !handlers.length) return;

    handlers.forEach((callback) => callback());
  };
}
