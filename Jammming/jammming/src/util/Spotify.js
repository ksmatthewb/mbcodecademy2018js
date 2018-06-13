const spotifyClientId="7d197c266f6e4da9944df9fc84787bce";
let userAccessToken;
const authEndpoint='https://accounts.spotify.com/authorize';
// const redirectUri = 'http://bunit.surge.sh';
const redirectUri = 'http://localhost:3000/';
const Spotify = {
    getAccessToken() {
        if (userAccessToken) {

          return userAccessToken;

        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);

        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {

          userAccessToken = accessTokenMatch[1];

          const expiresIn = Number(expiresInMatch[1]);

          window.setTimeout(() => userAccessToken = '', expiresIn * 1000);

          window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.

          return userAccessToken;

        } else {

          const accessUrl = `${authEndpoint}?client_id=${spotifyClientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;

          window.location = accessUrl;

        }

      },

      savePlaylist(playlistName, trackUris) {
    if (playlistName && trackUris) {
      // console.log("in savePlaylist");
        userAccessToken= this.getAccessToken();
        let headers = { Authorization: `Bearer ${userAccessToken}` };
        let userId= "";
        let playlistId;
        /*
         GET USER ID
          */
        return fetch(`https://api.spotify.com/v1/me`, {
            headers:  headers }).then(response => {
              return response.json();
            }).then(jsonResponse => {
              if (jsonResponse){
                 userId=jsonResponse.id;
                 // console.log("userId:"+userId);
                /*
                CREATE PLAYLIST, GET ID
                */
                 return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                  headers:  { Authorization: `Bearer ${userAccessToken}`,
                  "Content-Type": "application/json"

                 },
                  method: "POST",
                  body: JSON.stringify({ name: [playlistName[0]]})
                }).then(response => {
                    return response.json();
                  }).then(jsonResp => {
                    if (jsonResp){
                      playlistId=jsonResp.id
                      /*
                      CREATE PLAYLIST, SET TRACKS, GET ID
                      */
                     return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                      headers:  headers,
                      method: "POST",
                      body: JSON.stringify({ uris: [trackUris[0].uri]  })
                  }).then(r => {
                      console.log(r)
                      return r.json();
                    })
                    .then(re => {console.log(re)
                      return re;
                    }).catch(e => {console.log(e)})

                    }
                });
              }
          });



    }
    return;

},

  search(term){
      if (!userAccessToken) {
        userAccessToken = this.getAccessToken();
        // console.log(userAccessToken);
      }
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${userAccessToken}`}
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        if (jsonResponse.tracks.items){
          return jsonResponse.tracks.items.map(track => {
            return {
              id:track.id,
              name:track.name,
              artist:track.artists[0].name,
              album:track.album.name,
              uri:track.uri
            };
          })
        }
    });
  }

}
export default Spotify;
