const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
// https://github.com/thelinmichael/spotify-web-api-node
const axios = require('axios')

const url = 'http://localhost:3000';
const token = "BQBzdQ5yXyv7G2ntWoEt5iiMxXBsbbncFD9oumHO74V4E7S6rH3eT0D6d97oTbd4p2Y7SIAuxILHqU_YR_TH5ZLFZEue8McWyjVA5PBiJOoEKXe83WD1slpwuxEbfQzuG7JfuA6ac9LzYHM72Y7zLe3YFv__tO613ajjWUt6UVauYTx2k9dIU4HyGOJ7Q9X5Uuq32y7yjmqb5n_8-1ZcCdzxAhEIloEKtmaHEGZBp3ssYdWfJA8VslNtpr83eT28xLKAy9EzYc8Mt-SqFdPTZXYVHA";

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

//GET MY PROFILE
function getMyData() {
    (async () => {
        getUser();
        // getUserPlaylists(me.body.id);
        getUserTracks();
    })().catch(e => {
        console.error(e);
    });
}

// GET MY USER
async function getUser() {
    const me = await spotifyApi.getMe()

    axios({
        method: 'post',
        url: url + '/me',
        data: me.body
    }).then(data => console.log(data))
        .catch(err => console.log(err))
}

// GET MY TRACKS
async function getUserTracks() {
    const data = await spotifyApi.getMySavedTracks()
    axios({
        method: 'post',
        url: url + '/tracks',
        data: data.body.items
    }).then(data => console.log(data))
        .catch(err => console.log(err))
}

//GET MY PLAYLISTS
// async function getUserPlaylists(userName) {
//     const data = await spotifyApi.getUserPlaylists(userName)

//     console.log("---------------+++++++++++++++++++++++++")
//     let playlists = []

//     for (let playlist of data.body.items) {
//         console.log(playlist.name + " " + playlist.id)

//         let tracks = await getPlaylistTracks(playlist.id, playlist.name);
//         // console.log(tracks);

//         const tracksJSON = { tracks }
//         let data = JSON.stringify(tracksJSON);
//         fs.writeFileSync(playlist.name + '.json', data);
//     }
// }

//GET SONGS FROM PLAYLIST
// async function getPlaylistTracks(playlistId, playlistName) {

//     const data = await spotifyApi.getPlaylistTracks(playlistId, {
//         offset: 1,
//         limit: 100,
//         fields: 'items'
//     })

//     // console.log('The playlist contains these tracks', data.body);
//     // console.log('The playlist contains these tracks: ', data.body.items[0].track);
//     // console.log("'" + playlistName + "'" + ' contains these tracks:');
//     let tracks = [];

//     for (let track_obj of data.body.items) {
//         const track = track_obj.track
//         tracks.push(track);
//         console.log(track.name + " : " + track.artists[0].name)
//     }

//     console.log("---------------+++++++++++++++++++++++++")
//     return tracks;
// }

getMyData();