import "./index.css";
import { vertices, edges, faces } from "./board";

const xmlns = "http://www.w3.org/2000/svg";
const root = document.getElementById("app-root");

const [w, h] = [root.offsetWidth, root.offsetHeight];
const board_size = w;

const svgRootAttributes = [
    ["width", w],
    ["height", h],
    ["viewbox", `0 0 ${board_size} ${board_size}`],
    ["xlmns", xmlns]
];

const svgRoot = document.createElementNS(xmlns, "svg");

faces.forEach(function(face) {
    const [x1, y1, x2, y2] = [face[0].x, face[0].y, face[3].x, face[3].y];
    const svgRectAttributes = [
        ["x", x1 * board_size],
        ["y", y1 * board_size],
        ["width", (x2 - x1) * board_size],
        ["height", (y2 - y1) * board_size],
        ["fill", "GRAY"],
        ["stroke", "none"]
    ];
    const rect = document.createElementNS(xmlns, "rect");
    svgRectAttributes.forEach(keyValue =>
        rect.setAttribute(keyValue[0], keyValue[1])
    );

    svgRoot.appendChild(rect);
});

edges.forEach(function(edge, index) {
    const { A, B } = edge;
    const dx = (A.x + (B.x - A.x) / 2) * board_size;
    const dy = (A.y + (B.y - A.y) / 2) * board_size;
    const svgTextAttributes = [["x", dx], ["y", dy]];
    const text = document.createElementNS(xmlns, "text");
    text.innerHTML = index;
    svgTextAttributes.forEach(keyValue =>
        text.setAttribute(keyValue[0], keyValue[1])
    );

    svgRoot.appendChild(text);
});

vertices.forEach(function(vertex) {
    const { x, y } = vertex;
    const circle = document.createElementNS(xmlns, "circle");
    const svgCircleAttributes = [
        ["cx", x * board_size],
        ["cy", y * board_size],
        ["r", 3],
        ["fill", "black"],
        ["stroke", "none"]
    ];
    svgCircleAttributes.forEach(attr => circle.setAttribute(attr[0], attr[1]));
    svgRoot.appendChild(circle);
});

root.appendChild(svgRoot);
