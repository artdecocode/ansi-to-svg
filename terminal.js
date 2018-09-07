const fs = require('fs')
const chalk = require('chalk')
const ansiToSVG = require('.')
const container = require('./containers/terminal')

const ansiText = chalk`{green 👋 Hello}, {blueBright World} 🌏{redBright !}\n` +
	chalk.bgRed('👋') +
	chalk.bgYellow('🦄') +
	chalk.bgGreen('🐘') + ' ' +
	chalk.strikethrough.italic('13') +
	chalk.bold('3') + chalk.underline('7') + ' ' +
	chalk.bgCyan('🍄') +
	chalk.bgBlue('🎃') +
	chalk.bgMagenta('🐦')

const result = ansiToSVG(ansiText, {
	fontFamily: 'Courier',
  container,
  containerOptions: {
		title: '⚡️Terminal',
		noStretch: true,
		minWidth: 250,
		minHeight: 100,
		// noShadow: true,
	},
	colors: {
		foregroundColor: '#FFFFFF',
	},
})
const outputFile = './examples/terminal.svg'
fs.writeFileSync(outputFile, result)