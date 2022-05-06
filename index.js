$(document).ready(function(){
  $("#startButton").click(function(){
    $("#myModal3").modal({backdrop: "static"});
  });
});

const accounts = {
  wojespn: "NBA",
  BillSimmons: "NBA",
  NBA: "NBA",
  ShamsCharania: "NBA",
  WorldWideWob:  "NBA",
  TheHoopCentral: "NBA",
  ESPNNBA: "NBA",
  NFL: "NFL",
  RapSheet: "NFL",
  MySportsUpdate: "NFL",
  FieldYates: "NFL",
  ESPNNFL: "NFL",
  brgridiron: "NFL",
  MLB: "MLB",
  JeffPassan: "MLB",
  MLBNetwork: "MLB",
  MLBONFOX: "MLB",
  BRWalkoff: "MLB",
  Buster_ESPN: "MLB",
  F1: "Formula1",
  wbuxtonofficial: "Formula1",
  ESPNF1: "Formula1",
  NCAAFootball: "NCAAF",
  KirkHerbstreit: "NCAAF",
  ESPNCFB: "NCAAF",
  CFBPlayoff: "NCAAF",
  B1Gfootball: "NCAAF",
  CBBonFOX: "NCAAB",
  JonRothstein: "NCAAB",
  MarchMadnessMBB: "NCAAB",
  B1GMBBall: "NCAAB",
  FabrizioRomano: "Soccer",
  ChampionsLeague: "Soccer",
  Matt_Law_DT: "Soccer",
  ESPNFC: "Soccer",
  SkyFootball: "Soccer",
  GolfChannel: "Golf",
  PGATOUR: "Golf",
  ForePlayPod: "Golf",
  GolfDigest: "Golf",
  TennisChannel: "Tennis",
  Wimbeldon: "Tennis",
  rolandgarros: "Tennis",
  usopen: "Tennis",
  AustralianOpen: "Tennis"
};

var categories = {
  NBA: [],
  NFL: [],
  MLB: [],
  Formula1: [],
  NCAAF: [],
  NCAAB: [],
  Soccer: [],
  Golf: [],
  Tennis: []
};

checkedCategories = {
  NBA: false,
  NFL: false,
  MLB: false,
  Formula1: false,
  NCAAF: false,
  NCAAB: false,
  Soccer: false,
  Golf: false,
  Tennis: false
}

function shuffleTweets(array) {
  const shuffledArray = array.sort((a, b) => 0.5 - Math.random());

  return shuffledArray;
  }
// console.log(Object.keys(checkedCategories));
//   console.log(document.getElementById("Soccer").checked);

function getTweets() {
  // console.log(document.getElementById("NBABox").checked);
  document.getElementById("startButton").style.display = "none";
  // document.getElementById("myModal3").style.display = "none";
  document.getElementById("twitterDisplay").style.display = 'inline';
  // document.getElementById("twitterDisplay").innerHTML = <blockquote class="twitter-tweet tw-align-center" data-lang="en" data-theme="dark"><p lang="en" dir="ltr">Hey TNT — feel free to spend a little more time covering the ongoing dysfunction on the Nuggets bench over the 20-point blowout.</p>&mdash; Bill Simmons (@BillSimmons) <a href="https://twitter.com/BillSimmons/status/1516270510518124546?ref_src=twsrc%5Etfw">April 19, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> ;
  // console.log(document.getElementById("Golf").checked);
  for(var key of Object.keys(checkedCategories)) {
    if(document.getElementById(key).checked) {
      checkedCategories[key] = true;
    }
  }


(function() {
    var cors_api_host = 'cors-anywhere.herokuapp.com';
    var cors_api_url = 'https://' + cors_api_host + '/';
    var slice = [].slice;
    var origin = window.location.protocol + '//' + window.location.host;
    var open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        var args = slice.call(arguments);
        var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
        if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
            targetOrigin[1] !== cors_api_host) {
            args[1] = cors_api_url + args[1];
        }
        return open.apply(this, args);
    };
})();

  Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vSNUlbnyQ-oeJUKsgZamTVt7Jz90ULaBKSDkEkMUdh8YaKW0eK0ecEvluET5Bcx6cjFpxLeKvaF56WD/pub?gid=0&single=true&output=csv", {
    download: true,
    header: true,
    complete: function(results) {
      // $('#tweet1').html(results.data[0]['HTML']);
      // $('#tweet2').html(results.data[1]['HTML']);
    for(var i = 0; i < results.data.length; i++) {
      var tempCat = accounts[results.data[i]['Author']];
      // console.log(tempCat);
      categories[tempCat] = categories[tempCat].concat(results.data[i]['HTML']);
    }
    var tweets = [];
    var script = '#tweet'
    for(var key of Object.keys(checkedCategories)) {
      if(checkedCategories[key]){
        tweets = tweets.concat(categories[key]);
      }
    }
    tweets = shuffleTweets(tweets);
    // console.log(tweets);
    for(var i = 0; i < 11; i++) {
      $(script + i).html(tweets[i]);
    }
    }
  });
}
