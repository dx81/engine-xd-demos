import Engine from "../engine-xd/src/engine.js";

class Square {
    constructor(square) {
        return square;
    }
}

class SquareHandler extends Engine.System {
    constructor(engine) {
        super(engine);
    }

    // add() and update() methods are not needed

    // called every frame
    render(list) {

        // clear display before drawing to it
        // if a display is shared between multiple systems, this might be a bad idea
        this.engine.displays[0].clear("#000000");

        // loop through all entities provided by the engine
        for (let i = 0; i < list.length; i++) {

            let entity = list[i];

            // ignore entities if they don't have both a square and transform component
            if (!entity.square || !entity.transform) continue;

            // draw sqare to the default display
            this.engine.displays[0].rectangle(
                entity.transform.position,
                [ entity.square.size, entity.square.size ],
                entity.square.color
            );
        }
    }
}

window.onload = async () => {

    const display = new Engine.Canvas("main");
    const scene = new Engine.Scene();
    const engine = new Engine(scene, [ display ]);

    // delete scene/systems/components
    engine.clear();

    // add needed components
    engine.components = [ Engine.Components.Transform, Engine.Components.Scripts, Square ];

    // add custom systems
    engine.addSystem(Engine.Systems.ScriptHandler);
    engine.addSystem(SquareHandler);

    // add sqaure entity to current scene
    engine.addEntity(await new Engine.Entity({

        // needed for drawing
        transform: {
            position: [ 0, 0 ],
        },
        square: {
            size: 25,
            color: "#0000FF",
        },
        
        // enable controlling the entity with wasd
        scripts: { name: "control", args: [ 300 ] },
    }));

    // start engine loop
    engine.start();
};
