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
  const email = req.body?.email || "";
  //if no data name and email in request body
  if (!name || !email)
    return res
      .status(400)
      .json({ success: false, msg: "Please provide name and email" });

  const user = await checkUser({ email }); //check user already exists with the same email
  if (user)
    return res
      .status(400)
      .json({ success: false, msg: "User already existed with this email" });

  try {
    await addUserToDB(name, email);
    res.status(201).json({ success: true, msg: "New user created" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ success: false, msg: error });
  }
}

export async function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  const user = await checkUser({ id: Number(id) }); //check there was no user with an id
  if (!user)
    return res
      .status(400)
      .json({ success: false, msg: `Give ID ${id} does not match any user` });

  //if no data in req body
  if (!Object.keys(req.body).length)
    return res
      .status(400)
      .json({ success: false, msg: "Please provide update name or email" });

  let updateUser = { ...user, ...req.body };

  try {
    await updateUserDB(Number(id), {
      name: updateUser.name,
      email: updateUser.email,
    });
    res.status(200).json({ success: true, msg: "Successfully updated user" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
}

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;
  const user = await checkUser({ id: Number(id) });
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
