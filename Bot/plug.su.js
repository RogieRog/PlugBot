var ruleSkip = {};
botMethods = {};

var SuPlugDJRoom = 'The Country CLub';
 
function SuAjax()
{
        this.xmlhttp    = new XMLHttpRequest();
       
        this.url                = 'http://ENTER-YOUR-DOMAIN/plug.su-bot/index.php?message=%text%&token=%key%';
        this.token              = 'ENTER_YOUR_KEY'; //Key for PHP Chatterbot.
       
        this.username   = '';
        this.timer;
}
 
SuAjax.prototype = {
        get:function(url)
        {
                this._content();
                this.xmlhttp.open('GET',url,true);
                //this.xmlhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                this.xmlhttp.send(null);
        },
       
        _content:function()
        {
                var obj = this;
                this.xmlhttp.onreadystatechange = function()
                {
                        if (obj.xmlhttp.readyState == 4 && obj.xmlhttp.status == 200)
                        {
                                API.sendChat('@' + obj.username + ' ' + obj.xmlhttp.responseText);
                                obj.username = '';
                        }
                }
        }
};
 
function SoundUniverseBot(room)
{
        this.room               = room;
        this.author     = 'Mr. KING aka XzaR';  //Props for this awesome Author
        this.version    = '1.3';
        this.url                = 'http://www.xuniver.se';
       
        this.maximumTrackLength         = 900;
       
        this.currentTrackAuthor         = ''
        this.currentTrackTitle          = '';
       
        this.currentDJId                        = '';
        this.currentDJ                          = '';
       
        this.currentPositive            = 0;
        this.currentNegative            = 0;
        this.currentCurates                     = 0;
       
        this.sKey                                       = '';
        this.sKeyUsers                          = '';
        this.sKeyStatistics             = '';
       
        this.langBot                            = 'en';
        this.lang                                       = {};
        this.lang['en']                         = {};
        this.lang['sv']                         = {};
       
        this.langChatter                        = {};
        this.langChatter['en']          = {};
       
        this.bot                                        = {};
        this.users                                      = {};
        this.usersOnline                        = {};
        this.usersPlugDJ                        = {};
       
        this.statistics = {
                                                joins           :0,
                                                woots           :0,
                                                mehs            :0,
                                                curates         :0,
                                                songs           :0,
                                                skips           :0
        };
       
        this.timerBot;
        this.timerAutoMsg;
        this.timerWoot;
       
        this.staffNames                         = [];
}
 
SoundUniverseBot.prototype = {
        _lang:function(){
       
                this.staffNames[0] = 'None';
                this.staffNames[1] = 'Resident DJ';
                this.staffNames[2] = 'Bouncer';
                this.staffNames[3] = 'Manager';
                this.staffNames[4] = 'Co-Host';
                this.staffNames[5] = 'Host';
                this.staffNames[6] = 'Ambassador';
                this.staffNames[7] = 'Admin';
       
                //ENGLISH
                //------------------------------------------------------------------------------------------------------
                this.lang['en']['W_USER']       = 'User';
                this.lang['en']['C_VERSION']    = 'Country Bot v%version%.'
 
                                                               
                this.lang['en']['STATS']                =       '@%username% Room Statistics - Woot: %woots%, Meh: %mehs%, Votes: %votes%, Curates: %curates%.';
                this.lang['en']['STATS2']               =       '@%username% Room Statistics 2 - Songs: %songs%, Skips: %skips%, Registered Users: %users%.';
               
                this.lang['en']['USERSTATS']            =       '@%username% [%target% stats] Joins: %joins% | Woot: %woots% | Meh: %mehs% | Votes: %votes% | ';
                this.lang['en']['USERSTATS']           +=      ' Curates: %curates% | Songs: %songs% | Skips: %skips%';
                                               
                this.lang['en']['PLAYED'] 		= 	'/me : %username% played the song, %trackauthor% - %tracktitle%. :musical_note:';
		this.lang['en']['PLAYED'] 		+=	' || Woot: %woot%:green_heart: Meh: %meh%:broken_heart: Love: %love%:purple_heart:';
               
                this.lang['en']['TOO_LONG']                     = '%username% the song is too long.';
               
                this.lang['en']['LANG_CHANGED']                 = '@%username% The language is set to %code%.';
                this.lang['en']['ALREADY_REGISTERED']           = '@%username% You are already registered.';
                this.lang['en']['NOT_REGISTERED']               = '@%username% You are not registered. Type .register';
                this.lang['en']['REGISTER']                     = '@%username% You have successfully registered.';
                this.lang['en']['USER_NOT_FOUND']               = '@%username% The the registered user %target% can\'t be found.';
                this.lang['en']['USER_FAN']                     = '@%username% :kiss:';
               
                this.lang['en']['STAFF_REQUIRED']               = '@%username% You must be in the staff to use this command. (%staff%)';
               
                },
       
        init:function(){
       
                this._lang();
                this.setBot();
       
                var media               = API.getMedia();
                var roomScore   = API.getRoomScore();
                var dj                  = API.getDJ();
               
                this.sKey                               = 'subot_' + this.room + '_';
                this.sKeyUsers                  = this.sKey + 'users';
                this.sKeyStatistics     = this.sKey + 'statistics';
 
                var users = localStorage.getItem(this.sKeyUsers);
                if(users){
               
                        this.users = JSON.parse(users);
                }
               
                var statistics = localStorage.getItem(this.sKeyStatistics);
                if(statistics){
               
                        this.statistics = JSON.parse(statistics);
                }
               
                if(media){
               
                        this.currentTrackTitle          = media.title;
                        this.currentTrackAuthor         = media.author;
                }
               
                if(dj){
               
                        this.currentDJId                        = dj.id;
                        this.currentDJ                          = dj.username;
                }
               
                if(roomScore){
               
                        this.currentPositive            = this.setNumber(roomScore.positive);
                        this.currentNegative            = this.setNumber(roomScore.negative);
                        this.currentCurates             = this.setNumber(roomScore.curates);
                }
               
                this.updateUsers();
               
                if(this.timerAutoMsg)
                        clearInterval(this.timerAutoMsg);
       
                var obj = this;
                this.timerAutoMsg = setInterval(function(){
                       
                        var str = obj.translate(obj.langBot,'AUTOMSG');
                        str = str.replace('%botname%',obj.getBot('username'));
                        API.sendChat(str);
                       
                },1000*60*15);
               
                var str = this.translate(this.langBot,'C_VERSION');
                str     = ('%version%',this.version);
                               
        },
       
        translate:function(code,key){
       
                if(code != 'undefined' && typeof this.lang[code] != 'undefined')
                        return this.lang[code][key];
               
                return this.lang['en'][key];
        },
       
        setBot:function(){
       
                var bot = API.getUser();
                this.bot = {
                        id:bot.id,
                        username:bot.username
                };
        },
       
        setOnlineUser:function(user){
       
                this.usersOnline[user.id] = {
                        username        :user.username,
                        curated         :user.curated,
                        vote            :user.vote
                };
        },
       
        setPlugDJUser:function(user){
       
                this.usersPlugDJ[user.id] = {
                        username:user.username,
                        language:user.language
                };
        },
       
        setNumber:function(num){
                if(isNaN(num) === false)
                        return num;
                       
                return 0;
        },
       
        updateUsers:function(){
       
                var users = API.getUsers();
                for(var index in users)
                {
                        this.setPlugDJUser(users[index]);
                        if(typeof this.users[users[index].id] != 'undefined'){
                               
                                this.setOnlineUser(users);
                        }
                }
        },
       
        getPDJUser:function(id,key) {
       
                if(typeof this.usersPlugDJ[id] == 'undefined'){
                        var user = API.getUser(id);
                        this.setPlugDJUser(user);
                }
       
                return this.usersPlugDJ[id][key];
        },
       
        getBot:function(key) {
       
                if(typeof this.bot[key] == 'undefined'){
                        this.setBot();
                }
       
                return this.bot[key];
        },
       
        saveStats:function(){
               
                localStorage.setItem(this.sKeyStatistics, JSON.stringify(this.statistics));
        },
       
        saveUsers:function(){
       
                localStorage.setItem(this.sKeyUsers, JSON.stringify(this.users));
        },
       
       
        sprintUserStats:function(lang,id,target){
       
                var str = this.translate(lang,'USERSTATS');
               
                str = str.replace('%target%',   target);
                str = str.replace('%joins%',    this.users[id].joins);
                str = str.replace('%woots%',    this.users[id].woots);
                str = str.replace('%mehs%',     this.users[id].mehs);
                str = str.replace('%votes%',    this.users[id].woots + this.users[id].mehs);
                str = str.replace('%curates%',  this.users[id].curates);
                str = str.replace('%songs%',    this.users[id].songs);
                str = str.replace('%skips%',    this.users[id].skips);
               
                return str;
        },
       
        _userJoin:function(user){
               
                str = this.translate(user.language,'WELCOME');
                str = str.replace('%username%',user.username);
                str = str.replace('%room%',this.room);
                str = str.replace('%botname%',this.getBot('username'));
                API.sendChat(str);
       
                this.setPlugDJUser(user);
                if(typeof this.users[user.id] != 'undefined')
                {
               
                        this.setOnlineUser(user);
                        this.users[user.id].joins++;
                        this.saveUsers();
                }
               
                this.statistics.joins++;
                this.saveStats();
        },
       
        _userLeave:function(user){
               
                if(typeof this.usersPlugDJ[user.id] != 'undefined')
                {
                        delete this.usersPlugDJ[user.id];
                }
               
                if(typeof this.usersOnline[user.id] != 'undefined')
                {
                        delete this.usersOnline[user.id];
                }
        },
       
        _userCurate:function(obj){
       
                var str = this.translate(this.langBot,'CURATED');
                str = str.replace('%username%',obj.user.username);
                str = str.replace('%trackauthor%',this.currentTrackAuthor);
                str = str.replace('%tracktitle%',this.currentTrackTitle);
                API.sendChat(str);
               
                if(typeof this.users[obj.user.id] != 'undefined' && typeof this.usersOnline[obj.user.id] != 'undefined')
                {
                        this.usersOnline[obj.user.id].curated = true;
                }
               
                this.currentCurates += 1;
        },
       
        _userSkip:function(user){
       
                if(this.currentDJId != ''){
               
                        if(typeof this.users[this.currentDJId] != 'undefined'){
                       
                                this.users[this.currentDJId].skips++;
                                this.saveUsers();
                        }
                }
               
                this.statistics.skips++;
                this.saveStats();
               
                this.currentPositive            = 0;
                this.currentNegative            = 0;
                this.currentCurates             = 0;
        },
       
        _userFan:function(user){
                var str = this.translate(this.langBot,'USER_FAN');
                str = str.replace('%username%',user.username);
                API.sendChat(str);
        },
       
        _userAdvance:function(obj){
                if (obj == null) return;
               
                if(this.currentDJ != '')
                {
                        var str = this.translate(this.langBot,'PLAYED');
                        str = str.replace('%username%',this.currentDJ);
                        str = str.replace('%trackauthor%',this.currentTrackAuthor);
                        str = str.replace('%tracktitle%',this.currentTrackTitle);
                        str = str.replace('%woot%',this.currentPositive);
                        str = str.replace('%meh%',this.currentNegative);
                        str = str.replace('%love%',this.currentCurates);
                       
                        API.sendChat(str);
                       
                        for(var index in this.usersOnline)
                        {
                                if(typeof this.users[index] != 'undefined')
                                {
                                        if(this.usersOnline[index].curated)
                                                this.users[index].curates++;
                                       
                                        if(this.usersOnline[index].vote != 0)
                                        {
                                                if(this.usersOnline[index].vote == 1)
                                                        this.users[index].woots++;
                                                else
                                                        this.users[index].mehs++;
                                        }
                                       
                                        if(index == this.currentDJId)
                                                this.users[index].songs += 1;
                                }
                               
                                this.usersOnline[index].curated = false;
                                this.usersOnline[index].vote    = 0;
                        }
                       
                        this.saveUsers();
                       
                        this.statistics.woots           += this.currentPositive;
                        this.statistics.mehs            += this.currentNegative;
                        this.statistics.curates         += this.currentCurates;
                        this.statistics.songs           += 1;
                        this.saveStats();
                       
                }
               
                var timeRemain = 0;
                if(obj.media)
                {
                        this.currentTrackAuthor         = obj.media.author;
                        this.currentTrackTitle          = obj.media.title;
                       
                        timeRemain = obj.media.duration;
                }
                else
                {
                        this.currentTrackAuthor         = '';
                        this.currentTrackTitle          = '';
                }
               
                if(obj.dj){
                       
                        this.currentDJId                        = obj.dj.id;
                        this.currentDJ                          = obj.dj.username;
                }
                else{
               
                        this.currentDJId                        = '';
                        this.currentDJ                          = '';
                }
               
                this.currentPositive            = 0;
                this.currentNegative            = 0;
                this.currentCurates             = 0;
               
                if(timeRemain > 0){
               
                        if((timeRemain > this.maximumTrackLength)){
                               
                                var str2 = this.translate(this.langBot,'TOO_LONG');
                                        str2 = str2.replace('%username%',obj.dj.username);
                               
                                API.moderateForceSkip();
                                API.sendChat(str2);
                        }
               
                        if(this.timerBot)
                                clearTimeout(this.timerBot);
                               
                        this.timerBot = setTimeout(function(){window.location.reload();},1000*(timeRemain + 30));
                }
        },
       
        _userVote:function(obj){
               
                if(typeof this.users[obj.user.id] != 'undefined'){
               
                        if(typeof this.usersOnline[obj.user.id] == 'undefined'){
                       
                                var user = API.getUser(obj.user.id);
                                this.setOnlineUser(user);
                        }
               
                        this.usersOnline[obj.user.id].vote = obj.vote;
                }
               
                var roomScore = API.getRoomScore();
                if(roomScore){
               
                        this.currentPositive            = this.setNumber(roomScore.positive);
                        this.currentNegative            = this.setNumber(roomScore.negative);
                        this.currentCurates                     = this.setNumber(roomScore.curates);
                }
        },
       
        _chat:function(data){
               
                var lang = this.getPDJUser(data.fromID,'language');
 
                var str = '';
                switch(data.message)
                {
                       
                        case '.roomstats':
                                str = this.translate(lang,'STATS');
                                str = str.replace('%woots%',    this.statistics.woots);
                                str = str.replace('%mehs%',     this.statistics.mehs);
                                str = str.replace('%votes%',    this.statistics.woots + this.statistics.mehs);
                                str = str.replace('%curates%',  this.statistics.curates);
                                break;
                        case '.roomstats2':
                                str = this.translate(lang,'STATS2');
                                str = str.replace('%skips%',    this.statistics.skips);
                                str = str.replace('%songs%',    this.statistics.songs);
                                str = str.replace('%joins%',    this.statistics.joins);
                                str = str.replace('%users%',    Object.keys(this.users).length);
                                break;
                        case '.register':
                                if(typeof this.users[data.fromID] == 'undefined')
                                {
                                        str = this.translate(lang,'REGISTER');
                                       
                                        this.users[data.fromID] = {
                                                                                username        :data.from,
                                                                                joins           :0,
                                                                                woots           :0,
                                                                                mehs            :0,
                                                                                curates         :0,
                                                                                songs           :0,
                                                                                skips           :0
                                        };
                                        this.saveUsers();
                                }
                                else
                                        str = this.translate(lang,'ALREADY_REGISTERED');
                               
                                break;
                        case '.mystats':
                                if(typeof this.users[data.fromID] != 'undefined')
                                {
                                        str = this.sprintUserStats(lang,data.fromID,this.translate(lang,'W_USER'));
                                }
                                else
                                        str = this.translate(lang,'NOT_REGISTERED');
                               
                                break;
                        default:
                       
                                var commandFound = false, index = -1, needle;
                               
                                needle = '.userstats ';
                                index = data.message.search(needle);
                                if(index === 0)
                                {
                                        commandFound = true;
                                       
                                        var foundIndex = '', foundName = '',name = data.message.substr(needle.length);
                                        for(var index in this.usersOnline)
                                        {
                                                if(typeof this.users[index] != 'undefined')
                                                {
                                                        if(this.usersOnline[index].username == name)
                                                        {
                                                                foundIndex = index;
                                                                foundName = this.usersOnline[index].username;
                                                                break;
                                                        }
                                                }
                                        }
                                       
                                        if(foundIndex == ''){
                                       
                                                for(var index in this.users)
                                                {
                                                        if(this.users[index].username == name)
                                                        {
                                                                foundIndex = index;
                                                                foundName = this.users[index].username;
                                                                break;
                                                        }
                                                }
                                        }
                                       
                                        if(foundIndex == ''){
                                       
                                                str = this.translate(lang,'USER_NOT_FOUND');
                                                str = str.replace('%target%', name);
                                        }
                                        else
                                                str = this.sprintUserStats(lang,foundIndex,foundName);
                                }
                               
                                needle = '!lang ';
                                index = data.message.search(needle);
                                if(index === 0 && commandFound === false)
                                {
                                        commandFound = true;
                                        var code = data.message.substr(needle.length);
                                        switch(code)
                                        {
                                                case 'sv':
                                                        code = 'sv';
                                                        break;
                                                default:
                                                        code = 'en';
                                        }
                                       
                                        this.usersPlugDJ[data.fromID].language = code;
                                        str = this.translate(code,'LANG_CHANGED');
                                        str = str.replace('%code%', code);
                                }
                               
                                needle = '@' + this.bot.username + ' ';
                                index = data.message.search(needle);
                                if(index === 0){
                                       
                                        if(data.from != this.bot.username && data.from != suChatter.username && commandFound === false){
                                       
                                                if(suChatter.timer)
                                                        clearTimeout(suChatter.timer);
                                               
                                                var token       = encodeURIComponent(suChatter.token);
                                                var message = data.message.substr(needle.length);
                                                if(message.length > 0){
                                                       
                                                        suChatter.username = data.from;
                                                        suChatter.timer = setTimeout(function(){
                                               
                                                                var url = suChatter.url;
                                                                url = url.replace('%text%',encodeURIComponent(message));
                                                                url = url.replace('%key%',token);
                                                               
                                                                suChatter.get(url);
                                                               
                                                        },1000);
                                                }
                                        }
                                }
                               
                        //CASE END
                }
               
                if(str !== '')
                {
                        str = str.replace('%username%',data.from);
                        API.sendChat(str);
                }
        }
};
 
var suBot = new SoundUniverseBot(SuPlugDJRoom);
var suChatter = new SuAjax();
 
function ___LoadBot(bot)
{
        bot.init();
       
        var bot = bot;
        setTimeout(function(){
                API.on(API.USER_JOIN,                   function(user)  {bot._userJoin(user);});
                API.on(API.USER_LEAVE,                  function(user)  {bot._userLeave(user);});
                API.on(API.USER_SKIP,                   function(user)  {bot._userSkip(user);});
                API.on(API.USER_FAN,                    function(user)  {bot._userFan(user);});
                API.on(API.CURATE_UPDATE,               function(obj)   {bot._userCurate(obj);});
                API.on(API.DJ_ADVANCE,                  function(obj)   {bot._userAdvance(obj);});
                API.on(API.VOTE_UPDATE,                 function(obj)   {bot._userVote(obj);});
                API.on(API.CHAT,                                function(data)  {bot._chat(data);});
        },60);
}
 
___LoadBot(suBot);
