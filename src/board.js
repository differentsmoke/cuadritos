const side = 3;

export const vertices = [];
export const edges = [];
export const faces = [];

for (let i = 0; i <= side; i = i + 1) {
    for (let j = 0; j <= side; j = j + 1) {
        vertices.push(vertex(i / side, j / side));
    }
}

//Create Faces
for (let i = 0; i < side; i = i + 1) {
    for (let j = 0; j < side; j = j + 1) {
        const index = i * (side + 1) + j;
        faces.push(
            face(
                {
                    vertices: [
                        vertices[index],
                        vertices[index + 1],
                        vertices[index + side + 1],
                        vertices[index + side + 2]
                    ]
                },
                faces.length
            )
        );
    }
}

//Create Edges
for (let i = 0; i < side; i = i + 1) {
    for (let j = 0; j < side; j = j + 1) {
        const vIndex = i * (side + 1) + j; //corresponding vertices
        const fIndex = i * side + j; //corresponding faces

        if (i > 0) {
            edges.push(
                edge(vertices[vIndex], vertices[vIndex + 1], [
                    faces[fIndex],
                    faces[fIndex - side]
                ])
            );
        } else {
            edges.push(
                edge(vertices[vIndex], vertices[vIndex + 1], [faces[fIndex]])
            );
        }

        if (j > 0) {
            edges.push(
                edge(vertices[vIndex], vertices[vIndex + side + 1], [
                    faces[fIndex],
                    faces[fIndex - 1]
                ])
            );
        } else {
            edges.push(
                edge(vertices[vIndex], vertices[vIndex + side + 1], [
                    faces[fIndex]
                ])
            );
        }

        if (i + 1 === side) {
            // If the last edge on the right
            edges.push(
                edge(vertices[vIndex + side + 1], vertices[vIndex + side + 2], [
                    faces[fIndex]
                ])
            );
        }

        if (j + 1 === side) {
            // If the last edge on the bottom
            edges.push(
                edge(vertices[vIndex + 1], vertices[vIndex + side + 2], [
                    faces[fIndex]
                ])
            );
        }
    }
}

function face({ vertices }, index = []) {
    const [a, d] = [vertices[0], vertices[3]];
    return Object.assign(Object.create(null), {
        index,
        fill: 0,
        x: a.x,
        y: a.y,
        width: d.x - a.x,
        height: d.y - a.y,
        claimedBy: "",
        update: true,
        vertices,
        element: null
    });
}

function edge(A, B, faces) {
    return Object.assign(Object.create(null), {
        A,
        B,
        faces,
        state: "open",
        update: true,
        element: null
    });
}

function vertex(x, y) {
    return Object.assign(Object.create(null), {
        x,
        y
    });
}
