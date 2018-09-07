const ceil = n => {
	const r = Math.ceil(n)
	return r
}

const curve = ({x: fromX, y: fromY}, {x: toX, y: toY}) => {
	const dy = toY - fromY
	const dx = toX - fromX
	const hdy = dy / 2
	const hdx = dx / 2
	const p3 = `${toX} ${toY}`
	let p1
	let p2
	if (dy > 0 && dx < 0) {
		p1 = `${fromX} ${fromY + hdy}`
		p2 = `${fromX + hdx} ${toY}`
	} else if (dy < 0 && dx < 0) {
		p1 = `${fromX + hdx} ${fromY}`
		p2 = `${toX} ${toY - hdy}`
	}
	return `C ${p1}, ${p2}, ${p3}`
}

const getFilterDim = (w, h, b2, blurOffsetY) => {
	// B2 is width and height of blur outside of the container on each side
	const wf = b2 / w // Percent of blur to width
	const hf = b2 / h // Percent of blur to height
	const oyf = blurOffsetY / h // Percent of margin-top to height

	const fx = ceil(wf * 100)
	const fy = ceil(Math.min(oyf, hf) * 100)

	const fw = 100 + (fx * 2)
	const fh = 100 + ((hf + oyf) * 100) + fy

	const attrs = [
		`x="-${fx}%"`,
		`y="-${fy}%"`,
		`width="${fw}%"`,
		`height="${fh}%"`
	]
	const s = attrs.join(' ')
	const r = attrs.length ? ` ${s}` : ''
	return r
}

const terminalContainer = ({
	backgroundColor,
	foregroundColor, content, width, height, noStretch, title = '', font,
	minWidth = 0, minHeight = 0, paddingY = 5, paddingX = 5, noShadow
}) => {
	const tbHeight = 22
	const w = Math.max(minWidth, width + (paddingX * 2))
	const h = Math.max(minHeight, height + tbHeight + (paddingY * 2))
	const r = 5.25
	const r2 = r + 0.25
	const lineY = tbHeight
	const lnHeight = 1
	const bodyY = lineY + lnHeight
	const rd = 3
	const rd2 = rd * 2
	const borderColor = '#000000'
	const bAlpha = '0.2'
	const attrs = []
	const blur = 27.5
	const b2 = blur * 2
	const blurOffsetY = 25
	const ww = (noShadow ? 0 : blur * 4) + w + 2
	const hh = (noShadow ? 0 : blur * 4) + h + 2

	if (font) {
		attrs.push(`font-family="${font.family}"`)
		attrs.push(`font-size="${font.size}"`)
	}
	const attrsString = attrs.length ? ` ${attrs.join(' ')}` : ''
	const wb = `viewBox="0, 0, ${ww}, ${hh}"`
	const dims = noStretch ? ` width="${ww}px" height="${hh}px"` : ''

	const filter = noShadow ? '' : `
<filter${getFilterDim(w, h, b2, blurOffsetY)} id="shadow">
  <feOffset dx="0" dy="${blurOffsetY}" in="SourceAlpha" result="so"/>
  <feGaussianBlur stdDeviation="${blur}" in="so" result="sb"/>
  <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0"  type="matrix" in="sb" result="sm"/>
  <feMerge>
    <feMergeNode in="sm"/>
    <feMergeNode in="SourceGraphic"/>
  </feMerge>
</filter>`.trim()

	return `<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"${dims} ${wb}>
  <defs>${filter}
    <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="tb">
      <stop stop-color="#FFFFFF" offset="0%"/>
      <stop stop-color="#F5F4F5" offset="5%"/>
      <stop stop-color="#D3D3D3" offset="100%"/>
    </linearGradient>
  </defs>
  <g${noShadow ? ' transform="translate(1, 1)"' : ` filter="url(#shadow)" transform="translate(${b2}, ${blurOffsetY})"`} fill="none">
    <rect width="${w}" height="${h}" rx="${rd2}" stroke="${borderColor}" stroke-opacity="${bAlpha}" fill="${foregroundColor}"/>

    <path d="M${rd2},0 C${rd},0 0,${rd} 0,${rd2} L0,${tbHeight} L${w},${tbHeight} L${w},${rd2} C${w},${rd} ${w - rd},0 ${w - rd2},0 Z" fill="url(#tb)"/>

    <text x="${w / 2}" y="16" font-family="HelveticaNeue, Helvetica Neue" font-size="13" letter-spacing="0.4" fill="#464646" text-anchor="middle">
      ${title}
    </text>
    <g transform="translate(9, 6)">
      <g>
        <circle fill="#FF5F52" cx="5" cy="5" r="${r}"/>
        <circle stroke="#E33E32" stroke-width="1" cx="5" cy="5" r="${r2}"/>
      </g>
      <g>
        <circle fill="#FFBE05" cx="25" cy="5" r="${r}"/>
        <circle stroke="#E2A100" stroke-width="1" cx="25" cy="5" r="${r2}"/>
      </g>
      <g>
        <circle fill="#15CC35" cx="45" cy="5" r="${r}"/>
        <circle stroke="#17B230" stroke-width="1" cx="45" cy="5" r="${r2}"/>
      </g>
    </g>

    <path d="M${w},${lineY} L${w},${h - rd2} ${curve({x: w, y: h - rd2}, {x: w - rd2, y: h})} L${rd2},${h} ${curve({x: rd2, y: h}, {x: 0, y: h - rd2})} L0,${lineY} Z" fill="${foregroundColor}"/>

    <line x1="0" y1="${lineY + 0.5}" x2="${w}" y2="${lineY + 0.5}" stroke="#7E7E7E" shape-rendering="crispEdges"/>

    <g transform="translate(${paddingX}, ${bodyY + paddingY})" fill="${backgroundColor}"${attrsString}>
      ${content}
    </g>
  </g>
</svg>`
}

module.exports = terminalContainer
