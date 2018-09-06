const terminalContainer = ({
    backgroundColor,
    foregroundColor, content, width, height, stretch, title = '', font,
}) => {
    const w = 400
    const h = 300
    const tbHeight = 22
    const r = 5.25
    const r2 = r + .25
    const lineY = tbHeight
    const lnHeight = 1
    const bodyY = lineY + lnHeight
    const rd = 3
    const borderColor = '#000000'
    const bAlpha = '0.2'
    const attrs = []
    const blur = 27.5
    const blurOffsetY = 25
    const ww = (blur * 4) + w + 2
    const hh = (blur * 4) + h + 2

    if (font) {
		attrs.push(`font-family="${font.family}"`)
		attrs.push(`font-size="${font.size}"`)
	}
    const attrsString = attrs.length ? ` ${attrs.join(' ')}` : ''
    const wb = `viewBox="0, 0, ${ww}, ${hh}"`

    return `<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ${wb}>
    <defs>
        <filter
        filterUnits="userSpaceOnUse" id="shadow">
            <feOffset dx="0" dy="${blurOffsetY}" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
            <feGaussianBlur stdDeviation="${blur}" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1" result="shadowMatrixOuter1"></feColorMatrix>
            <feMerge>
                <feMergeNode in="shadowMatrixOuter1"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="tb">
            <stop stop-color="#FFFFFF" offset="0%"/>
            <stop stop-color="#F5F4F5" offset="5%"/>
            <stop stop-color="#D3D3D3" offset="100%"/>
        </linearGradient>
    </defs>
    <g filter="url(#shadow)" transform="translate(${blur * 2}, ${blurOffsetY})" fill="none">
        <rect width="${w}" height="${h}" rx="${rd * 2}" stroke="${borderColor}" stroke-opacity="${bAlpha}" fill="${foregroundColor}"/>

        <path d="M${rd*2},0 C${rd},0 0,${rd} 0,${rd*2} L0,${tbHeight} L${w},${tbHeight} L${w},${rd*2} C${w},${rd} ${w-rd},0 ${w-rd*2},0 Z" fill="url(#tb)"/>

        <text x="${w/2}" y="16" font-family="HelveticaNeue, Helvetica Neue" font-size="13" letter-spacing="0.4" fill="#464646" text-anchor="middle">
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

        <path d="M${w},${lineY} L${w},${h-rd*2} ${curve({ x: w, y: h-rd*2 }, { x: w - rd * 2, y: h})} L${rd*2},${h} ${curve({x: rd*2, y: h}, {x: 0,y: h-rd*2})} L0,${lineY} Z" fill="${foregroundColor}"/>

        <line x1="0" y1="${lineY+.5}" x2="${w}" y2="${lineY+.5}" stroke="#7E7E7E"/>

        <g transform="translate(5, ${bodyY + 5})" fill="${backgroundColor}"${attrsString}>
            ${content}
        </g>
    </g>
</svg>
`
}

console.log('expected height: 412')
console.log('expected width: 512')

const curve = ({ x: fromX, y: fromY }, { x: toX, y: toY }) => {
    const dy = toY - fromY
    const dx = toX - fromX
    const hdy = dy / 2
    const hdx = dx / 2
    const p3 = `${toX} ${toY}`
    let p1, p2
    if (dy > 0 && dx < 0) {
        p1 = `${fromX} ${fromY + hdy}`
        p2 = `${fromX + hdx} ${toY}`
    } else if (dy < 0 && dx < 0) {
        p1 = `${fromX + hdx} ${fromY}`
        p2 = `${toX} ${toY - hdy}`
    }
    return `C ${p1}, ${p2}, ${p3}`
}

module.exports = terminalContainer
