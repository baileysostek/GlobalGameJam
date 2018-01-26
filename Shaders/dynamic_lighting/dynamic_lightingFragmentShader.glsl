#version 400 core

in vec2 pass_textureCoords;
in vec3 toCameraVector;
in vec3 toLightVector[4];
in vec3 passNormal;

out vec4 out_Color;

uniform sampler2D textureSampler;

uniform vec3 lightColor[4];
uniform vec3 attenuation[4];
uniform float shineDamper;
uniform float reflectivity;

void main(void){
    vec4 textureColor = texture(textureSampler, pass_textureCoords);

    vec3 unitVectorToCamera = normalize(toCameraVector);

	vec3 unitNormal = normalize(passNormal);

    vec3 totalDiffuse = vec3(0.0);
    vec3 totalSpecular = vec3(0.0);

    for(int i = 0; i < 4; i++){
        vec3 unitLightVector = normalize(toLightVector[i]);
        float direction = dot(unitNormal, unitLightVector);
        if(direction > 0){
            float distance = length(toLightVector[i]);
            float attFactor = attenuation[i].x + (attenuation[i].y * distance) + (attenuation[i].z * distance * distance);

            float nDot = dot(unitVectorToCamera , normalize(unitNormal + unitLightVector));

            float brightness = max(nDot, 0.3);
            totalDiffuse = totalDiffuse + (((brightness) * lightColor[i])/attFactor);
        }
    }

    totalDiffuse = max(totalDiffuse, 0.0);
    totalDiffuse = min(totalDiffuse, 1.0);

    if(textureColor.a < 0.5){
        discard;
    }

    out_Color = textureColor * (vec4(totalDiffuse, 1.0)) ;
}
