import "./components.css";

const xmlns = "http://www.w3.org/2000/svg";

export function createComponents(root, scale, callback) {
    const tiles = document.createElementNS(xmlns, "g");
    const edges = document.createElementNS(xmlns, "g");
    const vertices = document.createElementNS(xmlns, "g");

    root.appendChild(tiles);
    root.appendChild(edges);
    root.appendChild(vertices);

    function createTile(face) {
        if (face.element) {
            tiles.removeChild(face.element);
        }

        const { claimedBy } = face;

        const group = document.createElementNS(xmlns, "g");

        const tile = document.createElementNS(xmlns, "rect");
        const tileAttributes = {
            x: face.x * scale,
            y: face.y * scale,
            width: face.width * scale,
            height: face.height * scale,
            class: claimedBy
        };

        const text = document.createElementNS(xmlns, "text");
        const textAttributes = {
            x: face.x * scale + (face.width * scale) / 2,
            y: face.y * scale + (face.height * scale) / 2
        };
        text.textContent = "" + face.index;

        Object.keys(tileAttributes).forEach(key =>
            tile.setAttribute(key, tileAttributes[key])
        );
        Object.keys(textAttributes).forEach(key =>
            text.setAttribute(key, textAttributes[key])
        );

        group.appendChild(tile);
        group.appendChild(text);

        tiles.appendChild(group);

        return group;
    }

    function createEdge(edge) {
        const { A, B, state } = edge;
        if (state === "set") {
            edges.removeChild(edge.element);
            const line = document.createElementNS(xmlns, "line");
            line.setAttribute("x1", A.x * scale);
            line.setAttribute("y1", A.y * scale);
            line.setAttribute("x2", B.x * scale);
            line.setAttribute("y2", B.y * scale);
            line.classList.add("set-edge");
            edges.appendChild(line);
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
                edge.state = "clicked";
                callback();
            };

            edges.appendChild(group);

            return group;
        }
    }

    function createDot(point) {
        const { x, y } = point;
        const circle = document.createElementNS(xmlns, "circle");
        const svgCircleAttributes = [
            ["cx", x * scale],
            ["cy", y * scale],
            ["r", 4],
            ["class", "dot"]
        ];
        svgCircleAttributes.forEach(function(attribute) {
            const [key, value] = attribute;
            circle.setAttribute(key, value);
        });
        vertices.appendChild(circle);
        return circle;
    }

    return { createTile, createEdge, createDot };
}
