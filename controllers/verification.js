module.exports = (req, res) => {
  const hubChallenge = req.query["hub.challenge"];

  const hubMode = req.query["hub.mode"];
  // verification string
  const verifyTokenMatches =
    req.query["hub.verify_token"] === "ploicebotdemo_verify";

  if (hubMode && verifyTokenMatches) {
    res.status(200).send(hubChallenge);
  } else {
    res.status(403).end();
  }
};
