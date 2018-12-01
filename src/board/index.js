const side = 8;

export const vertices = [];
export const edges = [];
export const faces = [];

for (let i = 0; i <= side; i = i + 1) {
    for (let j = 0; j <= side; j = j + 1) {
        vertices.push({
            x: i / side,
            y: j / side
        });
    }
}

for (let i = 0; i < side; i = i + 1) {
    for (let j = 0; j < side; j = j + 1) {
        let index = i * (side + 1) + j;
        faces.push([
            vertices[index],
            vertices[index + 1],
            vertices[index + side + 1],
            vertices[index + side + 2]
        ]);
    }
}

for (let i = 0; i < side; i = i + 1) {
    for (let j = 0; j < side; j = j + 1) {
        let index = i * (side + 1) + j;
        edges.push({
            A: vertices[index],
            B: vertices[index + 1]
        });
        edges.push({
            A: vertices[index],
            B: vertices[index + side + 1]
        });
        if (i + 1 === side) {
            edges.push({
                A: vertices[index + side + 1],
                B: vertices[index + side + 2]
            });
        }
        if (j + 1 === side) {
            edges.push({
                A: vertices[index + 1],
                B: vertices[index + side + 2]
            });
        }
    }
}

console.log(edges);
