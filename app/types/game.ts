export type Actor = {
  realmId?: string | null;
  type: ActorType;
  id: string;
  isDeleted: boolean;
  displayName: string;
  emailAddress?: string | null;
  pictureUrl?: string | null;
};

export type ActorType = "System" | "ApiKey" | "User";

export type Aggregate = {
  id: string;
  version: number;
  createdBy: Actor;
  createdOn: string;
  updatedBy: Actor;
  updatedOn: string;
};
