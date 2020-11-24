const express = require("express");
const urllib = require("urllib");
const router = express.Router();
const teamToIDs = {
  lakers: "1610612747",
  warriors: "1610612744",
  heat: "1610612748",
  suns: "1610612756",
};
const dreamTeam = [];
let players = [];
urllib.request("http://data.nba.net/10s/prod/v1/2018/players.json", function (error,response) {
  const data = JSON.parse(response);
  players = data.league.standard.map((p) => {
    return {
      firstName: p.firstName,
      lastName: p.lastName,
      jersey: p.jersey,
      pos: p.pos,
      isActive: p.isActive,
      teamId: p.teamId,
    }; });});

router.get("/teams/:teamName", function (request, response) {
  const teamId = teamToIDs[request.params.teamName];
  const teamPlayers = players.filter(p => p.teamId === teamId && p.isActive)
  response.send(teamPlayers)
});
router.get("/playerStats/:player", function (request, response) {
  const name = request.params.player.split(" ");
  urllib.request(
    `https://nba-players.herokuapp.com/players-stats/${name[1]}/${name[0]}`,
    function (err, response) {
      const data = JSON.parse(response);
      response.send(data);
    });});
router.put("/team", function (req, response) {
  const team = req.body;
  teamToIDs[team.teamName] = team.teamId;
  response.send("Done");
});
router.get("/dreamTeam", function ( response) {
  response.send(dreamTeam);
});
router.post("/roster", function (req, response) {
  let message = ""
  if(dreamTeam.length < 5){
    const playerName = req.body
    const player = players.find(p => playerName.firstName === p.firstName && playerName.lastName === p.lastName)
    if(dreamTeam.includes(player)){
      message = "This player is already in the Dream Team."
    }else{
      dreamTeam.push(player) }
    }else{
  message = "You already have Five players in the Team."
}
  response.send(message);
});
router.delete('/dreamTeam/:name', function(req, response){
  const playerName = req.params.name.split(" ")
  const i = dreamTeam.findIndex(p => playerName[0] === p.firstName && playerName[1] === p.lastName)
  dreamTeam.splice(i, 1)
  response.send(dreamTeam)
});
module.exports = router;
