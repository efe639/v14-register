const {discord, EmbedBuilder,AttachmentBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle ,ApplicationCommandPermissionsManager  } = require("discord.js")
const cevap = require("../../../Config/cevaplar")
const rol = require("../../../Config/roller")
const emojiler = require("../../../Config/emojiler")
const settings = require("../../../Config/settings")
const randomstring = require("random-string")

const isimler = require("../../../schemas/isimler")
const regstats = require("../../../schemas/registerStats");
const toplam = require("../../../schemas/toplam");
const roller = require("../../../Config/roller")

module.exports = {
    command: {
        name: ["isimler","isimgeçmişi"],
        desc: "İsimler",
        category: "Register",
    },
    async run({ client, message, args }) {
        let üye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
 
        if(!message.member.roles.cache.has(rol.roller.RegPerm) && !message.member.roles.cache.has(rol.roller.Owner) && !message.member.roles.cache.has(rol.roller.Owner2) && !message.member.roles.cache.has(rol.roller.Ceo) && !message.member.roles.cache.has(rol.roller.PANKART) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)){  
            const embed = new EmbedBuilder() 
            .setAuthor({name : message.member.user.username , iconURL : message.member.user.displayAvatarURL({dynamic : true ,size : 4096})})
            .setDescription(cevap.cevaplar.NotRegPerm)
            .setColor(client.redColor())
            .setThumbnail(message.member.user.displayAvatarURL({dynamic : true , size : 4096}))
            .setFooter({text : message.guild.name})
            message.reply({embeds : [embed]})
            return
        }

        if(!üye){
    const embed = new EmbedBuilder() 
    .setAuthor({name : message.member.user.username , iconURL : message.member.user.displayAvatarURL({dynamic : true ,size : 4096})})
    .setDescription(cevap.cevaplar.NotMember)
    .setColor(client.redColor())
    .setFooter({text : message.guild.name})
    message.reply({embeds : [embed]})
    return
        }

       

        const data = await isimler.findOne({ guildID: message.guild.id, userID: üye.user.id });
       const embed = new EmbedBuilder()
        .setDescription(data ? data.names.splice(0, 15).map((x, i) => `\`${i + 1}.\` \`${x.name}\` (${x.rol})`).join("\n") : "Bu kullanıcıya ait isim geçmişi bulunmuyor!")
        .setAuthor({ name: message.member.user.username, iconURL: message.member.user.displayAvatarURL({dynamic : true})})
        .setColor(client.redColor())
     
        const msg = await message.reply({embeds : [embed]})

        
        

    }}