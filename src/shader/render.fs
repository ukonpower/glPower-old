precision highp float;
uniform sampler2D texture;
uniform vec2 resolution;
uniform float time;
void main(){
    vec2 uv = gl_FragCoord.xy / resolution;
    vec3 c = vec3(sin(time));
    gl_FragColor = vec4(c,1.0);
}