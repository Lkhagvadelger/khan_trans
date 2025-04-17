import { prisma } from "@api/prisma";
import { Load } from "@prisma/client";

type loadType = {
  LoadID: string;
  PickUpDate: Date;
  DeliveryDate: Date;
  //driverId: string;
  //brokerId: string;
  notes: string;
  vehicles: {
    Vehicle: string;
  };
};

export const createLoad = async ({ load }: { load: loadType }) => {
  try {
    const newLoad = await prisma.load.create({
      data: {
        LoadID: load.LoadID,
        PickUpDate: new Date(load.PickUpDate).toISOString(),
        DeliveryDate: new Date(load.DeliveryDate).toISOString(),
        // driverId: load.driverId,
        // brokerId: load.brokerId,
        notes: {
          create: {
            Note: load.notes,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        vehicles: {
          create: {
            Vehicle: load.vehicles.Vehicle,
          },
        },
      },
    });

    return newLoad;
  } catch (error) {
    console.error("Error creating load:", error);
    throw new Error("Failed to create load");
  }
};
