import Engine from "../engine-xd/src/engine.js";


window.onload = async () => {

    const display = new Engine.Canvas("main");
    const scene = new Engine.Scene();
    const engine = new Engine(scene, [ display ]);

    let positions = [
        [ -2, -2 ],
        [ -2, -1 ],
        [ -1, -1 ],
        [  2, -2 ],
        [  2, -1 ],
        [  1, -1 ],
        [ -1,  1 ],
        [  0,  2 ],
        [  1,  1 ],
    ];

    let scale = 80;

    await engine.addEntity(new Engine.Entity({
        camera: {
            displays: [ { index: 0, clear: true, color: "#333333" } ],
        },
    }));

    positions.map(position => position.map(componenent => componenent * scale)).forEach(async position => {
        await engine.addEntity(new Engine.Entity({
            transform: {
                position,
                scale: Engine.Vector.scalar([ scale, scale ], 1/2),
            },
            renderer: {
                renderVertices: false,
                renderEdges: false,
            },
            geometry: Engine.Components.Geometry.Square,
            shaders: "rgb",
        }));
    });

    engine.start();
};
