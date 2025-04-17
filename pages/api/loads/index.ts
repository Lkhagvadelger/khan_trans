import { createHandler } from "@api/handler";
import { createLoad } from "@lib/loads/api/services";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const handler = createHandler();

handler
  .post(async (req, res) => {
    console.log("loads/index - post");

    const {
      LoadID,
      PickUpDate,
      DeliveryDate,
      driverId,
      brokerId,
      notes,
      vehicles,
    } = req.body;

    const load = {
      LoadID,
      PickUpDate,
      DeliveryDate,
      driverId,
      brokerId,
      notes,
      vehicles,
    };

    console.log(load);

    try {
      await createLoad({ load });
      return res.sendSuccess({});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to create load" });
    }
  })
  .get(async (req, res) => {
    console.log("loads/index - get");

    try {
      // Assuming you'd want to fetch loads here
      const loads = await prisma.load.findMany();
      return res.sendSuccess(loads);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch loads" });
    }
  });

export default handler;
