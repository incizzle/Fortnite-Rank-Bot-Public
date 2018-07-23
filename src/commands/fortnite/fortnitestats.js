const { Command, Client  } = require('klasa');
const FortniteTrackerClient = require('fortnite.js');
const Fortnite = new FortniteTrackerClient('14a60081-3275-418a-9d2d-8332aed1b001');

module.exports = class extends Command {

    constructor(...args) {
        /**
         * Any default options can be omitted completely.
         * if all options are default, you can omit the constructor completely
         */
        super(...args, {
            enabled: true,
            runIn: ['text'],
            requiredPermissions: [],
            requiredSettings: [],
            aliases: ["ftn", "fs", "fts", "fn"],
            autoAliases: true,
            bucket: 1,
            cooldown: 0,
            promptLimit: 0,
            promptTime: 30000,
            deletable: false,
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            description: 'Displays detailed stats of given IGN',
            extendedHelp: 'No extended help available.',
            usage: '',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message, Client ) {
        console.log(`${message.author.username}: ${message.content}`)
        if (message.channel.id === message.guild.settings.commandchannel) {
            const args = message.content.slice("!".length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
            let username =  args.join(" ");
            let urlusername = args.join("%20");
            let data = Fortnite.get(username, 'pc').then(data => {
            message.channel.send({embed: {
                color: 0xff0000,
                author: {
                name: `${username}'s Stats`,
                icon_url: message.author.avatarURL
                },
                title: `Fortnite Tracker for ${username}`,
                url: `https://fortnitetracker.com/profile/pc/${urlusername}`,
                //description: "",
                fields: [{
                    name: "**__Solo Season 5__**",
                    value: `TRN Rating: **${data.curr_solo.trnRating.value}**
K/D: **${data.curr_solo.kd.value}**
Kills: **${data.curr_solo.kills.value}** 
Wins: **${data.curr_solo.top1.value}**
Matches Played: **${data.curr_solo.matches.value}**`,
                    inline: true,
                },
                {
                    name: "**__Duo Season 5__**",
                    value: `TRN Rating: **${data.curr_duo.trnRating.value}**
K/D: **${data.curr_duo.kd.value}**
Kills: **${data.curr_duo.kills.value}** 
Wins: **${data.curr_duo.top1.value}**
Matches Played: **${data.curr_duo.matches.value}**`,
                    inline: true,
                },
                {
                    name: "**__Squad Season 5__**",
                    value: `TRN Rating: **${data.curr_squad.trnRating.value}**
K/D: **${data.curr_squad.kd.value}**
Kills: **${data.curr_squad.kills.value}** 
Wins: **${data.curr_squad.top1.value}**
Matches Played: **${data.curr_squad.matches.value}**`,
                    inline: true,
                },
                {
                    name: "**__Solo Season 4__**",
                    value: `TRN Rating: **${data.prior_solo.trnRating.value}**
K/D: **${data.prior_solo.kd.value}** 
Kills: **${data.prior_solo.kills.value}** 
Wins: **${data.prior_solo.top1.value}**
Matches Played: **${data.prior_solo.matches.value}**`,
                    inline: true,
                },
                {
                    name: "**__Duo Season 4__**",
                    value: `TRN Rating: **${data.prior_duo.trnRating.value}**
K/D: **${data.prior_duo.kd.value}**
Kills: **${data.prior_duo.kills.value}** 
Wins: **${data.prior_duo.top1.value}**
Matches Played: **${data.prior_duo.matches.value}**`,
                    inline: true,
                },
                {
                    name: "**__Squad Season 4__**",
                    value: `TRN Rating: **${data.prior_squad.trnRating.value}**
K/D: **${data.prior_squad.kd.value}**
Kills: **${data.prior_squad.kills.value}** 
Wins: **${data.prior_squad.top1.value}**
Matches Played: **${data.prior_squad.matches.value}**`,
                    inline: true,
                },
                {
                    name: "**__Solo Overall__**",
                    value: `TRN Rating: **${data.solo.trnRating.value}**
K/D: **${data.solo.kd.value}** 
Kills: **${data.solo.kills.value}** 
Wins: **${data.solo.top1.value}**
Matches Played: **${data.solo.matches.value}**`,
                    inline: true,
                },
                {
                    name: "**__Duo Overall__**",
                    value: `TRN Rating: **${data.duo.trnRating.value}**
K/D: **${data.duo.kd.value}**
Kills: **${data.duo.kills.value}** 
Wins: **${data.duo.top1.value}**
Matches Played: **${data.duo.matches.value}**`,
                    inline: true,
                },
                {
                    name: "**__Squad Overall__**",
                    value: `TRN Rating: **${data.squad.trnRating.value}**
K/D: **${data.squad.kd.value}**
Kills: **${data.squad.kills.value}** 
Wins: **${data.squad.top1.value}**
Matches Played: **${data.squad.matches.value}**`,
                    inline: true,
                },
                {
                    name: "-",
                    value: `-`,
                    inline: true,
                },
                {
                    name: "**__LifeTime Stats__**",
                    value: `K/D: **${data.stats.kd}**
Wins: **${data.stats.top1}**
Kills: **${data.stats.kills}** 
Win Percent: **${data.stats.winPercent}** 
Matches Played: **${data.stats.matches}**`,
                    inline: true,
                },
                {
                    name: "-",
                    value: `-`,
                    inline: true,
                }
                ],
                timestamp: new Date(),
                footer: {
                icon_url: this.client.user.avatarURL,
                text: `@${this.client.user.username}`
                }
            }});
            
        }).catch(e => {
            console.log(e)
            message.channel.send({embed: {
                color: 0xff0000,
                description: `${message.author} Doesnt look like I can find the user **${username}**.

**__Usage:__** ${message.guild.settings.prefix}ftn InGameName`,
                timestamp: new Date(),
                footer: {
                    icon_url: this.client.user.avatarURL,
                    text: `@${this.client.user.username}`
                    }
            }});
        })
        }
        else{
            message.channel.send({embed: {
                color: 0xff0000,
                description: `${message.author} Please only use commands in <#${message.guild.settings.commandchannel}> thanks!`,
                timestamp: new Date(),
                footer: {
                    icon_url: this.client.user.avatarURL,
                    text: `@${this.client.user.username}`
                    }
            }}).then(message => {
                message.delete(10000)
              })
              .catch(console.error);
        }
    }
    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
