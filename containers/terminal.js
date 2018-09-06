const terminalContainer = ({
    backgroundColor,
    foregroundColor, content, width, height, stretch, title = '', font,
}) => {
    const w = 400
    const tbHeight = 22
    const r = 5.25
    const r2 = r + .25
    const lineY = tbHeight + 1
    const lnHeight = 1
    const bodyY = lineY + lnHeight
    const h = 300
    const rd = 3
    return `
<svg width="900px" height="426px" viewBox="0 0 900 426" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <filter
        filterUnits="userSpaceOnUse" id="shadow">
            <feOffset dx="0" dy="25" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
            <feGaussianBlur stdDeviation="25" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1" result="shadowMatrixOuter1"></feColorMatrix>
            <feMerge>
                <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
        </filter>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-2">
            <stop stop-color="#F2F2F2" offset="0%"></stop>
            <stop stop-color="#DCDCDC" offset="5%"></stop>
            <stop stop-color="#C8C8C8" offset="100%"></stop>
        </linearGradient>
        <circle id="path-3" cx="91" cy="11" r="11"></circle>
        <circle id="path-4" cx="51" cy="11" r="11"></circle>
        <circle id="path-5" cx="11" cy="11" r="11"></circle>
    </defs>
    <g filter="url(#shadow)" transform="translate(50, 25)" fill="none">
        <path d="M${rd*2},0 C${rd},0 0,${rd} 0,${rd*2} L0,${tbHeight} L${w},${tbHeight} L${w},${rd*2} C${w},${rd} ${w-rd},0 ${w-rd*2},0 Z" id="Toolbar-BG" fill-opacity="0.9" fill="url(#linearGradient-2)"/>

        <text x="${w/2}" y="17" font-family="HelveticaNeue, Helvetica Neue" font-size="13" letter-spacing="0.4" fill="#464646" text-anchor="middle">
            ${title}
        </text>
        <g transform="translate(9, 6)">
            <g>
                <circle fill="#FF5F52" cx="5" cy="5" r="${r}" />
                <circle stroke="#E33E32" stroke-width="1" cx="5" cy="5" r="${r2}" />
            </g>
            <g>
                <circle fill="#FFBE05" cx="25" cy="5" r="${r}" />
                <circle stroke="#E2A100" stroke-width="1" cx="25" cy="5" r="${r2}" />
            </g>
            <g id="green">
                <circle fill="#15CC35" cx="45" cy="5" r="${r}" />
                <circle stroke="#17B230" stroke-width="1" cx="45" cy="5" r="${r2}" />
            </g>
        </g>

        <path d="M0,${lineY} L${w},${lineY}" stroke="#BFBFBF" stroke-width="${lnHeight}" />

        <path d="M0,${bodyY} L${w},${bodyY} L${w},${h} C${w},${h + rd} ${w - rd},${h + rd*2} ${w - rd*2},${h + rd*2} L${rd*2},${h + rd*2} C${rd},${h + rd*2} 0,${h + rd} 0,${h} Z" id="Rectangle" fill="${foregroundColor}"></path>

        <g transform="translate(5, ${bodyY + 5})" fill="${backgroundColor}">
            ${content}
        </g>
    </g>
</svg>
`
}

module.exports = terminalContainer