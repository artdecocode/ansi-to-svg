const defaultContainer = ({
	foregroundColor, content, width, height, backgroundColor, font
}) => {
	const attrs = []
	if (font) {
		attrs.push(`font-family="${font.family}"`)
		attrs.push(`font-size="${font.size}"`)
	}
	const attrsString = attrs.length ? ` ${attrs.join(' ')}` : ''

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0, 0, ${width}, ${height}"${attrsString}><g fill="${foregroundColor}"><rect x="0" y="0" width="${width}" height="${height}" fill="${backgroundColor}"/>${content}</g></svg>`
}

module.exports = defaultContainer
