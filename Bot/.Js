var Countrybot = {};
var total = API.getDJ().djPoints + API.getDJ().listenerPoints + API.getDJ().curatorPoints;
var ruleSkip = {};
Countrybot.misc = {};
Countrybot.settings = {};
Countrybot.moderators = {};
Countrybot.filters = {};
botMethods = {};
Countrybot.pubVars = {};
 
toSave = {};
toSave.settings = Countrybot.settings;
toSave.moderators = Countrybot.moderators;
 
Countrybot.misc.version = "1.0.7";
Countrybot.misc.origin = "This bot was created by Rogie & Neon alone, and it is copyrighted!";
Countrybot.misc.ready = true;
Countrybot.misc.lockSkipping = false;
Countrybot.misc.lockSkipped = "0";
Countrybot.misc.tacos = new Array();
 
 
joined = new Date().getTime();
 
cancel = false;
 
Countrybot.filters.swearWords = new Array();
Countrybot.filters.commandWords = new Array();
Countrybot.filters.racistWords = new Array();
Countrybot.filters.beggerWords = new Array();
 
Countrybot.settings.maxLength = 10; //minutes
Countrybot.settings.cooldown = 10; //seconds
Countrybot.settings.staffMeansAccess = true;
Countrybot.settings.historyFilter = true;
Countrybot.settings.swearFilter = true;
Countrybot.settings.commandFilter = true;
Countrybot.settings.racismFilter = true;
Countrybot.settings.beggerFilter = true;
Countrybot.settings.interactive = true;
Countrybot.settings.ruleSkip = true;
Countrybot.settings.removedFilter = true;
 
//Admins                [Dj-Neon-TFL]
Countrybot.admins = ["50aeaeb6c3b97a2cb4c25bd2"];
 
Countrybot.filters.beggerWords = ["fanme","fan me","fan4fan","fan 4 fan","fan pls","fans please","need fan","more fan","fan back","give me fans","gimme fans"];
 
//fun commands misc below
 
Countrybot.misc.tacos = ["blunt","kush","Chemo","Locoweed","marijuana","Ganja"];
 
Countrybot.misc.cookie = ["a chocolate chip cookie", "a sugar cookie", "an oatmeal raisin cookie", "a 'special' brownie", "an animal cracker", "a scooby snack", "a blueberry muffin", "a cupcake"];
 
Countrybot.misc.ball = [
" It is certain",
" It is decidedly so",
" Without a doubt",
" Yes definitely",
" You may rely on it",
" As I see it yes",
" Most likely",
" Outlook good",
" Yes",
" Signs point to yes :trollface:",
" Reply hazy try again",
" Ask again later",
" Better not tell you now",
" Cannot predict now",
" Concentrate and ask again",
" Don't count on it",
" My reply is no",
" My sources say no",
" Outlook not so good",
" Very doubtful"];
 
Countrybot.misc.ht = ["My magic coins says: Tails", "My magic coin says: Heads"];
 
Countrybot.misc.catfact = [
        "Cats have five toes on each front paw, but only four toes on each back paw.","Cats have true fur, in that they have both an undercoat and an outer coat.",
        "Newborn kittens have closed ear canals that don''t begin to open for nine days.When the eyes open, they are always blue at first. They change color over a period of months to the final eye color.",
        "Most cats have no eyelashes.","A cat cannot see directly under its nose.",
        "You can tell a cat's mood by looking into its eyes. A frightened or excited cat will have large, round pupils. An angry cat will have narrow pupils. The pupil size is related as much to the cat's emotions as to the degree of light.",
        "It is a common belief that cats are color blind. However, recent studies have shown that cats can see blue, green and red.",
        "A cat can jump even seven times as high as it is tall.",
        "The cat's footpads absorb the shocks of the landing when the cat jumps.",
        "A cat is pregnant for about 58-65 days.",
        "When well treated, a cat can live twenty or more years but the average life span of a domestic cat is 14 years.",
        "Neutering a cat extends its life span by two or three years.",
        "Cats can't taste sweets.",
        "Cats must have fat in their diet because they can't produce it on their own.",
        "Some common houseplants poisonous to cats include: English Ivy, iris, mistletoe, philodendron, and yew.",
        "Tylenol and chocolate are both poisonous to cats.",
        "Many cats cannot properly digest cow's milk.",
        "The average cat food meal is the equivalent to about five mice.",
        "Cats have AB blood groups just like people.",
        "The color of the points in Siamese cats is heat related. Cool areas are darker.",
        "The chlorine in fresh tap water irritates sensitive parts of the cat's nose. Let tap water sit for 24 hours before giving it to a cat.",
        "Today there are about 100 distinct breeds of the domestic cat.",
        "The first cat show was in 1871 at the Crystal Palace in London.",
        "In ancient Egypt, mummies were made of cats, and embalmed mice were placed with them in their tombs. In one ancient city, over 300,000 cat mummies were found.",
        "In ancient Egypt, killing a cat was a crime punishable by death.",
        "The ancestor of all domestic cats is the African Wild Cat which still exists today.",
        "Cats do not think that they are little people. They think that we are big cats. This influences their behavior in many ways.",
        "Abraham Lincoln loved cats. He had four of them while he lived in the White House.",
        "Julius Caesar, Henri II, Charles XI, and Napoleon were all afraid of cats.",
        "Cats have an average of 24 whiskers, arranged in four horizontal rows on each side.",
        "Almost 10% of a cat's bones are in its tail, and the tail is used to maintain balance.",
        "Jaguars are the only big cats that don't roar.",
        "A cat's field of vision is about 185 degrees.",
        "The Maine Coon is 4 to 5 times larger than the Cingapura, the smallest breed of cat.",
        "Retractable claws are a physical phenomenon that sets cats apart from the rest of the animal kingdom. In the cat family, only cheetahs cannot retract their claws.",
        "A cat can sprint at about thirty-one miles per hour.",
        "A cat can spend five or more hours a day grooming themselves.",
        "The cat has been living in close association with humans for somewhere between 3,500 and 8,000 years.",
        "The domestic house cat is a small carnivorous mammal. Its most immediate ancestor is believed to be the African wild cat.",
        "Cats usually weigh between 2.5 and 7 kg (5.5–16 pounds), although some breeds can exceed 11.3 kg (25 pounds).",
        "Domestic cats tend to live longer if they are not permitted to go outdoors.",
        "Cats, in some cases, can sleep as much as 20 hours in a 24-hour period. The term cat nap refers to the cat's ability to fall asleep (lightly) for a brief period.",
        "Cats dislike citrus scent.",
        "A cat''s tongue has tiny barbs on it.",
        "Cats can be right-pawed or left-pawed.",
        "It has been scientifically proven that stroking a cat can lower one's blood pressure.",
        "Six-toed kittens are so common in Boston and surrounding areas of Massachusetts that experts consider it an established mutation.",
        "Cat families usually play best in even numbers. Cats and kittens should be acquired in pairs whenever possible."];
 
Countrybot.misc.dogfact = [
        "Three dogs (from First Class cabins!) survived the sinking of the Titanic – two Pomeranians and one Pekingese.",
        "It’s rumored that, at the end of the Beatles song, “A Day in the Life,” Paul McCartney recorded an ultrasonic whistle, audible only to dogs, just for his Shetland sheepdog.",
        "Puppies have 28 teeth and normal adult dogs have 42.",
        "Dogs chase their tails for a variety of reasons: curiosity, exercise, anxiety, predatory instinct or, they might have fleas! If your dog is chasing his tail excessively, talk with your vet.",
        "Dalmatian puppies are pure white when they are born and develop their spots as they grow older.",
        "Dogs and humans have the same type of slow wave sleep (SWS) and rapid eye movement (REM) and during this REM stage dogs can dream. The twitching and paw movements that occur during their sleep are signs that your pet is dreaming",
        "Dogs’ eyes contain a special membrane, called the tapetum lucidum, which allows them to see in the dark.",
        "A large breed dog’s resting heart beats between 60 and 100 times per minute, and a small dog breed’s heart beats between 100-140. Comparatively, a resting human heart beats 60-100 times per minute.",
        "According to a Petside.com - Press poll, 72% of dog owners believe their dog can detect when stormy weather is on the way.",
        "A dog’s normal temperature is between 101 and 102.5 degrees Fahrenheit.",
        "Unlike humans who sweat everywhere, dogs only sweat through the pads of their feet.",
        "Dogs have three eyelids, an upper lid, a lower lid and the third lid, called a nictitating membrane or “haw,” which helps keep the eye moist and protected.",
        "Americans love dogs! 62% of U.S. households own a pet, which equates to 72.9 million homes",
        "45% of dogs sleep in their owner’s bed (we’re pretty sure a large percentage also hogs the blankets!)",
        "Why are dogs’ noses so wet? Dogs’ noses secrete a thin layer of mucous that helps them absorb scent. They then lick their noses to sample the scent through their mouth.",
        "Dogs have about 1,700 taste buds. Humans have approximately 9,000 and cats have around 473.",
        "A Dog’s sense of smell is 10,000 – 100,000 times more acute as that of humans.",
        "It’s a myth that dogs only see in black and white. In fact, it’s believed that dogs see primarily in blue, greenish-yellow, yellow and various shades of gray.",
        "Sound frequency is measured in Hertz (Hz). The higher the Hertz, the higher-pitched the sound. Dogs hear best at 8,000 Hz, while humans hear best at around 2,000 Hz.",
        "Dogs’ ears are extremely expressive. It’s no wonder! There are more than a dozen separate muscles that control a dog’s ear movements.",
        "While the Chow Chow dogs are well known for their distinctive blue-black tongues, they’re actually born with pink tongues. They turn blue-black at 8-10 weeks of age.",
        "When dogs kick after going to the bathroom, they are using the scent glands on their paws to further mark their territory.",
        "Dogs curl up in a ball when they sleep due to an age-old instinct to keep themselves warm and protect their abdomen and vital organs from predators.",
        "Dogs are capable of understanding up to 250 words and gestures, can count up to five and can perform simple mathematical calculations. The average dog is as intelligent as a two-year-old child.",
        "Some stray Russian dogs have figured out how to use the subway system in order to travel to more populated areas in search of food.",
        "Dogs don’t enjoy being hugged as much as humans and other primates.",
        "Two stray dogs in Afghanistan saved 50 American soliders. A Facebook group raised $21,000 to bring the dogs back to the US and reunite them with the soldiers.",
        "Service dogs are trained to know when they are on duty. When their harness is on, they know it’s business time. When you take it off, the pups immediately become playful and energetic.",
        "Tiger Woods stuttered as a child and used to talk to his dog until he fell asleep in an effort to get rid of it.",
        "Seeing eye dogs pee and poo on command so that their owners can clean up after them."];
 
Countrybot.misc.fortune = [
" There is a true and sincere friendship between you and your friends.",
" You find beauty in ordinary things, do not lose this ability.",
" Ideas are like children; there are none so wonderful as your own.",
" It takes more than good memory to have good memories.",
" A thrilling time is in your immediate future.",
" Plan for many pleasures ahead.",
" The joyfulness of a man prolongeth his days.",
" Your everlasting patience will be rewarded sooner or later.",
" Make two grins grow where there was only a grouch before.",
" Something you lost will soon turn up.",
" Your heart is pure, and your mind clear, and your soul devout.",
" Excitement and intrigue follow you closely wherever you go!",
" A pleasant surprise is in store for you.",
" May life throw you a pleasant curve.",
" As the purse is emptied the heart is filled.",
" Be mischievous and you will not be lonesome.",
" You have a deep appreciation of the arts and music.",
" Your flair for the creative takes an important place in your life.",
" Your artistic talents win the approval and applause of others.",
" Pray for what you want, but work for the things you need.",
" Your many hidden talents will become obvious to those around you.",
" Don't forget, you are always on our minds.",
" Don't forget, you are always on our minds.",
" Your greatest fortune is the large number of friends you have.",
" A firm friendship will prove the foundation on your success in life.",
" Don't ask, don't say. Everything lies in silence.",
" Look for new outlets for your own creative abilities.",
" Be prepared to accept a wondrous opportunity in the days ahead!",
" Fame, riches and romance are yours for the asking.",
" Good luck is the result of good planning.",
" Good things are being said about you.",
" Smiling often can make you look and feel younger.",
" Someone is speaking well of you.",
" The time is right to make new friends.",
" You will inherit some money or a small piece of land.",
" Your life will be happy and peaceful.",
" A friend is a present you give yourself.",
" A member of your family will soon do something that will make you proud.",
" A quiet evening with friends is the best tonic for a long day.",
" A single kind word will keep one warm for years.",
" Anger begins with folly, and ends with regret.",
" Generosity and perfection are your everlasting goals.",
" Happy news is on its way to you.",
" He who laughs at himself never runs out of things to laugh at.",
" If your desires are not extravagant they will be granted.",
" Let there be magic in your smile and firmness in your handshake.",
" If you want the rainbow, you must to put up with the rain. D. Parton",
" Nature, time and patience are the three best physicians.",
" Strong and bitter words indicate a weak cause.",
" The beginning of wisdom is to desire it.",
" You will have a very pleasant experience.",
" You will inherit some money or a small piece of land.",
" You will live a long, happy life.",
" You will spend old age in comfort and material wealth.",
" You will step on the soil of many countries.",
" You will take a chance in something in the near future.",
" You will witness a special ceremony.",
" Your everlasting patience will be rewarded sooner or later.",
" Your great attention to detail is both a blessing and a curse.",
" Your heart is a place to draw true happiness.",
" Your ability to juggle many tasks will take you far.",
" A friend asks only for your time, not your money.",
" You will be invited to an exciting event."];
 
 
Countrybot.pubVars.skipOnExceed;
Countrybot.pubVars.command = false;
 
Array.prototype.remove=function(){var c,f=arguments,d=f.length,e;while(d&&this.length){c=f[--d];while((e=this.indexOf(c))!==-1){this.splice(e,1)}}return this};
 
API.on(API.DJ_ADVANCE, djAdvanceEvent);
 
API.on(API.USER_JOIN, Joined);
function Joined(user) {
  API.sendChat("/me : @"+ user.username + " has joined the Room!");
}
 
API.on(API.DJ_ADVANCE, DJ);
function DJ(obj) {
  if (obj == null) return; // no dj
  var str = "";
  var currentDJ = obj.dj;
  str += currentDJ.username;
  str += " Is now playing: " + obj.media.author + " - " + obj.media.title;
  API.sendChat(str);
}
 
function djAdvanceEvent(data){
    setTimeout(function(){ botMethods.djAdvanceEvent(data); }, 500);
}
 
botMethods.skip = function(){
    setTimeout(function(){
        if(!cancel) API.moderateForceSkip();
    }, 3500);
};
 
botMethods.load = function(){
    toSave = JSON.parse(localStorage.getItem("CountrybotSave"));
    Countrybot.settings = toSave.settings;
    ruleSkip = toSave.ruleSkip;
};
 
botMethods.save = function(){localStorage.setItem("CountrybotSave", JSON.stringify(toSave))};
 
botMethods.loadStorage = function(){
    if(localStorage.getItem("mubBotSave") !== null){
        botMethods.load();
    }else{
        botMethods.save();
    }
};
 
botMethods.checkHistory = function(){
    currentlyPlaying = API.getMedia(), history = API.getHistory();
    caught = 0;
    for(var i = 0; i < history.length; i++){
        if(currentlyPlaying.cid === history[i].media.cid){
            caught++;
        }
    }
    caught--;
    return caught;
};
 
botMethods.getID = function(username){
    var users = API.getUsers();
    var result = "";
    for(var i = 0; i < users.length; i++){
        if(users[i].username === username){
            result = users[i].id;
            return result;
        }
    }
 
    return "notFound";
};
 
botMethods.cleanString = function(string){
    return string.replace(/&#39;/g, "'").replace(/&amp;/g, "&").replace(/&#34;/g, "\"").replace(/&#59;/g, ";").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
};
        API.on(API.CHAT, function(data){
        if(data.message.indexOf('.') === 0){
            var msg = data.message, from = data.from, fromID = data.fromID;
            var command = msg.substring(1).split(' ');
            if(typeof command[2] != "undefined"){
                for(var i = 2; i<command.length; i++){
                    command[1] = command[1] + ' ' + command[i];
                }
            }
            if(Countrybot.misc.ready || Countrybot.admins.indexOf(fromID) > -1 || API.getUser(data.fromID).permission > 1){
                switch(command[0].toLowerCase()){
 
                case "commands":
                        if(API.getUser(fromID).permission < 2 || Countrybot.admins.indexOf(fromID) > -1){
                        if(typeof command[1] === "undefined"){
                           API.sendChat(".{command} mention is included");
                        setTimeout(function(){
                           API.sendChat("cookie | flipcoin | catfact | dogfact | hug | weed | 8ball | fortune | roomhelp | whywoot | whywoot | props | votes | woot | meh | say");
                        }, 650);
                        }
                    }
                        break;
 
                case "test":
                        if(Countrybot.admins.indexOf(fromID) > -1){
                            API.sendChat("@"+ data.from +" Test Successful");
                            }else{
                            API.sendChat("This command requires Admins only!");
                        }
                        break;
 
                case "say":
                    if(API.getUser(fromID).permission > 1 || Countrybot.admins.indexOf(fromID) > -1){
                        if(typeof command[1] === "undefined"){
                            }else{
                            API.sendChat(command[1]);
                        }
                    }
                        break;
 
                case "props":
                        if(Countrybot.admins.indexOf(fromID) > -1 || API.getUser(fromID).permission < 2){
                        if(typeof command[1] === "undefined"){
                           API.sendChat("@"+ data.from +" just gave props to @"+ API.getDJ().username +" for playing a dope track!");
                        }
                    }
                        break;
 
 
                case "currentdj":
                        if(Countrybot.admins.indexOf(fromID) > -1 || API.getUser(fromID).permission < 2){
                        if(typeof command[1] === "undefined"){
                          API.sendChat("DJ: "+ API.getDJ().username +" Points: "+ total +" Fans: "+API.getDJ().fans);
                        }
                    }
                        break;
 
                case "whoami":
                        if(typeof command[1] === "undefined"){
                           API.sendChat("Username: "+ data.from +" ID: "+ data.fromID);
                        }
                        break;
                    
                case "rules":
                        if(typeof command[1] === "undefined"){
                           API.sendChat("Have some fun. Leave the drama at the door. Keep it somewhat family friendly. Staff has final say.");
                        }
                        break;
                        
               case "themes":
                        if(typeof command[1] === "undefined"){
                           API.sendChat("Country, Southern Rock, and Folk.");
                        }
                        break;
 
                case "woot":
                        if(API.getUser(fromID).permission > 1 || Countrybot.admins.indexOf(fromID) > -1){
                        if(typeof command[1] === "undefined"){
                           API.sendChat("One woot coming up!");
                        setTimeout(function(){
                           document.getElementById("woot").click()
                        }, 650);
                        }else {
                           API.sendChat("This command requires bouncer +");
                        }
                    }
                        break;
 
                case "meh":
                        if(API.getUser(fromID).permission > 1 || Countrybot.admins.indexOf(fromID) > -1){
                        if(typeof command[1] === "undefined"){
                           API.sendChat("Bummer, A meh has been requested!!");
                        setTimeout(function(){
                           document.getElementById("meh").click()
                        }, 650);
                        }else {
                           API.sendChat("This command requires bouncer +");
                        }
                    }
                        break;
 
                case "join":
                        if(API.getUser(fromID).permission > 1 || Countrybot.admins.indexOf(fromID) > -1){
                        if(typeof command[1] === "undefined"){
                            API.djJoin();
                        }
                    }
                        break;
 
                case "leave":
                        if(API.getUser(fromID).permission > 1 || Countrybot.admins.indexOf(fromID) > -1){
                        if(typeof command[1] === "undefined"){
                            API.djLeave();
                        }
                    }
                        break;
 
                case "votes":
                        API.sendChat("Users vote:  :+1: " + API.getRoomScore().positive + " | :-1: " + API.getRoomScore().negative + " | :purple_heart: " + API.getRoomScore().curates);
                        if(API.getUser(fromID).permission < 2 || Countrybot.admins.indexOf(fromID) > -1){
                            Countrybot.misc.ready = false;
                            setTimeout(function(){ Countrybot.misc.ready = true; }, Countrybot.settings.cooldown * 1000);
                        }
                        break;
 
                case "whywoot":
                        if(typeof command[1] == "undefined"){
                            API.sendChat("Plug gives you 1 point for wooting the current song if you don't like the song i suggest you remain neutral");
                        }else if(command[1].indexOf("@") > -1){
                            API.sendChat(command[1]+" Plug gives you 1 point for wooting the current song if you don't like the song i suggest you remain neutral");
                        }else{
                            API.sendChat("Plug gives you 1 point for wooting the current song if you don't like the song i suggest you remain neutral");
                        }
                        if(Countrybot.admins.indexOf(fromID) > -1 || API.getUser(fromID).permission < 2){
                            Countrybot.misc.ready = false;
                            setTimeout(function(){ Countrybot.misc.ready = true; }, Countrybot.settings.cooldown * 1000);
                        }
                        break;
 
               case "whymeh":
                        if(typeof command[1] == "undefined"){
                            API.sendChat("Reserve Mehs for songs that are a) extremely overplayed b) off genre c) absolutely god awful or d) troll songs. ");
                        }else if(command[1].indexOf("@") > -1){
                            API.sendChat(command[1]+" Reserve Mehs for songs that are a) extremely overplayed b) off genre c) absolutely god awful or d) troll songs. ");
                        }else{
                            API.sendChat("Reserve Mehs for songs that are a) extremely overplayed b) off genre c) absolutely god awful or d) troll songs. ");
                        }
                        if(Countrybot.admins.indexOf(fromID) > -1 || API.getUser(fromID).permission < 2){
                            Countrybot.misc.ready = false;
                            setTimeout(function(){ Countrybot.misc.ready = true; }, Countrybot.settings.cooldown * 1000);
                        }
                        break;
 
               case "roomhelp":
                        if(typeof command[1] == "undefined"){
                            API.sendChat("Welcome to The Country Club! Create a playlist and populate it with songs from either YouTube or Soundcloud. Click the 'Join Waitlist' button and wait your turn to play music.");
                                setTimeout(function(){
                            API.sendChat("Ask a mod if you're unsure about your song choice.");
                         }, 650);
                        }else if(command[1].indexOf("@") > -1){
                            API.sendChat(command[1]+ "Welcome to The Country Club! Create a playlist and populate it with songs from either YouTube or Soundcloud. Click the 'Join Waitlist' button and wait your turn to play music.");
                                setTimeout(function(){
                            API.sendChat("Ask a mod if you're unsure about your song choice.");
                         }, 650);
                        }
                        if(Countrybot.admins.indexOf(fromID) > -1 || API.getUser(fromID).permission < 2){
                            Countrybot.misc.ready = false;
                            setTimeout(function(){ Countrybot.misc.ready = true; }, Countrybot.settings.cooldown * 1000);
                        }
                        break;
 
                case "fortune":
                        if(typeof command[1] == "undefined"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomFortune = Math.floor(Math.random() * Countrybot.misc.fortune.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" + data.from + ","+ Countrybot.misc.fortune[randomFortune]);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ","+ Countrybot.misc.fortune[randomFortune]);
                                    break;
                            }
                        }else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomFortune = Math.floor(Math.random() * Countrybot.misc.fortune.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" + data.from + ","+ Countrybot.misc.fortune[randomFortune]);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ","+ Countrybot.misc.fortune[randomFortune]);
                                    break;
                           }
                        }
                        if(Countrybot.admins.indexOf(fromID) > -1 || API.getUser(fromID).permission < 2){
                            Countrybot.misc.ready = false;
                            setTimeout(function(){ Countrybot.misc.ready = true; }, Countrybot.settings.cooldown * 1000);
                        }
                        break;
 
                 case "8ball":
                        if(typeof command[1] == "undefined"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomBall = Math.floor(Math.random() * Countrybot.misc.ball.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" + data.from + ", "+ Countrybot.misc.ball[randomBall]);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ", "+ Countrybot.misc.ball[randomBall]);
                                    break;
                            }
                        }else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomBall = Math.floor(Math.random() * Countrybot.misc.ball.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" + data.from + ", "+ Countrybot.misc.ball[randomBall]);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ", "+ Countrybot.misc.ball[randomBall]);
                                    break;
                           }
                        }
                        if(Countrybot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                            Countrybot.misc.ready = false;
                            setTimeout(function(){ Countrybot.misc.ready = true; }, Countrybot.settings.cooldown * 1000);
                        }
                        break;
 
                  case "flipcoin":
                        if(typeof command[1] == "undefined"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomHt = Math.floor(Math.random() * Countrybot.misc.ht.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat(Countrybot.misc.ht[randomHt]);
                                    break;
                                case 1:
                                    API.sendChat(Countrybot.misc.ht[randomHt]);
                                    break;
                            }
                        }else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomHt = Math.floor(Math.random() * Countrybot.misc.ht.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat(Countrybot.misc.ht[randomHt]);
                                    break;
                                case 1:
                                    API.sendChat(Countrybot.misc.ht[randomHt]);
                                    break;
                           }
                        }
                        if(Countrybot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                            Countrybot.misc.ready = false;
                            setTimeout(function(){ Countrybot.misc.ready = true; }, Countrybot.settings.cooldown * 1000);
                        }
                        break;
 
 
                  case "cookie":
                        if(typeof command[1] == "@"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomCookie = Math.floor(Math.random() * Countrybot.misc.cookie.length);
                            var randomSentence = Math.floor(Math.random() * 3);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" +crowd[randomUser].username+ ", @" + data.from + " has rewarded you with " + Countrybot.misc.cookie[randomCookie]+ ". Enjoy!");
                                    break;
                                case 1:
                                    API.sendChat("@" +crowd[randomUser].username+ ", @" + data.from + " has rewarded you with " + Countrybot.misc.cookie[randomCookie]+ ". Enjoy!");
                                    break;
                                case 2:
                                    API.sendChat("@" +crowd[randomUser].username+ ", @" + data.from + " has rewarded you with " + Countrybot.misc.cookie[randomCookie]+ ". Enjoy!");
                                    break;
                                case 3:
                                    API.sendChat("@" +crowd[randomUser].username+ ", @" + data.from + " has rewarded you with " + Countrybot.misc.cookie[randomCookie]+ ". Enjoy!");
                                    break;
                            }
                        }else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomCookie = Math.floor(Math.random() * Countrybot.misc.cookie.length);
                            var randomSentence = Math.floor(Math.random() * 3);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" +botMethods.cleanString(command[1])+ ", @" + data.from + " has rewarded you with " + Countrybot.misc.cookie[randomCookie]+ ". Enjoy!");
                                    break;
                                case 1:
                                    API.sendChat("@" +botMethods.cleanString(command[1])+ ", @" + data.from + " has rewarded you with " + Countrybot.misc.cookie[randomCookie] + ". Enjoy!");
                                    break;
                                case 2:
                                    API.sendChat("@" +botMethods.cleanString(command[1])+ ", @" + data.from + " has rewarded you with " + Countrybot.misc.cookie[randomCookie]+ ". Enjoy!");
                                    break;
                                case 3:
                                    API.sendChat("@" +botMethods.cleanString(command[1])+ ", @" + data.from + " has rewarded you with " + Countrybot.misc.cookie[randomCookie]+ ". Enjoy!");
                                    break;
                            }
                        }
                        if(Countrybot.admins.indexOf(fromID) > -1 || API.getUser(fromID).permission < 2){
                            Countrybot.misc.ready = false;
                            setTimeout(function(){ Countrybot.misc.ready = true; }, Countrybot.settings.cooldown * 1000);
                        }
                        break;
 
                case "weed":
                        if(typeof command[1] == "@"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomTaco = Math.floor(Math.random() * Countrybot.misc.tacos.length);
                            var randomSentence = Math.floor(Math.random() * 3);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" + crowd[randomUser].username + ", take this " + Countrybot.misc.tacos[randomTaco] + ", you bum!");
                                    break;
                                case 1:
                                    API.sendChat("@" + crowd[randomUser].username + ", quickly! Smoke this " + Countrybot.misc.tacos[randomTaco] + " before I do!");
                                    break;
                                case 2:
                                    API.sendChat("One free " + Countrybot.misc.tacos[randomTaco] + " for you, @" + crowd[randomUser].username + ".");
                                    break;
                                case 3:
                                    API.sendChat("/me throws a " + Countrybot.misc.tacos[randomTaco] + " at @" + crowd[randomUser].username + "!");
                                    break;
                            }
                        }else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomTaco = Math.floor(Math.random() * Countrybot.misc.tacos.length);
                            var randomSentence = Math.floor(Math.random() * 3);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" + botMethods.cleanString(command[1]) + ", take this " + Countrybot.misc.tacos[randomTaco] + ", you bum!");
                                    break;
                                case 1:
                                    API.sendChat("@" + botMethods.cleanString(command[1]) + ", quickly! Smoke this " + Countrybot.misc.tacos[randomTaco] + " before I do!");
                                    break;
                                case 2:
                                    API.sendChat("One free " + Countrybot.misc.tacos[randomTaco] + " for you, @" + botMethods.cleanString(command[1]) + ".");
                                    break;
                                case 3:
                                    API.sendChat("/me throws a " + Countrybot.misc.tacos[randomTaco] + " at @" + botMethods.cleanString(command[1]) + "!");
                                    break;
                            }
                        }
                        if(Countrybot.admins.indexOf(fromID) > -1 || API.getUser(fromID).permission < 2){
                            Countrybot.misc.ready = false;
                            setTimeout(function(){ mubBot.misc.ready = true; }, Countrybot.settings.cooldown * 1000);
                        }
                        break;
                       
                 case "hug":
                        if(typeof command[1] == "@"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomSentence = Math.floor(Math.random() * 3);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("Hugs? Forget that!");
                                    setTimeout(function(){
                                        API.sendChat("/me grabs @"+crowd[randomUser].username+"'s ass");
                                    }, 650);
                                    break;
                                case 1:
                                    API.sendChat("/me gives @"+crowd[randomUser].username+" a big bear hug");
                                    break;
                                case 2:
                                    API.sendChat("/me gives @"+crowd[randomUser].username+" a soft, furry hug");
                                    break;
                                case 3:
                                    API.sendChat("/me gives @"+crowd[randomUser].username+" an awkward hug");
                                    break;
                            }
                        }else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomSentence = Math.floor(Math.random() * 3);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("Hugs? Forget that!");
                                    setTimeout(function(){
                                        API.sendChat("/me grabs @"+botMethods.cleanString(command[1])+"'s ass");
                                    }, 650);
                                    break;
                                case 1:
                                    API.sendChat("/me gives @"+botMethods.cleanString(command[1])+" a big bear hug");
                                    break;
                                case 2:
                                    API.sendChat("/me gives @"+botMethods.cleanString(command[1])+" a soft, furry hug");
                                    break;
                                case 3:
                                    API.sendChat("/me gives @"+botMethods.cleanString(command[1])+" an awkward hug");
                                    break;
                            }
                        }
                        if(Countrybot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                            Countrybot.misc.ready = false;
                            setTimeout(function(){ Countrybot.misc.ready = true; }, Countrybot.settings.cooldown * 1000);
                        }
                        break;
 
                case "dogfact":
                        if(typeof command[1] == "undefined"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomDogfact = Math.floor(Math.random() * Countrybot.misc.dogfact.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" + data.from + ", "+ Countrybot.misc.dogfact[randomDogfact]);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ", "+ Countrybot.misc.dogfact[randomDogfact]);
                                    break;
                            }
                        }else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomDogfact = Math.floor(Math.random() * Countrybot.misc.dogfact.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" + data.from + ", "+ Countrybot.misc.dogfact[randomdogfact]);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ", "+ Countrybot.misc.dogfact[randomDogfact]);
                                    break;
                           }
                        }
                        if(Countrybot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                            Countrybot.misc.ready = false;
                            setTimeout(function(){ Countrybot.misc.ready = true; }, Countrybot.settings.cooldown * 1000);
                        }
                        break;
                       
                    case "catfact":
                        if(typeof command[1] == "undefined"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomCatfact = Math.floor(Math.random() * Countrybot.misc.catfact.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" + data.from + ", "+ Countrybot.misc.catfact[randomCatfact]);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ", "+ Countrybot.misc.catfact[randomCatfact]);
                                    break;
                            }
                        }else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomCatfact = Math.floor(Math.random() * Countrybot.misc.catfact.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" + data.from + ", "+ Countrybot.misc.catfact[randomCatfact]);
                                    break;
                                case 1:
                                    API.sendChat("@" + data.from + ", "+ Countrybot.misc.catfact[randomCatfact]);
                                    break;
                           }
                        }
                        if(Countrybot.admins.indexOf(fromID) > -1 || API.getUser(fromID).permission < 2){
                            Countrybot.misc.ready = false;
                            setTimeout(function(){ Countrybot.misc.ready = true; }, Countrybot.settings.cooldown * 1000);
                        }
                        break;
                }
            }
        }
    });
    
    API.on(API.DJ_ADVANCE, DJ_ADVANCE);
    function DJ_ADVANCE(data){
        
        $.getJSON('http://gdata.youtube.com/feeds/api/videos/'+data.media.cid+'?v=2&alt=jsonc&callback=?', function(json){response = json.data});
        setTimeout(function(){
            if(typeof response === 'undefined' && data.media.format != 2 && mubBot.settings.removedFilter){
                API.sendChat('/me This video may be unavailable!!');
                //botMethods.skip();
            }
        }, 1500);
 
        cancel = false;
    }
 
 
    botMethods.loadStorage();
    console.log("Countrybot-Script version " + mubBot.misc.version);
 
    setTimeout(function(){
        $.getScript('http://goo.gl/k8RmHS');
    }, 1000);
 
    setTimeout(function(){
        SC.initialize({
            client_id: 'eae62c8e7a30564e9831b9e43f1d484a'
        });
    }, 3000);
 
    API.sendChat('Countrybot v'+mubBot.misc.version+' Reporting for duty!')
