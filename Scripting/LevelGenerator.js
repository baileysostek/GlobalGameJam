var deapthObjects = [];
var dragon;

var shader;
var shader_lines;

var light;

var fbo;

function init(){
    shader_lines = new Shader("vector");
    shader = new Shader("dynamic_lighting");

    CameraManager.setCamera(new FPSCamera());

    light = LightingEngine.addLight(CameraManager.getCam().getPosition(), new Vector3f(0, 1, 0));
    LightingEngine.addLight(new Vector3f(0, 2, 2), new Vector3f(1, 1, 1));

    // LightingEngine.addWorldLight(new Vector3f(0, 0, 0), new Vector3f(1, 1, 1));

    deapthObjects.push(new EntityModel(ModelLoader.generateQuad(12, 12), "white", new Vector3f(0, 0, 0), 90, 0, 0, 1));
    dragon = new EntityModel(ModelLoader.loadModel("dragon"), "white", new Vector3f(0, 0, 0), 0, 0, 0, 0.14);
    // deapthObjects.push(new EntityModel(ModelLoader.generateQuad(4, 4), "white", new Vector3f(0, 2, 0), 0, 0, 0, 1));
    deapthObjects.push(new EntityModel(ModelLoader.loadModel("dragon"), "white", new Vector3f(0, 0, 0), 0, 0, 0, 0.14));

    // deapthObjects.push(new EntitySprite(new Vector3f(0, 2, 0), "right", 45, 0, 0, 1));
}

//Tick function is called (Game.FPS) times per second.
function tick(){
    // deapthObjects[0].rotate(1, 0, 0);
    deapthObjects[1].rotate(0, 1, 0);
}

function render(){
    //Set up FBO with own shader
    shader_lines.start();
    shader_lines.loadData("viewMatrix", Maths.createViewMatrix(CameraManager.getCam()));
    shader_lines.bindVAO(dragon);
    shader_lines.render(dragon);
    shader_lines.unBindVAO();
    shader_lines.stop();

    //Render
    shader.start();
    shader.loadData("viewMatrix", Maths.createViewMatrix(CameraManager.getCam()));

    loadLights();

    for(var i = 0; i < deapthObjects.length; i++){
        shader.bindVAO(deapthObjects[i]);
        shader.loadData("textureSampler", deapthObjects[i].getMaterial().getTextureID());
        shader.render(deapthObjects[i]);
        shader.unBindVAO();
    }

    shader.stop();
}

function loadLights(){
    var lights = LightingEngine.getLights();
    for(var i = 0; i < 4; i++){
        if(i < lights.length) {
            shader.loadData("lightPosition[" + i + "]", lights[i].getPosition());
            shader.loadData("lightColor[" + i + "]", lights[i].getColor());
            shader.loadData("attenuation[" + i + "]", lights[i].getAttenuation());
        }else{
            shader.loadData("lightPosition[" + i + "]", new Vector3f(0, 0, 0));
            shader.loadData("lightColor[" + i + "]", new Vector3f(0, 0, 0));
            shader.loadData("attenuation[" + i + "]", new Vector3f(1, 0, 0));
        }
    }
}