import YahooFantasy from 'yahoo-fantasy';
const fs = require('fs');

export default async (req, res) => {
  const yf = new YahooFantasy(
    process.env.YAHOO_CLIENT_ID,
    process.env.YAHOO_CLIENT_SECRET
  );
  const {
    query: { leagueKey },
    body,
  } = req;

  if (!leagueKey) {
    return res.status(200).json({ error: 'leagueKey required' })
  }

  const accessTokenCookie = req.headers?.cookie
    .split('; ')
    .find((c) => c.startsWith('accessToken'));

  if (accessTokenCookie) {
    console.log('LOG: setting user token');
    yf.setUserToken(accessTokenCookie.split('=')[1]);
  }

  console.log(`BUILDING PLAYERS FILE - ${leagueKey}`);
  let total = 1200;
  let start = 0;
  let playersCollection = [];

  do {

    try {

      const playersRes = await yf.players.leagues(leagueKey, { start });
      const { err, data } = playersRes;

      // console.log('LOG: playersRes', playersRes);

      if (err) {
        throw new Error(`playersRes error: ${err}`)
      }

      let players = playersRes[0].players;
      players.forEach((player) => {
        //console.log(player)
        let hsUrl = player.headshot.url;
        let hsUrlx2;
        let splits = hsUrl.split('-/');
        if (splits && splits.length == 2) {
          hsUrlx2 = splits[1];
        }

        const playerObject = {
          player_key: player.player_key,
          // player_id: player.player_id,
          name: `${player.name.ascii_first} ${player.name.ascii_last}`,
          position: player.display_position,
          // team: player.editorial_team_full_name,
          team_abbrev: player.editorial_team_abbr,
          // headshot: hsUrl,
          // headshotx2: hsUrlx2,
        }

        playersCollection.push(playerObject);

      });

      start += 25;
      console.log('Total Players: ', playersCollection.length);

    } catch(error) {
      console.log('LOG: error in try/catch', error);
      return res.status(500);
    }

  } while (start <= total);

  /* const json_str = JSON.stringify(playersCollection);
  fs.writeFile(
    '/assets/player-data/players-' + leagueKey + '.json',
    json_str,
    function (err) {
      if (!err) {
        console.log('Players file saved!');
      } else {
        console.error(err);
      }
    }
  ); */

  return res.status(200).json(playersCollection);

};
