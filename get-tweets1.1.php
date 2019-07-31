<?php
session_start();
require_once("twitteroauth/twitteroauth/twitteroauth.php"); //Path to twitteroauth library
 
$twitteruser = "lequilife";
$notweets = 5;
$consumerkey = "7elViOyVEW1HBY2k9eEOsvDX2";
$consumersecret = "W1dh5ApCTM65RgYNqPGoJrbUlsy5IrvC0G2bKBYNe8bpnqPytu";
$accesstoken = "905427070574088193-lp2X65aYZbvxAOnMULGqDqIgZGdA3mH";
$accesstokensecret = "jDhiZe4M6cHDCiwalbr2ViFPI8f4n4ySo50D9F17urSsX";
 
function getConnectionWithAccessToken($cons_key, $cons_secret, $oauth_token, $oauth_token_secret) {
  $connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_token_secret);
  return $connection;
}
 
$connection = getConnectionWithAccessToken($consumerkey, $consumersecret, $accesstoken, $accesstokensecret);
 
$tweets = $connection->get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=".$twitteruser."&count=".$notweets);
 
echo json_encode($tweets);
?>