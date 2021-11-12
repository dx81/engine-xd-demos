import Engine from "../engine-xd/src/engine.js";
import { Q } from "../engine-xd/src/utils.js";

const N = (x, n) => Array(n).fill(x);

window.onload = async () => {
    const display = new Engine.Displays.Canvas("main");

    const scene = [];
    const engine = new Engine(scene, [ display ]);

    await engine.addEntity(new Engine.Entity({
        camera: {},
    }));

    const dimensions = 4;
    const scale = 200;

    await engine.addEntity(new Engine.Entity({
        transform: {
            position: [ 0, 0, - (scale * (dimensions - 2)), 0 ],
            scale: N(scale, dimensions),
        },
        renderer: {
            renderVertices: false,
        },
        shaders: { name: "rgb", args: [ undefined, undefined, [ 1, 1, 1 ].map(e => 0.1 * e) ] },
        geometry: Engine.Components.Geometry.Icositetrachoron,
        scripts: [
            { name: "spin", args: [ [ 1, 1.8, 0.1, 2.2, 1.2, 1.5 ].map(e => e * 0.05) ] },
            { name: "control" }
        ],
    }));

    await engine.addEntity(new Engine.Entity({
        scripts: [
            { name: "stats", args: [ [ { id: "stats", index: 0 } ] ] },
        ],
    }));

    engine.start();
    console.log(engine.scene);
};
