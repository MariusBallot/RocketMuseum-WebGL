uniform float u_delta;
uniform float u_h;

varying vec2 vUv; 
varying float w; 

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main() {
  vUv = uv;

  float hw = map(sin(distance(uv,vec2(0.5))*10.+u_delta*0.2),-1.,1.,0.,1. )*u_h;
  
  vec3 pos = position;
  w=sin(u_delta*0.1+pos.x*5.+pos.y*5.);
  pos.z = w*0.1+hw;
  vec4 modelViewPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * modelViewPosition; 
}