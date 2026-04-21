"use client";

import React, { useRef, useEffect } from "react";

// WebGL Renderer class
class WebGLRenderer {
  constructor(canvas, scale) {
    this.canvas = canvas;
    this.scale = scale;
    this.gl = canvas.getContext("webgl2");

    if (!this.gl) {
      console.error("WebGL2 is not supported in this browser.");
      return;
    }

    this.gl.viewport(0, 0, canvas.width, canvas.height);
    this.shaderSource = defaultShaderSource;
    this.vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main() {
  gl_Position = position;
}`;
    this.vertices = [-1, 1, -1, -1, 1, 1, 1, -1];
    this.mouseMove = [0, 0];
    this.mouseCoords = [0, 0];
    this.pointerCoords = [0, 0];
    this.nbrOfPointers = 0;
  }

  updateShader(source) {
    this.reset();
    this.shaderSource = source;
    this.setup();
    this.init();
  }

  updateMove(deltas) {
    this.mouseMove = deltas;
  }

  updateMouse(coords) {
    this.mouseCoords = coords;
  }

  updatePointerCoords(coords) {
    this.pointerCoords = coords;
  }

  updatePointerCount(nbr) {
    this.nbrOfPointers = nbr;
  }

  updateScale(scale) {
    if (!this.gl) return;
    this.scale = scale;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  compile(shader, source) {
    if (!this.gl) return;
    const gl = this.gl;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
    }
  }

  test(source) {
    if (!this.gl) return "WebGL2 not available";
    let result = null;
    const gl = this.gl;
    const shader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      result = gl.getShaderInfoLog(shader);
    }

    gl.deleteShader(shader);
    return result;
  }

  reset() {
    if (!this.gl) return;
    const gl = this.gl;

    if (this.program && !gl.getProgramParameter(this.program, gl.DELETE_STATUS)) {
      if (this.vs) {
        gl.detachShader(this.program, this.vs);
        gl.deleteShader(this.vs);
      }
      if (this.fs) {
        gl.detachShader(this.program, this.fs);
        gl.deleteShader(this.fs);
      }
      gl.deleteProgram(this.program);
    }

    if (this.buffer) {
      gl.deleteBuffer(this.buffer);
    }
  }

  setup() {
    if (!this.gl) return;
    const gl = this.gl;

    this.vs = gl.createShader(gl.VERTEX_SHADER);
    this.fs = gl.createShader(gl.FRAGMENT_SHADER);

    this.compile(this.vs, this.vertexSrc);
    this.compile(this.fs, this.shaderSource);

    this.program = gl.createProgram();
    gl.attachShader(this.program, this.vs);
    gl.attachShader(this.program, this.fs);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(this.program));
    }
  }

  init() {
    if (!this.gl || !this.program) return;
    const gl = this.gl;
    const program = this.program;

    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    program.resolution = gl.getUniformLocation(program, "resolution");
    program.time = gl.getUniformLocation(program, "time");
    program.move = gl.getUniformLocation(program, "move");
    program.touch = gl.getUniformLocation(program, "touch");
    program.pointerCount = gl.getUniformLocation(program, "pointerCount");
    program.pointers = gl.getUniformLocation(program, "pointers");
  }

  render(now = 0) {
    if (!this.gl || !this.program) return;
    const gl = this.gl;
    const program = this.program;

    if (gl.getProgramParameter(program, gl.DELETE_STATUS)) return;

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

    gl.uniform2f(program.resolution, this.canvas.width, this.canvas.height);
    gl.uniform1f(program.time, now * 0.001);
    gl.uniform2f(program.move, ...this.mouseMove);
    gl.uniform2f(program.touch, ...this.mouseCoords);
    gl.uniform1i(program.pointerCount, this.nbrOfPointers);
    gl.uniform2fv(program.pointers, this.pointerCoords);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

// Pointer Handler class
class PointerHandler {
  constructor(element, scale) {
    this.scale = scale;
    this.active = false;
    this.pointers = new Map();
    this.lastCoords = [0, 0];
    this.moves = [0, 0];

    const map = (element, scale, x, y) => {
      const rect = element.getBoundingClientRect();
      const relativeX = x - rect.left;
      const relativeY = y - rect.top;
      return [relativeX * scale, element.height - relativeY * scale];
    };

    element.addEventListener("pointerdown", (e) => {
      this.active = true;
      this.pointers.set(
        e.pointerId,
        map(element, this.getScale(), e.clientX, e.clientY)
      );
    });

    element.addEventListener("pointerup", (e) => {
      if (this.count === 1) this.lastCoords = this.first;
      this.pointers.delete(e.pointerId);
      this.active = this.pointers.size > 0;
    });

    element.addEventListener("pointerleave", (e) => {
      if (this.count === 1) this.lastCoords = this.first;
      this.pointers.delete(e.pointerId);
      this.active = this.pointers.size > 0;
    });

    element.addEventListener("pointermove", (e) => {
      if (!this.active) return;

      this.lastCoords = [e.clientX, e.clientY];
      this.pointers.set(
        e.pointerId,
        map(element, this.getScale(), e.clientX, e.clientY)
      );
      this.moves = [this.moves[0] + e.movementX, this.moves[1] + e.movementY];
    });
  }

  getScale() {
    return this.scale;
  }

  updateScale(scale) {
    this.scale = scale;
  }

  get count() {
    return this.pointers.size;
  }

  get move() {
    return this.moves;
  }

  get coords() {
    return this.pointers.size > 0
      ? Array.from(this.pointers.values()).flat()
      : [0, 0];
  }

  get first() {
    return this.pointers.values().next().value || this.lastCoords;
  }
}

// Custom hook for shader background
const useShaderBackground = () => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const rendererRef = useRef(null);
  const pointersRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      if (rendererRef.current) {
        rendererRef.current.updateScale(dpr);
      }

      if (pointersRef.current) {
        pointersRef.current.updateScale(dpr);
      }
    };

    const loop = (now) => {
      if (!rendererRef.current || !pointersRef.current) return;

      rendererRef.current.updateMouse(pointersRef.current.first);
      rendererRef.current.updatePointerCount(pointersRef.current.count);
      rendererRef.current.updatePointerCoords(pointersRef.current.coords);
      rendererRef.current.updateMove(pointersRef.current.move);
      rendererRef.current.render(now);

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);

    rendererRef.current = new WebGLRenderer(canvas, dpr);

    if (!rendererRef.current.gl) return;

    pointersRef.current = new PointerHandler(canvas, dpr);

    resize();
    rendererRef.current.setup();
    rendererRef.current.init();

    if (rendererRef.current.test(defaultShaderSource) === null) {
      rendererRef.current.updateShader(defaultShaderSource);
    }

    animationFrameRef.current = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (rendererRef.current) {
        rendererRef.current.reset();
      }
    };
  }, []);

  return canvasRef;
};

// Main Hero Component
const Hero = ({ trustBadge, headline, subtitle, buttons, className = "" }) => {
  const canvasRef = useShaderBackground();

  return (
    <div className={`relative w-full h-screen overflow-hidden bg-black ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full touch-none"
        style={{ background: "black" }}
      />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
        {trustBadge && (
          <div className="mb-8">
            <div className="flex items-center gap-2 rounded-full border border-orange-300/30 bg-orange-500/10 px-6 py-3 text-sm backdrop-blur-md">
              {trustBadge.icons && (
                <div className="flex gap-1">
                  {trustBadge.icons.map((icon, index) => (
                    <span key={index}>{icon}</span>
                  ))}
                </div>
              )}
              <span className="text-orange-100">{trustBadge.text}</span>
            </div>
          </div>
        )}

        <div className="mx-auto max-w-5xl space-y-6 px-4 text-center">
          <div className="space-y-2">
            <h1 className="bg-gradient-to-r from-orange-300 via-yellow-400 to-amber-300 bg-clip-text text-5xl font-bold text-transparent md:text-7xl lg:text-8xl">
              {headline.line1}
            </h1>
            <h1 className="bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-5xl font-bold text-transparent md:text-7xl lg:text-8xl">
              {headline.line2}
            </h1>
          </div>

          <div className="mx-auto max-w-3xl">
            <p className="text-lg font-light leading-relaxed text-orange-100/90 md:text-xl lg:text-2xl">
              {subtitle}
            </p>
          </div>

          {buttons && (
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              {buttons.primary && (
                <button
                  onClick={buttons.primary.onClick}
                  className="rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 px-8 py-4 text-lg font-semibold text-black transition-all duration-300 hover:scale-105 hover:from-orange-600 hover:to-yellow-600"
                >
                  {buttons.primary.text}
                </button>
              )}

              {buttons.secondary && (
                <button
                  onClick={buttons.secondary.onClick}
                  className="rounded-full border border-orange-300/30 bg-orange-500/10 px-8 py-4 text-lg font-semibold text-orange-100 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-orange-500/20"
                >
                  {buttons.secondary.text}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const defaultShaderSource = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)

float rnd(vec2 p) {
  p = fract(p * vec2(12.9898, 78.233));
  p += dot(p, p + 34.56);
  return fract(p.x * p.y);
}

float noise(in vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3. - 2. * f);
  float a = rnd(i), b = rnd(i + vec2(1,0)), c = rnd(i + vec2(0,1)), d = rnd(i + 1.);
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}

float fbm(vec2 p) {
  float t = 0.0, a = 1.0;
  mat2 m = mat2(1., -.5, .2, 1.2);
  for (int i = 0; i < 5; i++) {
    t += a * noise(p);
    p *= 2. * m;
    a *= .5;
  }
  return t;
}

float clouds(vec2 p) {
  float d = 1.0, t = 0.0;
  for (float i = 0.0; i < 3.0; i++) {
    float a = d * fbm(i * 10.0 + p.x * .2 + .2 * (1.0 + i) * p.y + d + i * i + p);
    t = mix(t, d, a);
    d = a;
    p *= 2.0 / (i + 1.0);
  }
  return t;
}

void main(void) {
  vec2 uv = (FC - .5 * R) / MN, st = uv * vec2(2,1);
  vec3 col = vec3(0);
  float bg = clouds(vec2(st.x + T * .5, -st.y));
  uv *= 1. - .3 * (sin(T * .2) * .5 + .5);

  for (float i = 1.0; i < 12.0; i++) {
    uv += .1 * cos(i * vec2(.1 + .01 * i, .8) + i * i + T * .5 + .1 * uv.x);
    vec2 p = uv;
    float d = length(p);
    col += .00125 / d * (cos(sin(i) * vec3(1,2,3)) + 1.);
    float b = noise(i + p + bg * 1.731);
    col += .002 * b / length(max(p, vec2(b * p.x * .02, p.y)));
    col = mix(col, vec3(bg * .25, bg * .137, bg * .05), d);
  }

  O = vec4(col, 1.0);
}`;

export default function Page() {
  const handlePrimaryClick = () => {
    console.log("Get Started clicked!");
    alert("Get Started clicked! Add your logic here");
  };

  const handleSecondaryClick = () => {
    console.log("Explore Features clicked!");
    alert("Explore Features clicked! Add your logic here");
  };

  return (
    <Hero
      trustBadge={{
        text: "Trusted by forward-thinking teams.",
        icons: ["✨", "🚀", "⭐"],
      }}
      headline={{
        line1: "Launch Your",
        line2: "Workflow Into Orbit",
      }}
      subtitle="Supercharge productivity with AI-powered automation and integrations built for the next generation of teams — fast, seamless, and limitless."
      buttons={{
        primary: {
          text: "Get Started for Free",
          onClick: handlePrimaryClick,
        },
        secondary: {
          text: "Explore Features",
          onClick: handleSecondaryClick,
        },
      }}
    />
  );
}