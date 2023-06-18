import { Request, Response } from "express";
import {
  addUserToDB,
  checkUser,
  deleteUserDB,
  fetchUsersFromDB,
  updateUserDB,
} from "./models";

export async function getUsers(req: Request, res: Response) {
  try {
    const data = await fetchUsersFromDB();
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
}

export async function createUser(req: Request, res: Response) {
  const name = req.body?.name || "";

  if (!name)
    return res.status(400).json({ success: false, msg: "Invalid Request" });

  try {
    await addUserToDB(name);
    res.status(201).json({ success: true, msg: "New user created" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
}

export async function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  const user = await checkUser(Number(id));
  if (!user)
    return res
      .status(400)
      .json({ success: false, msg: `Give ID ${id} does not match any user` });

  const name = req.body?.name || "";
  if (!name)
    return res
      .status(400)
      .json({ success: false, msg: "Please provide update name" });

  try {
    await updateUserDB(Number(id), name);
    res.status(200).json({ success: true, msg: "Successfully updated user" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
}

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;
  const user = await checkUser(Number(id));
  if (!user)
    return res
      .status(400)
      .json({ success: false, msg: `Give ID ${id} does not match any user` });

  try {
    await deleteUserDB(Number(id));
    res.status(200).json({ success: true, msg: "Successfully deleted user" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
}
