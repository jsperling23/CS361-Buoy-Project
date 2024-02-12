import { buoyRequest } from "./buoyData/buoyRequest.js";
import { buoyToJson } from "./buoyData/buoyRequest.js";
import express from 'express';
import cors from 'cors';

const app = express();
const port = 5000;


app.use(cors())

app.get('/download', (req, res) => {
    const filepath = '/Users/joseph/Desktop/OSU_Post-Bacc/CS361/Sprint_1/backend/downloaded_file.txt'
    res.sendFile(filepath, (err) => {
        if (err) {
            console.log(err)
            res.status(500).send('Internal Service Error')
        }
        })
})

app.get('/request', (req, res) => {
    const stationId = req.query.stationId;
    console.log(stationId)
    let dict = {WDIR: null,
    WSPD: null,
    DPD: null,
    MWD: null,
    WTMP: null,
    WVHT: null
}
    let data
    buoyRequest(stationId)
    .then((response => {
        data = buoyToJson(response, dict)
        console.log("sending message: ", JSON.stringify(data))
        res.send(JSON.stringify(data))
    }))
    .catch((error) => {
        console.error(error)
    })
});





app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

