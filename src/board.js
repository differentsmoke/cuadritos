const side = 12;

export const vertices = [];
export const edges = [];
export const faces = [];

const one_third = 1 / 3;
const two_thrids = 2 / 3;

for (let i = 0; i <= side; i = i + 1) {
    for (let j = 0; j <= side; j = j + 1) {
        vertices.push(
            Object.create(null, {
                x: { value: i / side },
                y: { value: j / side }
            })
        );
    }
}

for (let i = 0; i < side; i = i + 1) {
    for (let j = 0; j < side; j = j + 1) {
        let index = i * (side + 1) + j;
        const [a, b, c, d] = [
            vertices[index],
            vertices[index + 1],
            vertices[index + side + 1],
            vertices[index + side + 2]
        ];

        faces.push(
            Object.assign(Object.create(null), {
                x: a.x,
                y: a.y,
                width: d.x - a.x,
                height: d.y - a.y,
                claimedBy: "",
                update: true,
                vertices: [a, b, c, d]
            })
        );
    }
}

console.log(edges);

for (let i = 0; i < side; i = i + 1) {
    for (let j = 0; j < side; j = j + 1) {
        let index = i * (side + 1) + j;
        edges.push(
            Object.assign(Object.create(null), {
                A: vertices[index],
                B: vertices[index + 1],
                set: false,
                update: true
            })
        );
        edges.push(
            Object.assign(Object.create(null), {
                A: vertices[index],
                B: vertices[index + side + 1],
                set: false,
                update: true
            })
        );
        if (i + 1 === side) {
            edges.push(
                Object.assign(Object.create(null), {
                    A: vertices[index + side + 1],
                    B: vertices[index + side + 2],
                    set: false,
                    update: true
                })
            );
        }
        if (j + 1 === side) {
            edges.push(
                Object.assign(Object.create(null), {
                    A: vertices[index + 1],
                    B: vertices[index + side + 2],
                    set: false,
                    update: true
                })
            );
        }
    }
}
