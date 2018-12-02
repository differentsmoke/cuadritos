import "./components.css";

const xmlns = "http://www.w3.org/2000/svg";

export function createComponents(scale, callback) {
    function createTile(face) {
        const { claimedBy } = face;

        const tile = document.createElementNS(xmlns, "rect");
        const tileAttributes = Object.assign(Object.create(null), {
            x: face.x * scale,
            y: face.y * scale,
            width: face.width * scale,
            height: face.height * scale,
            class: claimedBy
        });

        Object.keys(tileAttributes).forEach(key =>
            tile.setAttribute(key, tileAttributes[key])
        );
        return tile;
    }

    function createEdge(edge) {
        const { A, B, set } = edge;
        if (set) {
            const line = document.createElementNS(xmlns, "line");
            line.setAttribute("x1", A.x * scale);
            line.setAttribute("y1", A.y * scale);
            line.setAttribute("x2", B.x * scale);
            line.setAttribute("y2", B.y * scale);
            line.classList.add("set-edge");
            return line;
        } else {
            const group = document.createElementNS(xmlns, "g");
            group.classList.add("edge");
            const line = document.createElementNS(xmlns, "line");
            line.setAttribute("x1", A.x * scale);
            line.setAttribute("y1", A.y * scale);
            line.setAttribute("x2", B.x * scale);
            line.setAttribute("y2", B.y * scale);
            line.classList.add("visible");
            const active = document.createElementNS(xmlns, "line");
            active.setAttribute("x1", A.x * scale);
            active.setAttribute("y1", A.y * scale);
            active.setAttribute("x2", B.x * scale);
            active.setAttribute("y2", B.y * scale);
            active.classList.add("active");
            group.appendChild(line);
            group.appendChild(active);
            group.onclick = function() {
                edge.set = true;
                edge.update = true;
                callback();
            };
            return group;
        }
    }

    return { createTile, createEdge };
}
