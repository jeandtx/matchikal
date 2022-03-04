const axios = require('axios');

async function ret() {
    const data = await axios.get('http://localhost:3000/tracks')
    for (let i = 0; i < data.data.length; i++) {
        console.log(data.data[i].track.name)
        console.log(data.data[i].track.id)
    }
}

ret()