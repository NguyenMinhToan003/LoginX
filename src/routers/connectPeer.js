import express from 'express'
import https from "https";

const Router = express.Router()

Router.get('/get-ice-server', async (req, res) => {
  let data = JSON.stringify({ format: "urls" });

    let options = {
        host: "global.xirsys.net",
        path: "/_turn/peerjs",
        method: "PUT",
        headers: {
            "Authorization": "Basic " + Buffer.from("toan:86110474-fc1b-11ef-a393-0242ac130006").toString("base64"),
            "Content-Type": "application/json",
            "Content-Length": data.length
        }
    };

    let httpreq = https.request(options, (httpres) => {
        let str = "";
        httpres.on("data", (chunk) => { str += chunk; });
        httpres.on("end", () => { res.json(JSON.parse(str)); });
    });

    httpreq.on("error", (e) => res.status(500).json({ error: e.message }));
    httpreq.write(data);
    httpreq.end();
})

export const connectPeer = Router