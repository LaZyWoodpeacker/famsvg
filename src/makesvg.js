export default function Svg(list) {
    const vectorizeText = require("vectorize-text")
    const fullWidth = 150;
    const fullHeight = 50
    const svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    svg.setAttribute('viewBox', `0 0 ${fullWidth} ${fullHeight}`);
    svg.setAttribute('class', `svgview`);
    svg.setAttribute("width", fullWidth + "mm");
    svg.setAttribute("height", fullHeight + "mm");

    const makeEm = (tag, attrs, text = '', cback = false) => {
        const em = document.createElementNS("http://www.w3.org/2000/svg", tag);
        for (let attr of Object.keys(attrs)) {
            em.setAttribute(attr, attrs[attr]);
        }
        em.innerHTML = text;
        if (cback) {
            cback(em)
        };
        return em;
    }

    const makeText = (cx, cy, sizeWidth, sizeHeight, abrOut = 1, abrIn = 1, betw = 1, text = 'test') => {
        const makeFamQuad = (cx, cy, sizeWidth, sizeHeight, abrOut = 1, abrIn = 1, betw = 1) => {
            const outBorder = makeEm('rect', { x: cx, y: cy, width: sizeWidth, height: sizeHeight, 'stroke-width': abrOut, style: "fill:none;stroke:black;stroke-opacity:1", class: 'listEm' }, null, em => svg.appendChild(em));
            const inBorder = makeEm('rect', { x: cx + betw, y: cy + betw, width: sizeWidth - betw * 2, height: sizeHeight - betw * 2, 'stroke-width': abrIn, style: "fill:none;stroke:black;stroke-opacity:1" }, null, em => svg.appendChild(em));
            return { inBorder, outBorder };
        }

        const drawText = (em, text, fs = 30) => {
            let x = em.x.baseVal.value;
            let y = em.y.baseVal.value;
            x += 5;
            y += 14.3;
            const txt = makeEm('text', { x, y, id: "testid", stroke: 0, width: '10px', style: `fill:red;font-family:'Rubik Mono One', sans-serif` }, text, inem => svg.appendChild(inem));
            return txt;
        }

        const { inBorder, outBorder } = makeFamQuad(cx, cy, sizeWidth, sizeHeight, abrOut, abrIn, betw);
        const txt = drawText(inBorder, text);
        return { txt, inBorder, outBorder }
    }

    const { txt, inBorder, outBorder } = makeText(0, 0, 120, 35, 1, 2, 2, list[0]);
    return { svg, list, txt, outBorder, inBorder }
}