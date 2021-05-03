import Engine from "../engine-xd/src/engine.js";

const T = (x) => [ x, x, x ];
const N = (x, n) => Array(n).fill(x);

window.onload = async () => {
    const display = new Engine.Displays.SVG("main", {
        size: [ 1200, 600 ],
        viewport: { height: 200 }
    });
    const vdisplay = new Engine.Displays.VDisplay(display, {
        root: [ 100, -100 ],
        size: [ 100, 100 ],
        viewport: { height: 400 }
    });

    const vdisplay2 = new Engine.Displays.VDisplay(vdisplay, {
        root: [ 100, -200 ],
        size: [ 100, 100 ],
        viewport: { height: 600 }
    });

    const scene = [];
    const engine = new Engine(scene, [ display, vdisplay, vdisplay2 ]);

    await engine.addEntity(new Engine.Entity({
        camera: {
            isometric: false,
        },
    }));

    await engine.addEntity(new Engine.Entity({
        camera: {
            displays: [ { index: 1, clear: true, color: "#FFFFFF" } ],
        },
    }));

    await engine.addEntity(new Engine.Entity({
        camera: {
            displays: [ { index: 2, clear: true, color: "#000000" } ],
        },
    }));

    let scale = 100;
    let dimensions = 7;
    let axes = (dimensions * (dimensions - 1)) / 2;

    await engine.addEntity(new Engine.Entity({
        transform: {
            position: [ 0, 0, - (scale * (dimensions - 2)), 0, 0, 0, 0, 0, 0, 0 ],
            // position: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            scale: N(scale, dimensions),
        },
        renderer: {
            //renderVertices: false,
        },
        // shaders: "parallel",
        shaders: {
            vertex: { name: "rgb", args: [ T(1 / Math.PI) ] },
            edge: { name: "rgb", args: [ T(5 / Math.PI), T(0.1), T(1) ] },
            face: { name: "rgb", args: [ T(2.5 / Math.PI), T(1), T(0.5) ] },
        },
        // geometry: Engine.Components.Geometry.Hypercube(dimensions),
        geometry: Engine.Components.Geometry.Dodecahedron,
        scripts: [
            { name: "spin", args: [ N(0.1, axes) ] },
            { name: "control", args: [ 100, 0.5 ] }
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
