uniform sampler2D u_tex;

varying vec2 vUv;


void main() {

  gl_FragColor = texture2D(u_tex, vUv);
  // gl_FragColor = vec4(vec2(vUv),1., 1.0);
}