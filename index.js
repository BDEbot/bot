const Discord = require('discord.js')
const bot = new Discord.Client()
bot.login('NDg2MjM2NjU4MDE1MDEwODE2.DnBVvQ.2W7U8e8NzPLa-_qOaFAwGn4PJPM')

bot.on('ready', function () {
  console.log("Bot online")
})


bot.on('guildMemberAdd', member => { //<@Message.Author.ID
	member.guild.channels.get('486144781047693314').send('Bienvenue ' + '<@' + member.id + '> !\nPour obtenir ton role, demande au bot comment faire: !help '); 
});

var semestres = [ "S1", "S3", "s1", "s3"];
var groupesS1 = [ "G1", "G2", "G3", "G4", "G5", "g1", "g2", "g3", "g4", "g5" ];
var roles 	  = [ "S1-G1", "S1-G2", "S1-G3","S1-G4","S1-G5", "S3-G1", "S3-G2","S3-G3","S3-G4" ];
var indexes   = [ 0, 0];
bot.on('message', message => {
	
	var bool = 0;
	
	if(message.author.username == "Bot permissions"){
		return;
	}
	var msg = message.content.split(" ");
	
	if(msg[0] == "!help"){
		message.reply('Commande disponible: !inscription\nPour obtenir ton rôle, tu dois indiquer ton nom, prénom, semestre et groupe: \nExemple: !inscription monPrenom monNom S1 G2');
		return;
	}


	if(msg[0] != "!inscription"){
		return;
	}
	
	
	if(msg.length != 5){ 
		message.reply('Mauvais format !\n!inscription prenom nom semestre groupe');
		return;
	}
	
	
	for (var i = 0; i < groupesS1.length; i++) {
		if (message.content.includes(groupesS1[i]) ) {
			bool+=1;
			indexes[0] = i;	
			break;
	  }
	}	
	
	for(var j = 0; j < semestres.length; j++){
		if (message.content.includes(semestres[j]) ) {
			bool+=1;
			indexes[1] = j;
			break;
		}
	}
	
	if(indexes[0] == 9 && (indexes[1] == 1 || indexes[1] == 3)){
		bool = 0;
	}
	
	for(var i = 0; i < roles.length; i++){
		if(message.member.roles.find("name", roles[i]) ){	
			message.reply('Tu as deja le role: ' + message.guild.roles.find("name", roles[i]) );
			message.reply('Si tu t\'es trompé ou à changé de groupe, contacte un Admin.');
			return;
		}
	}
	
	if(bool == 2){
		var name = message.member.displayName;
		while(msg[1].length + msg[2].length + name.length >= 30){
			name = name.slice(0, name.length-1);
		}
		message.member.setNickname(msg[1] + ' ' + msg[2] + '/' + name  );//slice(x) suppr x char
		message.reply('Nouveau role: ' + semestres[indexes[1]].toUpperCase() + '-' + groupesS1[indexes[0]].toUpperCase() );
		message.member.addRole( message.guild.roles.find("name", semestres[indexes[1]].toUpperCase()  + '-' + groupesS1[indexes[0]].toUpperCase() ) );
		
	}else {
		message.reply('Semestres et / ou groupes invalides. Liste des groupes et semestre:\n\nSemestres:\nS1\nS3\n\nGroupes:\nG1\nG2\nG3\nG4\nG5 (attention pas de G5 en S3).\n\nFormat:\n!inscription prenom nom semestre groupe. ');
	}
	

})

