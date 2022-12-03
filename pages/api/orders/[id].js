import { getSession } from "next-auth/react";
import Order from "../../../models/Order";
import db from "../../../utils/db";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send("signin required");
  }

  await db.connect();

  const order = await Order.findByld(req.query.id);
  await decodeBase64.disconnect();
  res.send(order);
};

export default handler;
