import axios, { AxiosResponse } from "axios";
import cron from "node-cron";
import { Photo } from "../models/photos.model";
import { URL_ENDPOINT } from "../utils";

export const photoGallery = async () => {
  try {
    await cron.schedule("* * * * *", async () => {
      console.log(
        `Resuming task @ ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
      );

      const { data }: AxiosResponse = await axios({
        url: URL_ENDPOINT,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const DBlength: number = await Photo.count();

      if (data) {
        if (DBlength === data.length) {
          return console.log("DB record satisfied");
        }

        const d: Date = new Date();
        const countSeconds: number = d.setSeconds(d.getSeconds() + 50);

        for (let i = DBlength; i < data.length; i++) {
          await Photo.updateOne({ id: data[i].id }, data[i], { upsert: true });

          if (new Date(countSeconds).getSeconds() === new Date().getSeconds()) {
            console.log(
              `Stopping task @ ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
            );
            break;
          }
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};
