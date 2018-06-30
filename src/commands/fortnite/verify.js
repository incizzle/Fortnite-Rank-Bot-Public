const { Command } = require('klasa');
const Client = require('fortnite.js');
const Fortnite = new Client('14a60081-3275-418a-9d2d-8332aed1b001');


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
            aliases: ["verify"],
            autoAliases: true,
            bucket: 1,
            cooldown: 0,
            promptLimit: 0,
            promptTime: 30000,
            deletable: false,
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            description: 'Verfies Users Ingame K/D',
            extendedHelp: 'No extended help available.',
            usage: '',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message) {
        if (message.channel.id === message.guild.settings.commandchannel) {
            if (message.guild.settings.verifiedrole == "") {
                message.channel.send({embed: {
                    color: 0xff0000,
                    description: `There is no set Verified Role`,
                    timestamp: new Date(),
                    footer: {
                        icon_url: this.client.user.avatarURL,
                        text: `@${this.client.user.username}`
                        }
                }});
            }
            else {
                if (message.content = message.mentions.members.first())
                {
                    let data = Fortnite.get(message.mentions.members.first().displayName, 'pc').then(data => {
                        if ( data.curr_squad.kd.value > message.guild.settings.minkd) {
                            message.channel.send({embed: {
                                color: 0xff0000,
                                description: `${message.mentions.members.first().displayName} has a ${data.curr_squad.kd.value} K/D. I have given them the Verified Role!`,
                                timestamp: new Date(),
                                footer: {
                                    icon_url: this.client.user.avatarURL,
                                    text: `@${this.client.user.username}`
                                    }
                            }});
                            var role = message.guild.roles.get(message.guild.settings.verifiedrole)
                            message.mentions.members.first().addRole(role).catch(e => {
                                console.log(e)
                            })
                        }
                        else {
                            message.channel.send({embed: {
                                color: 0xff0000,
                                description: `${message.mentions.members.first().displayName} doesn't have a ${message.guild.settings.minkd} K/D <@&436938670419869706>`,
                                timestamp: new Date(),
                                footer: {
                                    icon_url: this.client.user.avatarURL,
                                    text: `@${this.client.user.username}`
                                    }
                            }});
                        }
                    }).catch(e => {
                        console.log(e)
                        message.channel.send({embed: {
                            color: 0xff0000,
                            description: `${message.author} Looks like something went wrong :( . Make sure their nickname is their exact IGN`,
                            timestamp: new Date(),
                            footer: {
                                icon_url: this.client.user.avatarURL,
                                text: `@${this.client.user.username}`
                                }
                        }});
                    })
                }
                else{
                    let data = Fortnite.get(message.member.displayName, 'pc').then(data => {
                        if ( data.curr_squad.kd.value > message.guild.settings.minkd) {
                            message.channel.send({embed: {
                                color: 0xff0000,
                                description: `${message.member.displayName} has a ${data.curr_squad.kd.value} K/D. I have given them the Verified Role!`,
                                timestamp: new Date(),
                                footer: {
                                    icon_url: this.client.user.avatarURL,
                                    text: `@${this.client.user.username}`
                                    }
                            }});
                            var role = message.guild.roles.get(message.guild.settings.verifiedrole)
                            message.member.addRole(role).catch(e => {
                                console.log(e)
                            })
                        }
                        else {
                            message.channel.send({embed: {
                                color: 0xff0000,
                                description: `${message.member.nickname} doesn't have a ${message.guild.settings.minkd} K/D <@&436938670419869706>`,
                                timestamp: new Date(),
                                footer: {
                                    icon_url: this.client.user.avatarURL,
                                    text: `@${this.client.user.username}`
                                    }
                            }});
                        }
                }).catch(e => {
                    console.log(e)
                    message.channel.send({embed: {
                        color: 0xff0000,
                        description: `${message.author} Looks like something went wrong :( . Make sure your nickname is your exact IGN`,
                        timestamp: new Date(),
                        footer: {
                            icon_url: this.client.user.avatarURL,
                            text: `@${this.client.user.username}`
                            }
                    }});
                })
                }   
            }
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
