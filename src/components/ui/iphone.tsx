import { useId } from "react"
import type { HTMLAttributes } from "react"

const PHONE_WIDTH = 430
const PHONE_HEIGHT = 884
const SCREEN_X = 20
const SCREEN_Y = 20
const SCREEN_WIDTH = 390
const SCREEN_HEIGHT = 844
const SCREEN_RADIUS = 56

const LEFT_PCT = (SCREEN_X / PHONE_WIDTH) * 100
const TOP_PCT = (SCREEN_Y / PHONE_HEIGHT) * 100
const WIDTH_PCT = (SCREEN_WIDTH / PHONE_WIDTH) * 100
const HEIGHT_PCT = (SCREEN_HEIGHT / PHONE_HEIGHT) * 100
const RADIUS_H = (SCREEN_RADIUS / SCREEN_WIDTH) * 100
const RADIUS_V = (SCREEN_RADIUS / SCREEN_HEIGHT) * 100

export interface IphoneProps extends HTMLAttributes<HTMLDivElement> {
  src?: string
  videoSrc?: string
  videoPoster?: string
  children?: React.ReactNode
}

export function Iphone({
  src,
  videoSrc,
  videoPoster,
  className,
  style,
  children,
  ...props
}: IphoneProps) {
  const hasVideo = !!videoSrc
  const hasMedia = hasVideo || !!src || !!children
  const id = useId().replace(/:/g, "")
  const screenPunchId = `${id}-screen-punch`
  const bodyGradientId = `${id}-body`
  const rimGradientId = `${id}-rim`
  const edgeGradientId = `${id}-edge`

  return (
    <div
      className={`iphone-device relative inline-block w-full align-middle leading-none ${className ?? ""}`}
      style={{
        aspectRatio: `${PHONE_WIDTH}/${PHONE_HEIGHT}`,
        ...style,
      }}
      {...props}
    >
      {hasVideo && (
        <div
          className="pointer-events-none absolute z-0 overflow-hidden"
          style={{
            left: `${LEFT_PCT}%`,
            top: `${TOP_PCT}%`,
            width: `${WIDTH_PCT}%`,
            height: `${HEIGHT_PCT}%`,
            borderRadius: `${RADIUS_H}% / ${RADIUS_V}%`,
          }}
        >
          <video
            className="block size-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={videoPoster}
            width="408"
            height="888"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      )}

      {(!hasVideo && src) || children ? (
        <div
          className="iphone-screen-media pointer-events-none absolute z-0 overflow-hidden"
          style={{
            left: `${LEFT_PCT}%`,
            top: `${TOP_PCT}%`,
            width: `${WIDTH_PCT}%`,
            height: `${HEIGHT_PCT}%`,
            borderRadius: `${RADIUS_H}% / ${RADIUS_V}%`,
          }}
        >
          {src && (
            <img
              src={src}
              alt=""
              className="block size-full object-cover object-top"
            />
          )}
          {children}
        </div>
      ) : null}

      {hasMedia ? (
        <div
          className="iphone-screen-glass pointer-events-none absolute z-10 overflow-hidden"
          style={{
            left: `${LEFT_PCT}%`,
            top: `${TOP_PCT}%`,
            width: `${WIDTH_PCT}%`,
            height: `${HEIGHT_PCT}%`,
            borderRadius: `${RADIUS_H}% / ${RADIUS_V}%`,
          }}
        />
      ) : null}

      <svg
        viewBox={`0 0 ${PHONE_WIDTH} ${PHONE_HEIGHT}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute inset-0 z-20 size-full"
        style={{ transform: "translateZ(0)" }}
      >
        <rect
          x="1.5"
          y="1.5"
          width="427"
          height="881"
          rx="76"
          fill={`url(#${bodyGradientId})`}
          mask={hasMedia ? `url(#${screenPunchId})` : undefined}
        />
        <rect
          x="5.5"
          y="5.5"
          width="419"
          height="873"
          rx="72"
          stroke="rgba(255,255,255,0.76)"
          strokeWidth="1.5"
          mask={hasMedia ? `url(#${screenPunchId})` : undefined}
        />
        <rect
          x="10"
          y="10"
          width="410"
          height="864"
          rx="66"
          fill="#07080B"
          mask={hasMedia ? `url(#${screenPunchId})` : undefined}
        />
        <rect
          x="14.5"
          y="14.5"
          width="401"
          height="855"
          rx="62"
          stroke={`url(#${rimGradientId})`}
          strokeWidth="2"
          mask={hasMedia ? `url(#${screenPunchId})` : undefined}
        />
        <path
          d="M27 90C27 51.9 57.9 21 96 21H143"
          stroke="rgba(255,255,255,0.5)"
          strokeLinecap="round"
          strokeWidth="2"
          mask={hasMedia ? `url(#${screenPunchId})` : undefined}
        />
        <path
          d="M403 794C403 832.1 372.1 863 334 863H287"
          stroke="rgba(13,15,22,0.28)"
          strokeLinecap="round"
          strokeWidth="2"
          mask={hasMedia ? `url(#${screenPunchId})` : undefined}
        />
        <path
          d="M2 172C2 170.895 2.89543 170 4 170H7V207H4C2.89543 207 2 206.105 2 205V172Z"
          fill={`url(#${edgeGradientId})`}
        />
        <path
          d="M0 241C0 239.895 0.895431 239 2 239H7V311H2C0.895431 311 0 310.105 0 309V241Z"
          fill={`url(#${edgeGradientId})`}
        />
        <path
          d="M0 331C0 329.895 0.895431 329 2 329H7V401H2C0.895431 401 0 400.105 0 399V331Z"
          fill={`url(#${edgeGradientId})`}
        />
        <path
          d="M423 286H428C429.105 286 430 286.895 430 288V398C430 399.105 429.105 400 428 400H423V286Z"
          fill={`url(#${edgeGradientId})`}
        />

        <path
          d="M151 48C151 37.5066 159.507 29 170 29H260C270.493 29 279 37.5066 279 48C279 58.4934 270.493 67 260 67H170C159.507 67 151 58.4934 151 48Z"
          fill="#050506"
        />
        <path
          d="M252 48C252 43.5817 255.582 40 260 40C264.418 40 268 43.5817 268 48C268 52.4183 264.418 56 260 56C255.582 56 252 52.4183 252 48Z"
          fill="#111319"
        />
        <path
          d="M256 48C256 45.7909 257.791 44 260 44C262.209 44 264 45.7909 264 48C264 50.2091 262.209 52 260 52C257.791 52 256 50.2091 256 48Z"
          fill="#242936"
        />
        <path d="M177 48H235" stroke="rgba(255,255,255,0.08)" strokeLinecap="round" />

        <defs>
          <linearGradient id={bodyGradientId} x1="34" y1="28" x2="415" y2="859" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F4F1EA" />
            <stop offset="0.32" stopColor="#B8BBC4" />
            <stop offset="0.58" stopColor="#F7F5EE" />
            <stop offset="1" stopColor="#8E939E" />
          </linearGradient>
          <linearGradient id={rimGradientId} x1="70" y1="20" x2="376" y2="864" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgba(255,255,255,0.78)" />
            <stop offset="0.45" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="1" stopColor="rgba(13,15,22,0.34)" />
          </linearGradient>
          <linearGradient id={edgeGradientId} x1="0" y1="170" x2="9" y2="400" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E7E2D8" />
            <stop offset="1" stopColor="#9BA0AA" />
          </linearGradient>
          <mask id={screenPunchId} maskUnits="userSpaceOnUse">
            <rect
              x="0"
              y="0"
              width={PHONE_WIDTH}
              height={PHONE_HEIGHT}
              fill="white"
            />
            <rect
              x={SCREEN_X}
              y={SCREEN_Y}
              width={SCREEN_WIDTH}
              height={SCREEN_HEIGHT}
              rx={SCREEN_RADIUS}
              ry={SCREEN_RADIUS}
              fill="black"
            />
          </mask>
        </defs>
      </svg>
    </div>
  )
}
