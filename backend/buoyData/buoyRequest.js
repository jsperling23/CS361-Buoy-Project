const https = require('https')
const fs = require('node:fs')

async function buoyRequest(stationId) {
    //function calls the NOAA buoy and returns a text file stored as a string within
    //The variable data. It is returned as a promise.
    return new Promise((resolve, reject) => {
        url = `https://www.ndbc.noaa.gov/data/realtime2/${stationId}.txt`
        let data = ''
        let arr
        let buoyJson = {}

        //the actual request and resolve if the request is successful
        const request = https.request(url, (response) => {
            response.on('data', (chunk) => {
                data += chunk.toString('utf-8');
                fs.writeFileSync('downloaded_file.txt', data)
                arr = fs.readFileSync('downloaded_file.txt', 'utf-8').split('\n').slice(0, 3)
            });

            response.on('end', () => {
                resolve(arr);
            });
        
        //error handling 
        });
        request.on('error', (error) => {
            reject(`The following error occurred: ${error}`);
        });
        request.end()
    })       
}


function buoyToJson(arr, dict) {
    let first = arr[0].split(' ').filter(value => value !== '');
    let third = arr[2].split(' ').filter(value => value !== '');
    for (let i = 0; i < first.length; i++) {
        if (first[i] in dict) {
            dict[first[i]] = third[i]
        }
    }
    return dict
}

let dict = {WDIR: null,
    WSPD: null,
    DPD: null,
    MWD: null,
    WTMP: null}

buoyRequest(46237)
    .then((response => {
        buoyToJson(response, dict)
    }))
    .catch((error) => {
        console.error(error)
    })

module.exports = { buoyRequest, buoyToJson }


