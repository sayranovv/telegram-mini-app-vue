import { Telegraf, Markup } from 'telegraf'

const token = ''
const webAppUrl = 'https://telegram-clicker-app.web.app/'

const bot = new Telegraf(token)

bot.command('start', (ctx) => {
    ctx.reply(
        'Hi! Press to start the app',
        Markup.inlineKeyboard([
            Markup.button.webApp(
                'Open mini app',
                `${webAppUrl}?ref=${ctx.payload}`
            )
        ])
    )
})

bot.launch()