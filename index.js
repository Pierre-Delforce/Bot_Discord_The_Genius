//
const Discord = require('discord.js')
const bot = new Discord.Client()

/* */
bot.on('ready', function () {
    bot.user.setStatus('online')
    bot.user.setActivity('Observer')
    console.log("I'm ready!")
})

/*Prefix pour les commandes */
const PREFIX = '?';
let count_dealer;
let link = '';
let lock = false;

let countpouvoirvision = false;
let countpouvoirfortune = false;
let countpouvoirdestiny = false;
let countpouvoirtourment = true;

let countusevision = false;
let countusefortune = false;
let countusedestiny = false;
let countuseillumination = false;


/* Variables embeds */
const commandjoueurembed = new Discord.MessageEmbed()
    .setColor('#B78747')
    .setTitle('Commandes du bot')
    .setThumbnail('https://cdn.discordapp.com/attachments/840708882611568681/868188452066299935/logof.png')
    .addField(`Carte`,`__?map__: permet d'afficher la carte du manoir.`)
    .addField(`Déplacements`,`__?+NomSalle__: permet de se déplacer dans une salle accessible.\nLe nom de la salle doit être en minuscule+sans espace.\nExemples: ?hall/couloir1?/mozart...`)
    .addField(`Règles`,`__?rules__: affiche le topic des règles du main/deathmatch en cours.`)
    .addField(`Dés`,`__?roll XdY__: permet de lancer un nombre de dés d'une certaine taille. Le X est le nombre de dés et et le Y la taille du dé.\n Exemple: ?roll 5d10 lance 5 dés de taille 10`)
    .setFooter('Auteur', 'https://cdn.discordapp.com/attachments/866277336939757578/866286320866164766/Maestro.png');

const commandspectaembed = new Discord.MessageEmbed()
    .setColor('#B78747')
    .setTitle('Commandes du bot')
    .setThumbnail('https://cdn.discordapp.com/attachments/840708882611568681/868188452066299935/logof.png')
    .addField(`Carte`,`__?map__: permet d'afficher la carte du manoir.`)
    .addField(`Règles`,`__?rules__: affiche le topic des règles du main/deathmatch en cours.`)
    .addField(`Dés`,`__?roll XdY__: permet de lancer un nombre de dés d'une certaine taille. Le X est le nombre de dés et et le Y la taille du dé.\n Exemple: ?roll 5d10 lance 5 dés de taille 10`)
    .addField(`Localisation des joueurs`,`__?watch__: permet de voir où se situent les joueurs.`)
    .setFooter('Auteur', 'https://cdn.discordapp.com/attachments/866277336939757578/866286320866164766/Maestro.png');

const commandmjembed = new Discord.MessageEmbed()
    .setColor('#B78747')
    .setTitle('Commandes du bot')
    .setThumbnail('https://cdn.discordapp.com/attachments/840708882611568681/868188452066299935/logof.png')
    .addField(`Carte`,`__?map__: permet d'afficher la carte du manoir.`)
    .addField(`Déplacements`,`__?+NomSalle__: permet de se déplacer dans une salle accessible.\nLe nom de la salle doit être en minuscule+sans espace.\nExemples: ?hall/?couloir1/?mozart...`)
    .addField(`Règles`,`__?rules__: affiche le topic des règles du main/deathmatch en cours.\n__?setrules__: remplace le topic des règles affichées par ?rules.`)
    .addField(`Dés`,`__?roll XdY__: permet de lancer un nombre de dés d'une certaine taille. Le X est le nombre de dés et et le Y la taille du dé.\n Exemple: ?roll 5d10 lance 5 dés de taille 10`)
    .addField(`Localisation des joueurs`,`__?watch__: permet de voir où se situent les joueurs.`)
    .addField(`Voice`,`__?voice__: permet d'envoyer le même message dans tout les confess.\n Exemple: ?voice Bonjour voici un message`)
    .addField(`Lock`,`__?lock__: permet de vérouiller les déplacements des joueurs. Il suffit d'activer à nouveau la commande pour les dévérouiller.`)
    .setFooter('Auteur', 'https://cdn.discordapp.com/attachments/866277336939757578/866286320866164766/Maestro.png');
    


/* Ajout rôle nouveau arrivant + message accueil */
const accueilchannel = '869263341628030996';
bot.on('guildMemberAdd', member => {
    const msg = `Welcome <@${member.id}> sur The Genius Challengers`;
    const chan = member.guild.channels.cache.get(accueilchannel);
    const accueilrole = member.guild.roles.cache.find(name => name.name === 'Accueil');
    member.roles.add(accueilrole)
    chan.send(msg);
});




bot.on('message', msg => {

    /* Liste des variables pour les channels */
    const hallchannel = bot.channels.cache.get('866281975895949322');
    const dealerchannel = bot.channels.cache.get('866282004013252608');
    const couloir2channel = bot.channels.cache.get('866282246599344128');
    const chopinchannel = bot.channels.cache.get('866282017276297226');
    const lisztchannel = bot.channels.cache.get('866282142971068437');
    const couloir1channel = bot.channels.cache.get('866282232451956747');
    const lullychannel = bot.channels.cache.get('866282059303223347');
    const beriochannel = bot.channels.cache.get('866282630807158807');
    const mozartchannel = bot.channels.cache.get('866282026943119411');

    const botchannel = bot.channels.cache.get('866371247964946443');
    const bottab = [botchannel]
    // confess
    const confess1 = bot.channels.cache.get('867500058593067048');
    const confess2 = bot.channels.cache.get('867501904425517067');
    const confess3 = bot.channels.cache.get('867502012194750474');
    const confess4 = bot.channels.cache.get('867502403557523487');
    const confess5 = bot.channels.cache.get('867502483379453953');
    const confess6 = bot.channels.cache.get('867502794238590976');
    const confess7 = bot.channels.cache.get('867502938363789342');
    const confess8 = bot.channels.cache.get('867503010127806494');
    const confess9 = bot.channels.cache.get('867503372700483635');
    const confess10 = bot.channels.cache.get('867503478463922236');
    const confess11 = bot.channels.cache.get('867503667295682591');
    const confess12 = bot.channels.cache.get('867503734535749652');   
    const confess13 = bot.channels.cache.get('867503799496474644');

    /* Liste des variables pour les rôles */
    const hallrole = msg.guild.roles.cache.find(name => name.name === 'Hall')
    const dealerrole = msg.guild.roles.cache.find(name => name.name === 'Dealer')
    const couloir1role = msg.guild.roles.cache.find(name => name.name === 'Couloir1')
    const couloir2role = msg.guild.roles.cache.find(name => name.name === 'Couloir2')
    const lullyrole = msg.guild.roles.cache.find(name => name.name === 'Lully')
    const lisztrole = msg.guild.roles.cache.find(name => name.name === 'Liszt')
    const mozartrole = msg.guild.roles.cache.find(name => name.name === 'Mozart')
    const chopinrole = msg.guild.roles.cache.find(name => name.name === 'Chopin')
    const beriorole = msg.guild.roles.cache.find(name => name.name === '?????????')

    /* Liste des variables pour les membres */
    const personne1  = msg.guild.members.cache.get('498485239908270081');
    const personne2  = msg.guild.members.cache.get('379418751721799681');
    const personne3  = msg.guild.members.cache.get('339163609089310732');
    const personne4 = msg.guild.members.cache.get('297412837545082880');
    const personne5 = msg.guild.members.cache.get('239358728011251712');
    const personne6 = msg.guild.members.cache.get('128184876888227840');
    const personne7 = msg.guild.members.cache.get('276786054336479232');
    const personne8 = msg.guild.members.cache.get('275332142622441477');
    const personne9 = msg.guild.members.cache.get('339150018906947587');
    const personne10 = msg.guild.members.cache.get('698931602251710485');
    const personne11 = msg.guild.members.cache.get('370001915494268928');
    const personne12 = msg.guild.members.cache.get('301684714861756426');
    const personne13 = msg.guild.members.cache.get('229610498675441664');

    /* Liste des tableau de salles pour simplifier */
    const halltab = [dealerrole,couloir2role,couloir1role]
    const couloir1tab = [hallrole,lullyrole,mozartrole]
    const couloir2tab = [hallrole,chopinrole,lisztrole]
    const mozarttab = [couloir1role,beriorole]
    const confesstab = [confess1,confess2,confess3,confess4,confess5,confess6,confess7,confess8,confess9,confess10,confess11,confess12,confess13]


    const joueurlist = [personne1,personne2,personne3,personne4,personne5,personne6,personne7,personne8,personne9,personne10,personne11,personne12,personne13]
    const joueurnomlist = ['personne1','personne2','personne3','personne4','personne5','personne6','personne7','personne8','personne9','personne10','personne11','personne12','personne13']
    const sallenomlist = ['Hall','Dealer','Couloir 2','Couloir 1','Liszt','Chopin','Lully','Mozart']

    if (msg.content[0]=== PREFIX.substr(0, 1)) {

        // //tout le monde
        if ((msg.content) === '?map'){
            msg.channel.send('Voici la carte!', {files: ['https://media.discordapp.net/attachments/840708882611568681/849672858611220590/map.png?width=686&height=686']});
        }

        if ((msg.content) === '?rules'){
            msg.channel.send('Voici les règles du jeu actuel: '+link);
        }

        if ((msg.content).substring(0, 5) === '?roll'){

            let texte = ((msg.content).substring(0, (msg.content).length));
    
            let compteur =6;
            let separateur='d';
            let compteur2=0;
            let compteur3= 0;
    
            while (compteur+compteur2 < texte.length && texte[compteur+compteur2]!=separateur){
                compteur2++;
            }
            let nb_dé= texte.substring(compteur, compteur+compteur2);
            index = parseInt(nb_dé);
    
    
            while(compteur+compteur2+compteur3+1 < texte.length && texte[compteur+compteur2+compteur3]!=' '){
                compteur3++;
            }
            let nb_face= texte.substring(compteur+compteur2+1,compteur+compteur2+compteur3+1);
            max = parseInt(nb_face);
    
            let okay=true;
            let okay2=true;
    
            for (y=0;y < nb_dé.length; y++){
                if(isNaN(nb_dé[y])){
                    okay=false;
                }
            }
            for (z=0;z < nb_face.length; z++){
                if(isNaN(nb_face[z])){
                    okay2=false;
                }
            }
    
            tableau_dé=[];
            if(isNaN(index) || isNaN(max) || okay ==false || okay2==false){
                msg.channel.send("Données incorrectes!");
            }else{
                for(i=1;i<=index;i++){
                    dé = Math.floor(Math.random()*max+1);
                    tableau_dé.push(dé);
                }
            }
    
            calcul= "";
            tableau_dé.forEach(res => calcul = calcul + res + "+" );
            total = tableau_dé.reduce((total, val) => total + val, 0);
            reponse = " `(" + calcul.substring(0,calcul.length-1) + ")` = __" + total +"__";
    
            msg.reply(reponse);
        }



        /***************************************************************************************************/
        /***************************************************************************************************/
        /***************************************************************************************************/

        if (msg.member.roles.cache.find(name => name.name === 'Genius Player')){

            if ((msg.content) === '?command'){
                msg.channel.send(commandjoueurembed);
            }

            if (lock === false){
                switch (msg.content) {
                            

                    // // //*******************************************************************************************************************************************************************************/
                    // // //********Déplacements***********************************************************************************************************************************************************/
                    // // //*******************************************************************************************************************************************************************************/

                
                            case (PREFIX +'hall'):
                            if (msg.member.roles.cache.find(name => name.name === 'Hall')) {
                                    msg.channel.send("Vous êtes déjà à cet endroit!")
                                }else if ((msg.member.roles.cache.find(name => name.name === 'Lully')) 
                                || (msg.member.roles.cache.find(name => name.name === 'Mozart'))
                                || (msg.member.roles.cache.find(name => name.name === 'Chopin')) 
                                || (msg.member.roles.cache.find(name => name.name === 'Liszt'))){
                                    msg.channel.send("Vous ne pouvez pas aller directement à cet endroit!")
                                }
                            else{
                                if(confesstab.includes(msg.channel)=== false){
                                    if (msg.member.roles.cache.find(name => name.name === 'Dealer'))  {
                                        count_dealer =0;
                                    }
                                    halltab.forEach(function(role){
                                        msg.member.roles.remove(role);
                                    });
                                    msg.member.roles.add(hallrole)
                                    let namehall = (msg.author.tag).slice(0, -5)
                                    hallchannel.send(`**${namehall}** est arrivé dans le Hall !`)

                                }
                                      
                            }
                            break;
                
                            /*******************************************************************************************************************************************************************************/
                            /*******************************************************************************************************************************************************************************/
                            /*******************************************************************************************************************************************************************************/
                
                            case (PREFIX+'dealer'):
                                if (msg.member.roles.cache.find(name => name.name === 'Dealer')) {
                                    msg.channel.send("Vous êtes déjà à cet endroit!")
                                }else if ((msg.member.roles.cache.find(name => name.name === 'Lully')) 
                                || (msg.member.roles.cache.find(name => name.name === 'Mozart'))
                                || (msg.member.roles.cache.find(name => name.name === 'Chopin')) 
                                || (msg.member.roles.cache.find(name => name.name === 'Liszt'))
                                || (msg.member.roles.cache.find(name => name.name === 'Couloir1'))
                                || (msg.member.roles.cache.find(name => name.name === 'Couloir2')))
                                {
                                    msg.channel.send("Vous ne pouvez pas aller directement à cet endroit!")
                                }else if(count_dealer === 1){
                                    msg.channel.send("Le dealer est actuellement occupé!")
                                }else{
                                    if(confesstab.includes(msg.channel)=== false){
                                        msg.member.roles.remove(hallrole)
                                        msg.member.roles.add(dealerrole)
                                        let namedea = (msg.author.tag).slice(0, -5)
                                        dealerchannel.send(`**${namedea}** est arrivé en Dealer !`)
                                        count_dealer = 1;
                                    }
                                         
                                }
                            break;
                
                            /*******************************************************************************************************************************************************************************/
                            /*******************************************************************************************************************************************************************************/
                            /*******************************************************************************************************************************************************************************/
                
                            case (PREFIX+'couloir1'):
                                if (msg.member.roles.cache.find(name => name.name === 'Couloir1')) {
                                    msg.channel.send("Vous êtes déjà à cet endroit!")
                                }else if ((msg.member.roles.cache.find(name => name.name === 'Couloir2'))
                                || (msg.member.roles.cache.find(name => name.name === 'Chopin')) 
                                || (msg.member.roles.cache.find(name => name.name === 'Liszt'))
                                || (msg.member.roles.cache.find(name => name.name === 'Dealer')))
                                {
                                    msg.channel.send("Vous ne pouvez pas aller directement à cet endroit!")
                                }
                            else{
                                if(confesstab.includes(msg.channel)=== false){
                                    couloir1tab.forEach(function(role){
                                        msg.member.roles.remove(role);
                                    });
                                    msg.member.roles.add(couloir1role)
                                    let nameco1 = (msg.author.tag).slice(0, -5)
                                    couloir1channel.send(`**${nameco1}** est arrivé en couloir1 !`)
                                }
                                      
                            }
                            break;
                
                            /*******************************************************************************************************************************************************************************/
                            /*******************************************************************************************************************************************************************************/
                            /*******************************************************************************************************************************************************************************/
                
                            case (PREFIX+'couloir2'):
                                if (msg.member.roles.cache.find(name => name.name === 'Couloir2')) {
                                    msg.channel.send("Vous êtes déjà à cet endroit!")
                                }else if ((msg.member.roles.cache.find(name => name.name === 'Couloir1'))
                                || (msg.member.roles.cache.find(name => name.name === 'Mozart')) 
                                || (msg.member.roles.cache.find(name => name.name === 'Lully'))
                                || (msg.member.roles.cache.find(name => name.name === 'Dealer')))
                                {
                                    msg.channel.send("Vous ne pouvez pas aller directement à cet endroit!")
                                }
                            else{
                                if(confesstab.includes(msg.channel)=== false){
                                    couloir2tab.forEach(function(role){
                                        msg.member.roles.remove(role);
                                    });
                                    msg.member.roles.add(couloir2role)
                                    let nameco2 = (msg.author.tag).slice(0, -5)
                                    couloir2channel.send(`**${nameco2}** est arrivé en couloir 2 !`)
                                }
                                     
                            }
                            break;
                
                            /*******************************************************************************************************************************************************************************/
                            /*******************************************************************************************************************************************************************************/
                            /*******************************************************************************************************************************************************************************/
                
                            case (PREFIX+'lully'):
                                if (msg.member.roles.cache.find(name => name.name === 'Lully')) {
                                    msg.channel.send("Vous êtes déjà à cet endroit!")
                                }else if ((msg.member.roles.cache.find(name => name.name === 'Couloir2')) 
                                || (msg.member.roles.cache.find(name => name.name === 'Mozart'))
                                || (msg.member.roles.cache.find(name => name.name === 'Chopin')) 
                                || (msg.member.roles.cache.find(name => name.name === 'Liszt'))
                                || (msg.member.roles.cache.find(name => name.name === 'Dealer'))
                                || (msg.member.roles.cache.find(name => name.name === 'Hall')))
                                {
                                    msg.channel.send("Vous ne pouvez pas aller directement à cet endroit!")
                                }
                            else{
                                if(confesstab.includes(msg.channel)=== false){
                                    msg.member.roles.remove(couloir1role)
                                    msg.member.roles.add(lullyrole)
                                    let namelul = (msg.author.tag).slice(0, -5)
                                    lullychannel.send(`**${namelul}** est arrivé en salle Lully !`)
                                }
                                    
                            }
                            break;            
                
                            /*******************************************************************************************************************************************************************************/
                            /*******************************************************************************************************************************************************************************/
                            /*******************************************************************************************************************************************************************************/
                
                            case (PREFIX+'chopin'):
                                if (msg.member.roles.cache.find(name => name.name === 'Chopin')) {
                                    msg.channel.send("Vous êtes déjà à cet endroit!")
                                }else if ((msg.member.roles.cache.find(name => name.name === 'Couloir1')) 
                                || (msg.member.roles.cache.find(name => name.name === 'Mozart'))
                                || (msg.member.roles.cache.find(name => name.name === 'Lully')) 
                                || (msg.member.roles.cache.find(name => name.name === 'Liszt'))
                                || (msg.member.roles.cache.find(name => name.name === 'Dealer'))
                                || (msg.member.roles.cache.find(name => name.name === 'Hall')))
                                {
                                    msg.channel.send("Vous ne pouvez pas aller directement à cet endroit!")
                                }
                            else{
                                if(confesstab.includes(msg.channel)=== false){
                                    msg.member.roles.remove(couloir2role)
                                    msg.member.roles.add(chopinrole)
                                    let namecho = (msg.author.tag).slice(0, -5)
                                    chopinchannel.send(`**${namecho}** est arrivé en salle Chopin !`)
                                }
                                     
                            }
                            break;  
                
                            /*******************************************************************************************************************************************************************************/
                            /*******************************************************************************************************************************************************************************/
                            /*******************************************************************************************************************************************************************************/
                
                            case (PREFIX+'liszt'):
                                if (msg.member.roles.cache.find(name => name.name === 'Liszt')) {
                                    msg.channel.send("Vous êtes déjà à cet endroit!")
                                }else if ((msg.member.roles.cache.find(name => name.name === 'Couloir1')) 
                                || (msg.member.roles.cache.find(name => name.name === 'Mozart'))
                                || (msg.member.roles.cache.find(name => name.name === 'Lully')) 
                                || (msg.member.roles.cache.find(name => name.name === 'Chopin'))
                                || (msg.member.roles.cache.find(name => name.name === 'Dealer'))
                                || (msg.member.roles.cache.find(name => name.name === 'Hall')))
                                {
                                    msg.channel.send("Vous ne pouvez pas aller directement à cet endroit!")
                                }
                            else{
                                if(confesstab.includes(msg.channel)=== false){
                                    msg.member.roles.remove(couloir2role)
                                    msg.member.roles.add(lisztrole)
                                    let namelis = (msg.author.tag).slice(0, -5)
                                    lisztchannel.send(`**${namelis}** est arrivé en salle Liszt !`) 
                                }
                                    
                            }
                            break; 
                
                            /*******************************************************************************************************************************************************************************/
                            /*******************************************************************************************************************************************************************************/
                            /*******************************************************************************************************************************************************************************/
                
                            case (PREFIX+'berio'):
                                if (msg.member.roles.cache.find(name => name.name === '?????????')) {
                                    msg.channel.send("Vous êtes déjà à cet endroit!")
                                }else if ((msg.member.roles.cache.find(name => name.name === 'Couloir1')) 
                                || (msg.member.roles.cache.find(name => name.name === 'Couloir2'))
                                || (msg.member.roles.cache.find(name => name.name === 'Lully')) 
                                || (msg.member.roles.cache.find(name => name.name === 'Chopin'))
                                || (msg.member.roles.cache.find(name => name.name === 'Liszt'))
                                || (msg.member.roles.cache.find(name => name.name === 'Dealer'))
                                || (msg.member.roles.cache.find(name => name.name === 'Hall')))
                                {
                                    msg.channel.send("Vous ne pouvez pas aller directement à cet endroit!")
                                }
                            else{
                                if(confesstab.includes(msg.channel)=== false){
                                    msg.member.roles.remove(mozartrole)
                                msg.member.roles.add(beriorole)
                                let nameber = (msg.author.tag).slice(0, -5)
                                beriochannel.send(`Bienvenue **${nameber}** dans la salle secrète de Berio ! Tu peux utiliser cette salle comme bon te semble ; elle fonctionne de la même manière que les autres salles mais reste non indiquée sur le plan.De plus, un piano trône au milieu de cette salle. Tu peux jouer une mélodie avec en combinant des partitions et en réalisant les notes correspondantes. Tu dois les utiliser sous la forme d\'une commande, comme \"?DoLaMiSolRéDoLaMiLaDoFa\".\nSi tu es le premier à réaliser une mélodie unique, tu obtiendras une récompense.(Enfin, si personne d'autre ne l'a déjà utilisé, tu peux utiliser la commande \"?illumination\" pour obtenir un cadeau spécial).\n<https://youtu.be/TCuSy31jvYA> !`)      
                                }
                            }
                
                            /*******************************************************************************************************************************************************************************/
                            /*******************************************************************************************************************************************************************************/
                            /*******************************************************************************************************************************************************************************/
                
                            case (PREFIX+'mozart'):
                                if (msg.member.roles.cache.find(name => name.name === 'Mozart')) {
                                    msg.channel.send("Vous êtes déjà à cet endroit!")
                                }else if ((msg.member.roles.cache.find(name => name.name === 'Hall')) 
                                || (msg.member.roles.cache.find(name => name.name === 'Couloir2'))
                                || (msg.member.roles.cache.find(name => name.name === 'Lully')) 
                                || (msg.member.roles.cache.find(name => name.name === 'Chopin'))
                                || (msg.member.roles.cache.find(name => name.name === 'Liszt'))
                                || (msg.member.roles.cache.find(name => name.name === 'Dealer')))
                                {
                                    msg.channel.send("Vous ne pouvez pas aller directement à cet endroit!")
                                }
                            else{
                                if(confesstab.includes(msg.channel)=== false){
                                    mozarttab.forEach(function(role){
                                        msg.member.roles.remove(role);
                                    });
                                    msg.member.roles.add(mozartrole)
                                    let namemoz = (msg.author.tag).slice(0, -5)
                                    mozartchannel.send(`**${namemoz}** est arrivé en salle Mozart !`)
                                }
                                
                            }
                            break;
                    ////Player secret
            
                        case (PREFIX+'FaLaDoFaLaDoLaMiSolDoMiSolDoSol'):
                            if(countpouvoirvision === false && msg.member.roles.cache.find(name => name.name === '?????????')){
                                msg.channel.send('Félicitations, tu as débloqué le pouvoir de la partition de la mélodie de la Destinée. Ce soir à minuit, tous les joueurs recevront la vidéo correspondant à cette mélodie, sans autre indication. Tu as de plus obtenu le pouvoir suivant :\nTu peux désormais utiliser la commande "?VisionDM" dans une salle pour activer le pouvoir de la mélodie de la destinée. Tu pourras obtenir des informations sur les deux prochains Death Matchs qui auront lieu (celui-ci de ce Round et celui du Round suivant).\nPuis, tu auras 1 heure, si tu le souhaites, pour décider d\'intervertir l\'ordre des deux Death Matchs. Ce pouvoir n\'est pas réutilisable.')
                                countpouvoirvision = true;
                                let date = new Date();
                                let timer = ((23 - date.getHours())*3600000) + ((60 - date.getMinutes())*60000) + ((60 - date.getSeconds())*1000) ;
                                setTimeout(function(){
                                    confesstab.forEach(
                                        function(nom) {
                                          nom.send("<https://www.youtube.com/watch?v=24C8r8JupYY>");
                                        }
                                    );
                                    
                                }, timer );
            
                            }
                
                        break;
            
                        case (PREFIX+'LaSiSolSolLaSiSolSolDoSiDoSiSiLaSol'):
                            if(countpouvoirfortune === false && msg.member.roles.cache.find(name => name.name === '?????????')){
                                msg.channel.send('Félicitations, tu as débloqué le pouvoir de la partition de la mélodie de la Fortune. Ce soir à minuit, tous les joueurs recevront la vidéo correspondant à cette mélodie, sans autre indication. Tu as de plus obtenu le pouvoir suivant :\nTu peux désormais utiliser la commande "?Fortunemiraculeuse" dans une salle pour activer le pouvoir de la mélodie de la Fortune. Lorsque tu utiliseras cette commande, tu obtiendras 2 garnets instantanément, ainsi qu\'un Garnet supplémentaire pour chaque Round séparant l\'utilisation du "?LaSiSolSolLaSiSolSolDoSiDoSiSiLaSol" et l\'utilisation du "?Fortunemiraculeuse". Ce pouvoir n\'est pas réutilisable et peut être utilisé durant un Garnet Match.')
                                countpouvoirfortune = true;
                                let date2 = new Date();
                                let timer2 = ((23 - date2.getHours())*3600000) + ((60 - date2.getMinutes())*60000) + ((60 - date2.getSeconds())*1000) ;
                                setTimeout(function(){
                                    confesstab.forEach(
                                        function(nom) {
                                          nom.send("<https://www.youtube.com/watch?v=1UqhPdmC7yk>");
                                        }
                                    );
                                    
                                }, timer2 );
                            }
                               
                        break;
            
                        case (PREFIX+'DoSolSolDoSolSolSiFaFaMiSolSolMiSolSol'):
                            if(countpouvoirdestiny === false && msg.member.roles.cache.find(name => name.name === '?????????')){
                                msg.channel.send('Félicitations, tu as débloqué le pouvoir de la partition de la mélodie de la Tragédie. Ce soir à minuit, tous les joueurs recevront la vidéo correspondant à cette mélodie, sans autre indication. Tu as de plus obtenu le pouvoir suivant :\nTu peux désormais utiliser la commande "?Destinsliés" dans une salle pour activer le pouvoir de la mélodie de la Tragédie. Quand le joueur candidat au Death Match aura choisi son adversaire en Death Match, tu disposes de 5 minutes pour utiliser ton pouvoir. Dans ce cas, tu pourras choisir un autre joueur non immunisé à la place du joueur choisi par le joueur candidat pour participer au Death Match. Ce pouvoir ne peut pas être utilisé si tu as été choisi en Death Match et n\'est pas réutilisable.')
                                countpouvoirdestiny = true;
                                let date3 = new Date();
                                let timer3 = ((23 - date3.getHours())*3600000) + ((60 - date3.getMinutes())*60000) + ((60 - date3.getSeconds())*1000) ;
                                setTimeout(function(){
                                    confesstab.forEach(
                                        function(nom) {
                                          nom.send("<https://www.youtube.com/watch?v=oNGq16nHr-Q>");
                                        }
                                    );
                                    
                                }, timer3 );
            
                            }
                        break;
            
                        case (PREFIX+'SiSolSiSolSiDoSiSolSiSolSiRéSi'):
                            if(countpouvoirtourment === false && msg.member.roles.cache.find(name => name.name === '?????????')){
                                msg.channel.send('Félicitations, tu as débloqué le pouvoir de la partition de la mélodie du Tourment. Ce soir à minuit, tous les joueurs recevront la vidéo correspondant à cette mélodie, sans autre indication. Tu as de plus obtenu le pouvoir suivant :\nDésormais et jusqu\'à la fin du jeu, tu pourras tous les jours avant 20h nous ping pour utiliser ton pouvoir dans ton confess.\nTu recevras alors à 20h le premier message qui aura été prononcé dans le dealer par chaque joueur qui sera rentré dedans depuis aujourd\'hui. Ces phrases seront données anonymement et dans le désordre. En contrepartie, à chaque fois que tu utilises ton pouvoir, la musique de Tourment apparaîtra à 20h dans le confess des autres joueurs.\nSi le Main Match est une épreuve live, des règles spéciales d\'utilisation du pouvoir te seront précisées.')
                                countpouvoirtourment = true;
                                let date4 = new Date();
                                let timer4 = ((23 - date4.getHours())*3600000) + ((60 - date4.getMinutes())*60000) + ((60 - date4.getSeconds())*1000) ;
                                setTimeout(function(){
                                    confesstab.forEach(
                                        function(nom) {
                                          nom.send("<https://www.youtube.com/watch?v=LwVdKlPW_Vg>");
                                        }
                                    );
                                    
                                }, timer4 );
            
                            }
                        break;
            
                    //     // /*******************************************************************************************************************************************************************************/
                    //     // /*******************************************************************************************************************************************************************************/
            
                        case (PREFIX+'VisionDM'):
                            if(countpouvoirvision != false && countusevision !=true){
                                msg.channel.send("Pouvoir activé ! <@142763095113072641> <@701146045471654000> <@265095020837732354>")
                                countusevision = true;
                            }
                        break;
            
                        case (PREFIX+'Fortunemiraculeuse'):
                            if(countpouvoirfortune != false && countusefortune !=true){
                                msg.channel.send("Pouvoir activé ! <@142763095113072641> <@701146045471654000> <@265095020837732354>")
                                countusefortune = true;
                            }
                        break;
            
                        case (PREFIX+'Destinsliés'):
                            if(countpouvoirdestiny != false && countusedestiny !=true){
                                msg.channel.send("Pouvoir activé ! <@142763095113072641> <@701146045471654000> <@265095020837732354>")
                                countusedestiny = true;
                            }
                        break;
                        case (PREFIX+'illumination'):
                            if(countuseillumination !=true){
                                msg.channel.send("Pouvoir activé ! <@142763095113072641> <@701146045471654000> <@265095020837732354>")
                                countuseillumination = true;
                            }
                        break;
                        
                }
            }
            
               
        }

        // /*******************************************************************************************************************************/
        // /*******************************************************************************************************************************/
        // /*******************************************************************************************************************************/

        if (msg.member.roles.cache.find(name => name.name === 'Spectateur')){

            if ((msg.content) === '?command'){
                msg.channel.send(commandspectaembed);
            }

            if((msg.content) === '?watch'){
                let counting = 0;
                let contenuhall ='=>';
                let contenudealer = '=>';
                let contenucouloir2 ='=>';
                let contenuliszt ='=>';
                let contenuchopin ='=>';
                let contenucouloir1 ='=>';
                let contenulully ='=>';
                let contenumozart ='=>';

                let checkhall = 0;
                let checkdealer = 0;
                let checkcouloir2 = 0;
                let checkliszt = 0;
                let checkchopin = 0;
                let checkcouloir1 = 0;
                let checklully = 0;
                let checkmozart = 0;
                

                joueurlist.forEach(
                    function(player) {
                        if(player.roles.cache.find(r => r.name === "Hall")){
                            contenuhall+= joueurnomlist[counting] +' ';
                            checkhall = 1;

                        }else if(player.roles.cache.find(r => r.name === "Dealer")){
                            contenudealer+= joueurnomlist[counting] +' ';
                            checkdealer = 1;

                        }else if(player.roles.cache.find(r => r.name === "Couloir2")){
                            contenucouloir2+= joueurnomlist[counting] +' ';
                            checkcouloir2 = 1;

                        }else if(player.roles.cache.find(r => r.name === "Liszt")){
                            contenuliszt+= joueurnomlist[counting] +' ';
                            checkliszt = 1;

                        }else if(player.roles.cache.find(r => r.name === "Chopin")){
                            contenuchopin+= joueurnomlist[counting] +' ';
                            checkchopin = 1;

                        }else if(player.roles.cache.find(r => r.name === "Couloir1")){
                            contenucouloir1+= joueurnomlist[counting] +' ';
                            checkcouloir1 = 1;

                        }else if(player.roles.cache.find(r => r.name === "Lully")){
                            contenulully+= joueurnomlist[counting] +' ';
                            checklully = 1;

                        }else if(player.roles.cache.find(r => r.name === "Mozart")){
                            contenumozart+= joueurnomlist[counting] +' ';
                            checkmozart = 1;

                        }
                        counting = counting +1;
                    }

                )

                let contenutab = [contenuhall,contenudealer,contenucouloir2,contenucouloir1,contenuliszt,contenuchopin,contenulully,contenumozart]
                let checktab = [checkhall,checkdealer,checkcouloir2,checkcouloir1,checkliszt,checkchopin,checklully,checkmozart]

                let embedplan = new Discord.MessageEmbed()
                    .setColor('#B78747')
                    .setTitle('Localisation des joueurs')
                
                let counting2 = 0;
                checktab.forEach(function(check){
                    if(check === 1){
                        embedplan.addField(`${sallenomlist[counting2]}`,`${contenutab[counting2]}`)
                    }
                    counting2+=1;
                })

                embedplan.setFooter('Auteur', 'https://cdn.discordapp.com/attachments/866277336939757578/866286320866164766/Maestro.png')

                msg.channel.send(embedplan)

            }

        }
    
        /*******************************************************************************************************************************/
        /*******************************************************************************************************************************/
        /*******************************************************************************************************************************/

        if (msg.member.roles.cache.find(name => name.name === 'Master')){

            //mj
            if (((msg.content).substring(0, 10)) === '?setrules '){
                link = ((msg.content).substring(10, (msg.content).length));
            }

            if ((msg.content) === '?command'){
                msg.channel.send(commandmjembed);
            }

            if ((msg.content) === '?lock'){
                lock = !lock;
                msg.channel.send(`Lock : ${lock}`);
            }

            if ((msg.content) === '?color'){
                let colors = ['#ff0000','#4B0082','ffa500','#277ecd','#019875'];
                let joueurrole = msg.guild.roles.cache.find(name => name.name === 'Genius Player');
                let countcolor = 0;
                setInterval(() => {
                    if (countcolor == 4){
                        countcolor=0;
                    }else{
                        countcolor++;
                    }
                    joueurrole.edit({
                        color: colors[countcolor]
                    })
                }, 86400000);
            }

            if (((msg.content).substring(0,6)) === '?voice'){
                let voicetxt = (msg.content).substring(7,msg.content.lengthQ)

                confesstab.forEach(
                    function(nom) {
                      nom.send(`${voicetxt}`);
                      
                    }
                );

            }

            if((msg.content) === '?watch'){
                let counting = 0;
                let contenuhall ='=>';
                let contenudealer = '=>';
                let contenucouloir2 ='=>';
                let contenuliszt ='=>';
                let contenuchopin ='=>';
                let contenucouloir1 ='=>';
                let contenulully ='=>';
                let contenumozart ='=>';

                let checkhall = 0;
                let checkdealer = 0;
                let checkcouloir2 = 0;
                let checkliszt = 0;
                let checkchopin = 0;
                let checkcouloir1 = 0;
                let checklully = 0;
                let checkmozart = 0;
                

                joueurlist.forEach(
                    function(player) {
                        if(player.roles.cache.find(r => r.name === "Hall")){
                            contenuhall+= joueurnomlist[counting] +' ';
                            checkhall = 1;

                        }else if(player.roles.cache.find(r => r.name === "Dealer")){
                            contenudealer+= joueurnomlist[counting] +' ';
                            checkdealer = 1;

                        }else if(player.roles.cache.find(r => r.name === "Couloir2")){
                            contenucouloir2+= joueurnomlist[counting] +' ';
                            checkcouloir2 = 1;

                        }else if(player.roles.cache.find(r => r.name === "Liszt")){
                            contenuliszt+= joueurnomlist[counting] +' ';
                            checkliszt = 1;

                        }else if(player.roles.cache.find(r => r.name === "Chopin")){
                            contenuchopin+= joueurnomlist[counting] +' ';
                            checkchopin = 1;

                        }else if(player.roles.cache.find(r => r.name === "Couloir1")){
                            contenucouloir1+= joueurnomlist[counting] +' ';
                            checkcouloir1 = 1;

                        }else if(player.roles.cache.find(r => r.name === "Lully")){
                            contenulully+= joueurnomlist[counting] +' ';
                            checklully = 1;

                        }else if(player.roles.cache.find(r => r.name === "Mozart")){
                            contenumozart+= joueurnomlist[counting] +' ';
                            checkmozart = 1;

                        }
                        counting = counting +1;
                    }

                )

                let contenutab = [contenuhall,contenudealer,contenucouloir2,contenucouloir1,contenuliszt,contenuchopin,contenulully,contenumozart]
                let checktab = [checkhall,checkdealer,checkcouloir2,checkcouloir1,checkliszt,checkchopin,checklully,checkmozart]

                let embedplan = new Discord.MessageEmbed()
                    .setColor('#B78747')
                    .setTitle('Localisation des joueurs')
                
                let counting2 = 0;
                checktab.forEach(function(check){
                    if(check === 1){
                        embedplan.addField(`${sallenomlist[counting2]}`,`${contenutab[counting2]}`)
                    }
                    counting2+=1;
                })

                embedplan.setFooter('Auteur', 'https://cdn.discordapp.com/attachments/866277336939757578/866286320866164766/Maestro.png')

                msg.channel.send(embedplan)

            }
      
        }
    }

});
  
bot.login('')

