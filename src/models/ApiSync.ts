import axios, { AxiosPromise } from "axios";

interface HasId {
  id?: number;
}

export class ApiSync<T extends HasId> {
  constructor(public rootUrl: string) {}

  async fetch(id: number): Promise<T> {
    const { data: user } = await axios.get(`${this.rootUrl}/${id}`);
    return user;
  }

  async save(data: T): Promise<AxiosPromise> {
    const { id } = data;
    if (id) {
      return await axios.put(`${this.rootUrl}/${id}`, data);
    } else {
      return await axios.post(this.rootUrl, data);
    }
  }
}
