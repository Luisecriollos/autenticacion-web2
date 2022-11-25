import { IRole } from "@src/models/Role";
import { ObjectId } from "mongodb";
import db from "../db";

const getCollection = () => db.getDb().collection<IRole>("roles");
// **** Functions **** //

/**
 * Get one role.
 */
const getOne = async (id: string): Promise<IRole | null> => {
  const client = getCollection();
  return client.findOne({ _id: { $eq: new ObjectId(id) } });
};

/**
 * See if a role with the given id exists.
 */
const persists = async (id: string): Promise<boolean> => {
  const client = getCollection();

  const role = await client.findOne({ _id: { $eq: new ObjectId(id) } });

  return !!role;
};

/**
 * Get all roles.
 */
const getAll = async (): Promise<IRole[]> => {
  const client = getCollection();
  return client.find().toArray();
};

/**
 * Add one role.
 */
const add = async (role: IRole): Promise<IRole | null> => {
  const client = getCollection();

  const { insertedId } = await client.insertOne(role);
  const result = await client.findOne({ _id: { $eq: insertedId } });
  return result;
};

/**
 * Update a role.
 */
const update = async ({ _id, ...role }: IRole): Promise<IRole | null> => {
  const client = getCollection();

  const updated = await client.findOneAndUpdate(
    { _id: { $eq: new ObjectId(_id) } },
    { $set: role },
    { returnDocument: "after" },
  );
  return updated.value;
};

/**
 * Delete one role.
 */
const _delete = async (id: string): Promise<void> => {
  const client = getCollection();

  await client.deleteOne({
    _id: {
      $eq: new ObjectId(id),
    },
  });
};

// **** Export default **** //

export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: _delete,
} as const;
