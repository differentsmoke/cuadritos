import "./index.css";
import { vertices, edges, faces } from "./board.js";
import { createComponents } from "./components.js";

const xmlns = "http://www.w3.org/2000/svg";
const root = document.getElementById("app-root");

const [w, h] = [root.offsetWidth, root.offsetHeight];
const board_size = w;

const svgRoot = document.createElementNS(xmlns, "svg");
root.appendChild(svgRoot);

svgRoot.setAttribute("width", w);
svgRoot.setAttribute("height", h);
svgRoot.setAttribute("viewbox", `0 0 ${board_size} ${board_size}`);
svgRoot.setAttribute("xlmns", xmlns);

const { createTile, createEdge } = createComponents(board_size, update);

function update() {
    faces.forEach(function(face) {
        if (face.update) {
            face.update = false;
            svgRoot.appendChild(createTile(face));
        }
    });

    edges.forEach(function(edge) {
        if (edge.update) {
            edge.update = false;
            svgRoot.appendChild(createEdge(edge));
        }
    });
}

update();

vertices.forEach(function(vertex) {
    const { x, y } = vertex;
    const circle = document.createElementNS(xmlns, "circle");
    const svgCircleAttributes = [
        ["cx", x * board_size],
        ["cy", y * board_size],
        ["r", 4],
        ["fill", "black"],
        ["stroke", "none"]
    ];
    svgCircleAttributes.forEach(attr => circle.setAttribute(attr[0], attr[1]));
    svgRoot.appendChild(circle);
});
