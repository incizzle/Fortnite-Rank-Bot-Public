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
            requiredPermissions: [],
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
            extendedHelp: 'Links to a discord server where u can get vbucks for cheap :)',
            usage: '',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message) {
        message.channel.send({embed: {
            color: 0xff0000,
            title: `Want cheap vbucks? Check out the discord server below :)`,
            timestamp: new Date(),
            footer: {
                icon_url: this.client.user.avatarURL,
                text: `@${this.client.user.username}`
                }
        }});
        message.channel.send("https://discord.gg/Z8qHU73")
        console.log(`${message.author.username}: ${message.content}`)
        ;
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
