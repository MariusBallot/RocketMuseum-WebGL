uniform float u_delta;

varying vec2 vUv; 

void main() {
  vUv = uv;
  
  vec3 pos = position;
  pos.z = sin(u_delta*0.1+pos.x*10.+pos.y*10.)*0.1;
  vec4 modelViewPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * modelViewPosition; 
}