import { IUser } from "@src/models/User";
import { ObjectId } from "mongodb";
import db from "../db";

const getCollection = () => db.getDb().collection<IUser>("users");
// **** Functions **** //

/**
 * Get one user.
 */
const getOne = (email: string): Promise<IUser | null> => {
  const client = getCollection();
  return client
    .aggregate<IUser>([
      {
        $match: {
          email,
        },
      },
      {
        $lookup: {
          from: "roles",
          localField: "role",
          foreignField: "_id",
          as: "role",
        },
      },
    ])
    .tryNext();
};

/**
 * See if a user with the given id exists.
 */
async function persists(id: string): Promise<boolean> {
  const client = getCollection();

  const user = await client.findOne({ _id: { $eq: new ObjectId(id) } });

  return !!user;
}

/**
 * Get all users.
 */
const getAll = async (): Promise<IUser[]> => {
  const client = getCollection();
  return client
    .aggregate<IUser>([
      {
        $lookup: {
          from: "roles",
          localField: "role",
          foreignField: "_id",
          as: "role",
        },
      },
    ])
    .toArray();
};

/**
 * Add one user.
 */
async function add(user: IUser): Promise<IUser | null> {
  const client = getCollection();

  const { insertedId } = await client.insertOne(user);
  const result = await client.findOne({ _id: { $eq: insertedId } });
  return result;
}

/**
 * Update a user.
 */
const update = async ({ _id, ...user }: IUser): Promise<IUser | null> => {
  const client = getCollection();

  const updated = await client.findOneAndUpdate(
    { _id: { $eq: new ObjectId(_id) } },
    { $set: user },
    { returnDocument: "after" },
  );
  return updated.value;
};

/**
 * Delete one user.
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
