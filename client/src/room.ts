import { Client } from "./client";

export type Room = {
  name: string;
  host: Client;
  users: Client[];
};
