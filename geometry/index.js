import Engine from "../engine-xd/src/engine.js";

const T = x => [ x, x, x ]

window.onload = async () => {
    const display = new Engine.Canvas("main");

    const scene = [];
    const engine = new Engine(scene, [ display ]);

    await engine.addEntity(new Engine.Entity({
        camera: {},
    }));

    const add = async (geometry, i) => {
        for (let j = 0; j < 4; j++) {
            await engine.addEntity(new Engine.Entity({
                transform: {
                    position: [ 150 * i - 300, 120 * j - 240 + 50, 0 ],
                    scale: [ 50, 50, 50 ],
                },
                renderer: {
                    renderFaces: j < 2,
                },
                shaders: {
                    vertex: { name: "rgb", args: [ T(1 / Math.PI) ] },
                    edge: { name: "rgb", args: [ T(5 / Math.PI), T(0.1), T(1) ] },
                    face: { name: "rgb", args: [ T(2.5 / Math.PI), T(1), T(0.5) ] },
                },
                geometry: Engine.Components.Geometry[geometry],
                scripts: j % 2 == 0 ? { name: "spin", args: [ [ 1 / 4, 1 / 12, 0 ] ] } : undefined,
            }));
        }
    };

    await Promise.all(Engine.Components.Geometry.RegularPolyhedronNames.map(add));

    await engine.addEntity(new Engine.Entity({
        scripts: [
            { name: "stats", args: [ [ { id: "stats", index: 0 } ] ] },
        ],
    }));

    engine.start();
    console.log(engine.scene);
};
