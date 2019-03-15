import "./index.css";
import { vertices, edges, faces } from "./board.js";
import { createComponents } from "./components.js";
import { gameState } from "./game_state";

const xmlns = "http://www.w3.org/2000/svg";
const root = document.getElementById("app-root");

const [w, h] = [root.offsetWidth, root.offsetHeight];
const board_size = w;

const svgRoot = document.createElementNS(xmlns, "svg");
root.appendChild(svgRoot);

svgRoot.setAttribute("width", w - 20);
svgRoot.setAttribute("height", h - 20);
svgRoot.setAttribute("viewbox", `-5 -5 ${board_size} ${board_size}`);
svgRoot.setAttribute("xlmns", xmlns);

const { createTile, createEdge, createDot } = createComponents(
    svgRoot,
    board_size - 20,
    update
);

vertices.forEach(function(vertex) {
    createDot(vertex);
});

function update(firstTime = false) {
    if (firstTime) {
        edges.forEach(edge => (edge.element = createEdge(edge)));
        faces.forEach(face => (face.element = createTile(face)));
    } else {
        edges.forEach(function(edge) {
            if (edge.state === "clicked") {
                edge.state = "set";
                edge.update = true;
                edge.faces.forEach(function(face) {
                    face.fill += 1;
                    if (face.fill === 4) {
                        face.update = true;
                        face.claimedBy = gameState.activePlayer;
                        gameState.scorePoint();
                    }
                });
            }
            if (edge.update) {
                edge.update = false;
                edge.element = createEdge(edge);
            }
        });

        faces.forEach(function(face) {
            if (face.update) {
                face.update = false;
                face.element = createTile(face);
            }
        });
        gameState.updateGame();
    }
}

update(true);
