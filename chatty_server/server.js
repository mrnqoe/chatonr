// server.js
const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Array of messages
const Data_Arr = {
  activity: [],
  usersOn: {count: 0}
};

// Broadcasting like Fox Networks yo
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
      console.log("data is broadcasted");
    }
  });
};
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  Data_Arr.usersOn.count = wss.clients.size;
  wss.clients.forEach((client) => {
    Data_Arr.activity.forEach((a) => {
      client.send(JSON.stringify(a));
    });
  });
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(Data_Arr.usersOn));
  })
  ws.send(JSON.stringify({name: useRandom(), color: color()}))

  // Callback on activity item reception
  ws.onmessage = function (event) {
    const data = JSON.parse(event.data);
    var data_in = {};
    switch (data.type){
      case "notification":
        data_in = buildNoti(data.body);
      break;
      case "message":
        data_in = buildMess(data.body);
      break;
      default:
        console.log(data_in);
        console.log(data_in.type);
        console.log('undefined data');
    }
    Data_Arr.activity.push(data_in);
    let data_out = JSON.stringify(data_in);
    wss.clients.forEach(function each(client) {
      // console.log(data_out);
      client.send(data_out);
    });
  }
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    // ws.send(JSON.stringify({usersOn: Data_Arr.usersOn}));
  });
});


// Build message object
function buildMess (mess) {
  let instanTime = new Date();
  let id = uuid.v4();
  var message = {
    type: "message",
    mess_id: id,
    mess_txt: mess.content,
    mess_color: mess.color,
    mess_usr: mess.username,
    mess_create_time: instanTime
  }
  // console.log(message);
  return message;
}

function buildNoti (noti) {
  let instanTime = new Date();
  let id = uuid.v4();
  var notification = {
    type: "notification",
    noti_id: id,
    noti_usr: noti.old_usr,
    noti_new_usr: noti.usr,
    noti_time: instanTime
  }
  console.log(notification);
  return notification;
}

function color(){
  var hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
  return hue;
}

function useRandom(){
  var adjectives = ["adamant", "adroit", "amatory", "animistic", "antic", "arcadian", "baleful", "bellicose", "bilious", "boorish", "calamitous", "caustic", "cerulean", "comely", "concomitant", "contumacious", "corpulent", "crapulous", "defamatory", "didactic", "dilatory", "dowdy", "efficacious", "effulgent", "egregious", "endemic", "equanimous", "execrable", "fastidious", "feckless", "fecund", "friable", "fulsome", "garrulous", "guileless", "gustatory", "heuristic", "histrionic", "hubristic", "incendiary", "insidious", "insolent", "intransigent", "inveterate", "invidious", "irksome", "jejune", "jocular", "judicious", "lachrymose", "limpid", "loquacious", "luminous", "mannered", "mendacious", "meretricious", "minatory", "mordant", "munificent", "nefarious", "noxious", "obtuse", "parsimonious", "pendulous", "pernicious", "pervasive", "petulant", "platitudinous", "precipitate", "propitious", "puckish", "querulous", "quiescent", "rebarbative", "recalcitant", "redolent", "rhadamanthine", "risible", "ruminative", "sagacious", "salubrious", "sartorial", "sclerotic", "serpentine", "spasmodic", "strident", "taciturn", "tenacious", "tremulous", "trenchant", "turbulent", "turgid", "ubiquitous", "uxorious", "verdant", "voluble", "voracious", "wheedling", "withering", "zealous"];
  var nouns = ["ninja", "chair", "pancake", "statue", "unicorn", "rainbows", "laser", "senor", "bunny", "captain", "nibblets", "cupcake", "carrot", "gnomes", "glitter", "potato", "salad", "toejam", "curtains", "beets", "toilet", "exorcism", "stick figures", "mermaid eggs", "sea barnacles", "dragons", "jellybeans", "snakes", "dolls", "bushes", "cookies", "apples", "ice cream", "ukulele", "kazoo", "banjo", "opera singer", "circus", "trampoline", "carousel", "carnival", "locomotive", "hot air balloon", "praying mantis", "animator", "artisan", "artist", "colorist", "inker", "coppersmith", "director", "designer", "flatter", "stylist", "leadman", "limner", "make-up artist", "model", "musician", "penciller", "producer", "scenographer", "set decorator", "silversmith", "teacher", "auto mechanic", "beader", "bobbin boy", "clerk of the chapel", "filling station attendant", "foreman", "maintenance engineering", "mechanic", "miller", "moldmaker", "panel beater", "patternmaker", "plant operator", "plumber", "sawfiler", "shop foreman", "soaper", "stationary engineer", "wheelwright", "woodworkers"];
  let firstname_i = Math.floor(Math.random() * nouns.length);
  let lastname_i = Math.floor(Math.random() * adjectives.length);
  let username = nouns[firstname_i].concat(' ', adjectives[lastname_i])
  return username;
}
