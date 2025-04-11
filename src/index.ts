import { Bot } from './bot'
import { env } from './util/config'
import { createLogger } from './util/logger'

const run = async () => {
  const logger = createLogger({name: 'Runner'})
  logger.info(`Running ${process.env.npm_package_name} ${process.env.npm_package_version} (${env.NODE_ENV})`)
  logger.info('System Info: Node.js ' + process.version + ' OS: ' + process.platform)
  logger.debug(`DebugMode is enabled.`)

  const bot = await Bot.create()

  await bot.start()

  const closeSignal = async () => {
    setTimeout(() => process.exit(1), 10000).unref()
    await bot.close()
  }

  process.on('SIGHUP', closeSignal)
  process.on('SIGINT', closeSignal)
  process.on('SIGTERM', closeSignal)
}

run()
