uniform sampler2D u_tex;
uniform float u_alpha;
uniform float u_h;


varying vec2 vUv;
varying float w; 
varying float wR; 


float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main() {

  vec4 tex = texture2D(u_tex, vUv);
  float a = vUv.x*2.-u_alpha;
  vec4 col = vec4(vec3(map(w-(wR*u_h),-1.,1.,0.7,1.)),a)*tex;
  gl_FragColor = col;
  //gl_FragColor = vec4(vec2(vUv),1., 1.0);
}