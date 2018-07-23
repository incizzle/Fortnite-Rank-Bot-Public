const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        /**
         * Any default options can be omitted completely.
         * if all options are default, you can omit the constructor completely
         */
        super(...args, {
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            requiredPermissions: ["MANAGE_MESSAGES"],
            requiredSettings: [],
            aliases: [],
            autoAliases: true,
            bucket: 1,
            cooldown: 0,
            promptLimit: 0,
            promptTime: 30000,
            deletable: false,
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            description: '',
            extendedHelp: 'No extended help available.',
            usage: '',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message, [...params]) {
        // This is where you place the code you want to run for your command
        const args = message.content.slice("!".length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        if (args[0] > 0) {
            message.channel.bulkDelete(args[0]).then(
            message.channel.send({embed: {
                color: 0xff0000,
                description: `I Have deleted ${args[0]} messages!`,
                timestamp: new Date(),
                footer: {
                    icon_url: this.client.user.avatarURL,
                    text: `@${this.client.user.username}`
                    }
            }}).then(message => {
                message.delete(5000)
              })
              .catch(console.error)).catch(e => {
                message.reply("Looks like Something Went Wrong :/ (P.S. I can only delete messages newer then 14 days.)").then(message => {
                    message.delete(5000)
                  })
            })
            
        }
        else {
            message.channel.send({embed: {
                color: 0xff0000,
                description: `"${args[0]}" is a invalid number!`,
                timestamp: new Date(),
                footer: {
                    icon_url: this.client.user.avatarURL,
                    text: `@${this.client.user.username}`
                    }
            }}).then(message => {
                message.delete(5000)
              })
              .catch(console.log("some error :/"));
        }

    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
