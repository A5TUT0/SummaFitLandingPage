import { useEffect, useRef } from "react";
import { Color, Mesh, Program, Renderer, Triangle } from "ogl";

const VERTEX_SHADER = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uRotation;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform float uMouseInfluence;
uniform float uNoise;
uniform float uParallax;
uniform float uIterations;
uniform float uIntensity;
uniform float uBandWidth;
uniform float uTransparent;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform vec3 uColors[3];
uniform vec3 uAccentColor;

out vec4 fragColor;

mat2 rotate(float angle) {
  float sine = sin(angle);
  float cosine = cos(angle);
  return mat2(cosine, -sine, sine, cosine);
}

float hash(vec2 point) {
  return fract(sin(dot(point, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 point) {
  vec2 cell = floor(point);
  vec2 local = fract(point);
  local = local * local * (3.0 - 2.0 * local);

  return mix(
    mix(hash(cell), hash(cell + vec2(1.0, 0.0)), local.x),
    mix(hash(cell + vec2(0.0, 1.0)), hash(cell + vec2(1.0, 1.0)), local.x),
    local.y
  );
}

float fractalNoise(vec2 point) {
  float value = 0.0;
  float amplitude = 0.5;
  vec2 samplePoint = point;

  for (int index = 0; index < 8; index++) {
    if (float(index) >= uIterations) break;
    value += noise(samplePoint) * amplitude;
    samplePoint = samplePoint * 2.03 + vec2(17.2, 9.1);
    amplitude *= 0.5;
  }

  return value;
}

vec3 colorRamp(float position) {
  position = clamp(position, 0.0, 1.0);
  if (position < 0.5) {
    return mix(uColors[0], uColors[1], position * 2.0);
  }
  return mix(uColors[1], uColors[2], (position - 0.5) * 2.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec2 point = (uv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);
  float time = uTime;

  point *= uScale;
  point = rotate(uRotation) * point;
  point += uMouse * (uMouseInfluence * 0.22 + uParallax * 0.08);

  float baseNoise = fractalNoise(
    point * uFrequency + vec2(time * 0.07, -time * 0.045)
  );
  vec2 warp = vec2(
    fractalNoise(point * uFrequency + vec2(4.2, time * 0.08)),
    fractalNoise(point * uFrequency + vec2(-2.7, -time * 0.06))
  ) * 2.0 - 1.0;
  point += warp * (uWarpStrength * 0.24) * (0.55 + baseNoise);

  float flow = sin(
    (point.x * 1.3 + point.y * 0.8 + baseNoise * 1.8 + time * 0.11) * 3.0
  );
  float ribbons = pow(1.0 - abs(flow), max(1.0, uBandWidth * 0.55));
  float palettePosition = clamp(
    0.5 + point.x * 0.28 + point.y * 0.18 + baseNoise * 0.28,
    0.0,
    1.0
  );

  vec3 color = colorRamp(palettePosition);
  color = mix(color * 0.58, color + uAccentColor * 0.28, ribbons);
  color *= uIntensity * (0.78 + baseNoise * 0.34);

  float grain = hash(gl_FragCoord.xy + time) * 2.0 - 1.0;
  color += grain * uNoise * 0.035;

  float edgeFade = 1.0 - smoothstep(0.72, 1.55, length(point));
  float alpha = uTransparent > 0.5
    ? clamp((0.28 + ribbons * 0.72) * (0.72 + edgeFade * 0.28), 0.0, 1.0)
    : 1.0;

  fragColor = vec4(max(color, 0.0), alpha);
}
`;

type ColorBendsProps = {
  colors?: [string, string, string];
  rotation?: number;
  speed?: number;
  scale?: number;
  frequency?: number;
  warpStrength?: number;
  mouseInfluence?: number;
  noise?: number;
  parallax?: number;
  iterations?: number;
  intensity?: number;
  bandWidth?: number;
  transparent?: boolean;
  autoRotate?: number;
  color?: string;
  className?: string;
};

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

export default function ColorBends({
  colors = ["#ff5c7a", "#8a5cff", "#00ffd1"],
  rotation = 90,
  speed = 0.2,
  scale = 1,
  frequency = 1,
  warpStrength = 1,
  mouseInfluence = 1,
  noise = 0.15,
  parallax = 0.5,
  iterations = 1,
  intensity = 1.5,
  bandWidth = 6,
  transparent = true,
  autoRotate = 0,
  color = "#A855F7",
  className = "",
}: ColorBendsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const propsRef = useRef({
    colors,
    rotation,
    speed,
    scale,
    frequency,
    warpStrength,
    mouseInfluence,
    noise,
    parallax,
    iterations,
    intensity,
    bandWidth,
    transparent,
    autoRotate,
    color,
  });
  propsRef.current = {
    colors,
    rotation,
    speed,
    scale,
    frequency,
    warpStrength,
    mouseInfluence,
    noise,
    parallax,
    iterations,
    intensity,
    bandWidth,
    transparent,
    autoRotate,
    color,
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio, 2),
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.setAttribute("aria-hidden", "true");

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) delete geometry.attributes.uv;

    const toColorArray = (hexColors: [string, string, string]) =>
      hexColors.map((hex) => {
        const parsed = new Color(hex);
        return [parsed.r, parsed.g, parsed.b];
      });

    const current = propsRef.current;
    const program = new Program(gl, {
      vertex: VERTEX_SHADER,
      fragment: FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
        uRotation: { value: toRadians(current.rotation) },
        uScale: { value: current.scale },
        uFrequency: { value: current.frequency },
        uWarpStrength: { value: current.warpStrength },
        uMouseInfluence: { value: current.mouseInfluence },
        uNoise: { value: current.noise },
        uParallax: { value: current.parallax },
        uIterations: { value: current.iterations },
        uIntensity: { value: current.intensity },
        uBandWidth: { value: current.bandWidth },
        uTransparent: { value: current.transparent ? 1 : 0 },
        uResolution: { value: [container.clientWidth, container.clientHeight] },
        uMouse: { value: [0, 0] },
        uColors: { value: toColorArray(current.colors) },
        uAccentColor: { value: new Color(current.color) },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [width, height];
    };

    const pointer = { x: 0, y: 0 };
    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = 1 - (event.clientY / window.innerHeight) * 2;
    };

    container.appendChild(gl.canvas);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let animationFrame = 0;
    let hasSignaledReady = false;
    const startedAt = performance.now();

    const render = (time: number) => {
      const next = propsRef.current;
      const elapsed = reduceMotion ? 800 : time - startedAt;
      const autoRotation = next.autoRotate * elapsed * 0.00015;

      program.uniforms.uTime.value = elapsed * 0.001 * next.speed;
      program.uniforms.uRotation.value =
        toRadians(next.rotation) + autoRotation;
      program.uniforms.uScale.value = next.scale;
      program.uniforms.uFrequency.value = next.frequency;
      program.uniforms.uWarpStrength.value = next.warpStrength;
      program.uniforms.uMouseInfluence.value = next.mouseInfluence;
      program.uniforms.uNoise.value = next.noise;
      program.uniforms.uParallax.value = next.parallax;
      program.uniforms.uIterations.value = next.iterations;
      program.uniforms.uIntensity.value = next.intensity;
      program.uniforms.uBandWidth.value = next.bandWidth;
      program.uniforms.uTransparent.value = next.transparent ? 1 : 0;
      program.uniforms.uColors.value = toColorArray(next.colors);
      program.uniforms.uAccentColor.value = new Color(next.color);
      program.uniforms.uMouse.value[0] +=
        (pointer.x - program.uniforms.uMouse.value[0]) * 0.06;
      program.uniforms.uMouse.value[1] +=
        (pointer.y - program.uniforms.uMouse.value[1]) * 0.06;
      renderer.render({ scene: mesh });

      if (!hasSignaledReady) {
        hasSignaledReady = true;
        document.documentElement.dataset.colorBendsReady = "true";
        window.dispatchEvent(new Event("summafit:color-bends-ready"));
      }

      if (!reduceMotion) animationFrame = requestAnimationFrame(render);
    };

    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", handlePointerMove);
      resizeObserver.disconnect();
      if (gl.canvas.parentNode === container) {
        container.removeChild(gl.canvas);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`color-bends-container ${className}`.trim()}
    />
  );
}
