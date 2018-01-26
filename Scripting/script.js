//script.js
var entity;

//Attributes
var gravity;
var onGround;
var controllerIndex;
var controller;
var callback;
var render;
var walkSpeed;
var runSpeed;
var jumpVelocity;
var lightColor;
var distance_to_interact;

function init(reference){
     entity = reference;
     gravity = entity.getAttribute("gravity");
     onGround = entity.getAttribute("onGround");
     controllerIndex = entity.getAttribute("controllerIndex");
     controller = entity.getAttribute("controller");
     callback = entity.getAttribute("callback");
     render = entity.getAttribute("render");
     walkSpeed = entity.getAttribute("walkSpeed");
     runSpeed = entity.getAttribute("runSpeed");
     jumpVelocity = entity.getAttribute("jumpVelocity");
     lightColor = entity.getAttribute("lightColor");
     distance_to_interact = entity.getAttribute("distance_to_interact");
}

//Functions
//Added from interact component.
function onIteract(){

}


function tick(){

}

