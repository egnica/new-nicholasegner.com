"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./who-are-you.module.css";

const POSTER_URL =
  "https://nciholasegner.s3.us-east-2.amazonaws.com/images/who.gif";
const YOUTUBE_ID = "PNbBDrceCy8";

const WIDTH = 800;
const HEIGHT = 450;
const PLAYER_SIZE = 18;
const GATE_MIN_X = 300;
const GATE_MAX_X = 500;
const GATE_MIN_Y = 160;
const GATE_MAX_Y = 290;

const rooms = {
  0: { exits: { right: 1 } },
  1: { exits: { left: 0, up: 2, right: 3, down: 4 } },
  2: { exits: { down: 1 } },
  3: { exits: { left: 1 } },
  4: { exits: { up: 1, left: 5, right: 6, down: 7 } },
  5: { exits: { right: 4 } },
  6: { exits: { left: 4, right: 8 } },
  7: { exits: { up: 4 } },
  8: { exits: { left: 6 } },
};

function sanitizeName(value) {
  if (!value) return "";

  return value
    .normalize("NFKC")
    .replace(/[^\p{L}\p{M} .'-]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 40);
}

function drawPixelKey(ctx, x, y, scale = 1) {
  ctx.save();
  ctx.fillStyle = "#ffd43b";
  ctx.strokeStyle = "#111";
  ctx.lineWidth = 3 * scale;
  ctx.beginPath();
  ctx.arc(x + 10 * scale, y + 10 * scale, 8 * scale, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillRect(x + 17 * scale, y + 7 * scale, 24 * scale, 7 * scale);
  ctx.fillRect(x + 31 * scale, y + 13 * scale, 6 * scale, 8 * scale);
  ctx.fillRect(x + 38 * scale, y + 13 * scale, 6 * scale, 5 * scale);
  ctx.restore();
}

function drawBeachball(ctx, x, y, radius, rotation) {
  const colors = ["#ff4d4d", "#ffcc33", "#4dcf5f", "#3f8cff", "#9f5cff", "#ff65b3"];

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);

  colors.forEach((color, index) => {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(
      0,
      0,
      radius,
      (Math.PI * 2 * index) / colors.length,
      (Math.PI * 2 * (index + 1)) / colors.length,
    );
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  });

  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#111";
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.24, 0, Math.PI * 2);
  ctx.fillStyle = "#f7f7f7";
  ctx.fill();
  ctx.strokeStyle = "#111";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.restore();
}

function drawWalls(ctx, exits) {
  const wall = "#4e66ff";
  const thickness = 16;

  ctx.fillStyle = wall;

  if (exits.up) {
    ctx.fillRect(0, 0, GATE_MIN_X, thickness);
    ctx.fillRect(GATE_MAX_X, 0, WIDTH - GATE_MAX_X, thickness);
  } else {
    ctx.fillRect(0, 0, WIDTH, thickness);
  }

  if (exits.down) {
    ctx.fillRect(0, HEIGHT - thickness, GATE_MIN_X, thickness);
    ctx.fillRect(GATE_MAX_X, HEIGHT - thickness, WIDTH - GATE_MAX_X, thickness);
  } else {
    ctx.fillRect(0, HEIGHT - thickness, WIDTH, thickness);
  }

  if (exits.left) {
    ctx.fillRect(0, 0, thickness, GATE_MIN_Y);
    ctx.fillRect(0, GATE_MAX_Y, thickness, HEIGHT - GATE_MAX_Y);
  } else {
    ctx.fillRect(0, 0, thickness, HEIGHT);
  }

  if (exits.right) {
    ctx.fillRect(WIDTH - thickness, 0, thickness, GATE_MIN_Y);
    ctx.fillRect(WIDTH - thickness, GATE_MAX_Y, thickness, HEIGHT - GATE_MAX_Y);
  } else {
    ctx.fillRect(WIDTH - thickness, 0, thickness, HEIGHT);
  }
}

function circleHitsPlayer(player, cx, cy, radius) {
  const nearestX = Math.max(player.x, Math.min(cx, player.x + PLAYER_SIZE));
  const nearestY = Math.max(player.y, Math.min(cy, player.y + PLAYER_SIZE));
  const dx = cx - nearestX;
  const dy = cy - nearestY;
  return dx * dx + dy * dy <= radius * radius;
}

function rectHitsPlayer(player, rect) {
  return (
    player.x < rect.x + rect.w &&
    player.x + PLAYER_SIZE > rect.x &&
    player.y < rect.y + rect.h &&
    player.y + PLAYER_SIZE > rect.y
  );
}

function createGameState() {
  return {
    room: 0,
    x: 105,
    y: HEIGHT / 2 - PLAYER_SIZE / 2,
    hasKey: false,
    fakeKeyVisible: true,
    fakeMessageUntil: 0,
    flashUntil: 0,
  };
}

export default function WhoAreYouExperience() {
  const searchParams = useSearchParams();
  const canvasRef = useRef(null);
  const gameShellRef = useRef(null);
  const keysRef = useRef(new Set());
  const activeRef = useRef(false);
  const gameRef = useRef(createGameState());
  const startedAt = useRef(Date.now());

  const [playing, setPlaying] = useState(false);
  const [won, setWon] = useState(false);
  const [message, setMessage] = useState("");
  const [sendStatus, setSendStatus] = useState("idle");
  const [sendError, setSendError] = useState("");
  const [website, setWebsite] = useState("");

  const name = useMemo(
    () => sanitizeName(searchParams.get("name")),
    [searchParams],
  );

  useEffect(() => {
    if (won) return undefined;

    const canvas = canvasRef.current;
    const shell = gameShellRef.current;
    if (!canvas || !shell) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let animationFrame = 0;
    let previous = performance.now();

    const observer = new IntersectionObserver(
      ([entry]) => {
        activeRef.current = entry.isIntersecting && entry.intersectionRatio >= 0.35;
        if (!activeRef.current) {
          keysRef.current.clear();
        }
      },
      { threshold: [0, 0.35, 0.6, 1] },
    );

    observer.observe(shell);

    function resetGame() {
      gameRef.current = createGameState();
      keysRef.current.clear();
    }

    function handleKeyDown(event) {
      if (!activeRef.current) return;
      if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        return;
      }

      event.preventDefault();
      keysRef.current.add(event.key);
    }

    function handleKeyUp(event) {
      if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        return;
      }
      keysRef.current.delete(event.key);
    }

    window.addEventListener("keydown", handleKeyDown, { passive: false });
    window.addEventListener("keyup", handleKeyUp);

    function transition(direction) {
      const game = gameRef.current;
      const nextRoom = rooms[game.room].exits[direction];
      if (typeof nextRoom !== "number") return false;

      game.room = nextRoom;

      if (direction === "right") game.x = 22;
      if (direction === "left") game.x = WIDTH - PLAYER_SIZE - 22;
      if (direction === "up") game.y = HEIGHT - PLAYER_SIZE - 22;
      if (direction === "down") game.y = 22;

      return true;
    }

    function constrainOrTransition(nx, ny) {
      const game = gameRef.current;
      const centerX = nx + PLAYER_SIZE / 2;
      const centerY = ny + PLAYER_SIZE / 2;

      if (nx < 0) {
        if (centerY >= GATE_MIN_Y && centerY <= GATE_MAX_Y && transition("left")) {
          return;
        }
        nx = 16;
      }

      if (nx + PLAYER_SIZE > WIDTH) {
        if (centerY >= GATE_MIN_Y && centerY <= GATE_MAX_Y && transition("right")) {
          return;
        }
        nx = WIDTH - PLAYER_SIZE - 16;
      }

      if (ny < 0) {
        if (centerX >= GATE_MIN_X && centerX <= GATE_MAX_X && transition("up")) {
          return;
        }
        ny = 16;
      }

      if (ny + PLAYER_SIZE > HEIGHT) {
        if (centerX >= GATE_MIN_X && centerX <= GATE_MAX_X && transition("down")) {
          return;
        }
        ny = HEIGHT - PLAYER_SIZE - 16;
      }

      game.x = Math.max(16, Math.min(WIDTH - PLAYER_SIZE - 16, nx));
      game.y = Math.max(16, Math.min(HEIGHT - PLAYER_SIZE - 16, ny));
    }

    function killPlayer(now) {
      resetGame();
      gameRef.current.flashUntil = now + 150;
    }

    function drawDoor(game) {
      const door = { x: 348, y: 14, w: 104, h: 70 };

      ctx.fillStyle = "#2d160d";
      ctx.fillRect(door.x - 5, door.y - 5, door.w + 10, door.h + 10);

      ctx.fillStyle = "#8f3f21";
      ctx.fillRect(door.x, door.y, door.w, door.h);

      ctx.fillStyle = "#a94c28";
      ctx.fillRect(door.x + 10, door.y + 9, door.w - 20, door.h - 18);

      ctx.fillStyle = game.hasKey ? "#49d17d" : "#ffd43b";
      ctx.fillRect(door.x + 44, door.y + 29, 16, 22);
      ctx.fillStyle = "#111";
      ctx.fillRect(door.x + 50, door.y + 35, 4, 10);

      return door;
    }

    function drawRoom(now) {
      const game = gameRef.current;
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      ctx.fillStyle = "#06070d";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      drawWalls(ctx, rooms[game.room].exits);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "700 28px monospace";

      const enemies = [];

      if (game.room === 0) {
        const door = drawDoor(game);
        if (rectHitsPlayer(game, door) && game.hasKey) {
          setWon(true);
          setMessage(
            name
              ? `${name} beat the game! What a legend!`
              : "I beat the game! What a legend!",
          );
          return;
        }
      }

      if (game.room === 2) {
        ctx.fillStyle = "#f5f7ff";
        ctx.font = "700 25px monospace";
        ctx.fillText("FIND THE KEY", WIDTH / 2, HEIGHT / 2 - 24);
        ctx.fillText("TO UNLOCK GREAT POTENTIAL", WIDTH / 2, HEIGHT / 2 + 24);
      }

      if (game.room === 3) {
        const cx = WIDTH / 2;
        const cy = HEIGHT / 2;
        const radius = 138;
        ctx.fillStyle = "#d92f2f";
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
        enemies.push({ x: cx, y: cy, r: radius });
      }

      if (game.room === 4) {
        enemies.push(
          {
            x: 220 + Math.sin(now * 0.0022) * 115,
            y: 155,
            r: 21,
          },
          {
            x: 535,
            y: 225 + Math.sin(now * 0.0018) * 105,
            r: 24,
          },
          {
            x: 330 + Math.sin(now * 0.0014) * 95,
            y: 340,
            r: 18,
          },
        );

        enemies.forEach((enemy) => {
          ctx.fillStyle = "#e33232";
          ctx.beginPath();
          ctx.arc(enemy.x, enemy.y, enemy.r, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      if (game.room === 5 && game.fakeKeyVisible) {
        const fakeKey = { x: WIDTH / 2 - 22, y: HEIGHT / 2 - 12, w: 50, h: 28 };
        drawPixelKey(ctx, fakeKey.x, fakeKey.y, 1);

        if (rectHitsPlayer(game, fakeKey)) {
          game.fakeKeyVisible = false;
          game.fakeMessageUntil = now + 2600;
        }
      }

      if (game.room === 5 && now < game.fakeMessageUntil) {
        ctx.fillStyle = "#ffffff";
        ctx.font = "800 32px monospace";
        ctx.fillText("NOPE.", WIDTH / 2, HEIGHT / 2 - 28);
        ctx.font = "700 22px monospace";
        ctx.fillText("YOUR KEY IS IN ANOTHER CASTLE.", WIDTH / 2, HEIGHT / 2 + 24);
      }

      if (game.room === 6) {
        const bx = WIDTH / 2 + Math.cos(now * 0.00115) * 135;
        const by = HEIGHT / 2 + Math.sin(now * 0.0016) * 95;
        const radius = 34;
        drawBeachball(ctx, bx, by, radius, now * 0.002);
        enemies.push({ x: bx, y: by, r: radius });
      }

      if (game.room === 7) {
        ctx.fillStyle = "#f5f7ff";
        ctx.font = "900 88px monospace";
        ctx.fillText("404", WIDTH / 2, HEIGHT / 2 - 12);
        ctx.font = "700 22px monospace";
        ctx.fillStyle = "#9ea7c7";
        ctx.fillText("NOT FOUND", WIDTH / 2, HEIGHT / 2 + 62);
      }

      if (game.room === 8) {
        const realKey = { x: WIDTH / 2 - 22, y: HEIGHT / 2 - 12, w: 50, h: 28 };

        if (!game.hasKey) {
          drawPixelKey(ctx, realKey.x, realKey.y, 1);
          if (rectHitsPlayer(game, realKey)) {
            game.hasKey = true;
          }
        }

        const enemy = {
          x: WIDTH / 2 + Math.sin(now * 0.0017) * 170,
          y: 335,
          r: 22,
        };
        enemies.push(enemy);

        ctx.fillStyle = "#e33232";
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (enemies.some((enemy) => circleHitsPlayer(game, enemy.x, enemy.y, enemy.r))) {
        killPlayer(now);
        return;
      }

      ctx.fillStyle = "#4de06e";
      ctx.fillRect(game.x, game.y, PLAYER_SIZE, PLAYER_SIZE);

      if (game.hasKey) {
        drawPixelKey(ctx, game.x + PLAYER_SIZE + 4, game.y - 1, 0.62);
      }

      if (now < game.flashUntil) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
      }
    }

    function tick(now) {
      const dt = Math.min((now - previous) / 1000, 0.035);
      previous = now;

      const game = gameRef.current;
      const speed = 235;
      let dx = 0;
      let dy = 0;

      if (keysRef.current.has("ArrowLeft")) dx -= speed * dt;
      if (keysRef.current.has("ArrowRight")) dx += speed * dt;
      if (keysRef.current.has("ArrowUp")) dy -= speed * dt;
      if (keysRef.current.has("ArrowDown")) dy += speed * dt;

      if (dx !== 0 || dy !== 0) {
        constrainOrTransition(game.x + dx, game.y + dy);
      }

      drawRoom(now);
      animationFrame = requestAnimationFrame(tick);
    }

    animationFrame = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      keysRef.current.clear();
    };
  }, [name, won]);

  const sendVictoryMessage = async (event) => {
    event.preventDefault();
    if (sendStatus === "sending") return;

    setSendStatus("sending");
    setSendError("");

    try {
      const response = await fetch("/api/who-are-you", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "Someone",
          message,
          website,
          startedAt: startedAt.current,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || "Message could not be sent.");
      }

      setSendStatus("sent");
    } catch (error) {
      setSendStatus("error");
      setSendError(error?.message || "Message could not be sent.");
    }
  };

  return (
    <section className={styles.experience}>
      <div
        className={`${styles.playerShell} ${playing ? styles.playerShellPlaying : ""}`}
      >
        {playing ? (
          <iframe
            className={styles.iframe}
            src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
            title="The Who — Who Are You"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className={styles.posterButton}
            onClick={() => setPlaying(true)}
            aria-label="Play Who Are You by The Who"
          >
            <img
              src={POSTER_URL}
              alt="Who Are You? — Nicholas Egner"
              className={styles.posterImage}
            />
            <span className={styles.posterShade} aria-hidden="true" />
            <span className={styles.playControl} aria-hidden="true">
              <span className={styles.playCircle}>
                <svg viewBox="0 0 64 64" role="presentation">
                  <path d="M25 18.5 46 32 25 45.5Z" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>

      <div className={styles.credits}>
        <div>
          <strong>Who Are You</strong>
          <span>The Who · Official video via YouTube</span>
        </div>
        <a
          href="https://www.youtube.com/watch?v=PNbBDrceCy8"
          target="_blank"
          rel="noopener noreferrer"
        >
          Watch on YouTube ↗
        </a>
      </div>

      <section className={styles.intro}>
        <h1>{name ? `${name}, so who am I?` : "So, who am I?"}</h1>
        <p className={styles.fairQuestion}>
          <strong>Fair question.</strong>
        </p>
        <p className={styles.lead}>
          I’m Nicholas Egner. I build websites, video, content systems, and
          custom tools for businesses that want their digital presence to work
          a little harder.
        </p>
      </section>

      <section className={styles.pathsSection}>
        <h2>What do you want to know?</h2>
        <nav className={styles.paths} aria-label="Explore Nicholas Egner">
          <Link href="/video-experience" className={styles.pathLink}>
            <span>
              <small>Who are you, really?</small>
              Get the longer answer
            </span>
            <span className={styles.arrow} aria-hidden="true">→</span>
          </Link>

          <Link href="/projects" className={styles.pathLink}>
            <span>
              <small>See what I build</small>
              Projects and work
            </span>
            <span className={styles.arrow} aria-hidden="true">→</span>
          </Link>

          <Link href="/blog" className={styles.pathLink}>
            <span>
              <small>What am I working on?</small>
              Recent ideas and builds
            </span>
            <span className={styles.arrow} aria-hidden="true">→</span>
          </Link>

          <a href="mailto:nick@nicholasegner.com" className={styles.pathLink}>
            <span>
              <small>Just say hello</small>
              Email me
            </span>
            <span className={styles.arrow} aria-hidden="true">→</span>
          </a>
        </nav>
      </section>

      <section className={styles.gameSection} aria-label="Hidden maze game">
        <div className={styles.gameShell} ref={gameShellRef}>
          {!won ? (
            <canvas
              ref={canvasRef}
              className={styles.gameCanvas}
              width={WIDTH}
              height={HEIGHT}
              aria-label="Retro maze game"
            />
          ) : (
            <div className={styles.winPanel}>
              <p className={styles.winEyebrow}>YOU WON!</p>
              <h2>{name ? `${name} beat the game!` : "You beat the game!"}</h2>
              <p>What a legend!</p>

              {sendStatus === "sent" ? (
                <div className={styles.sentMessage}>SENT. LEGEND STATUS CONFIRMED.</div>
              ) : (
                <form onSubmit={sendVictoryMessage} className={styles.winForm}>
                  <label className={styles.srOnly} htmlFor="game-message">
                    Victory message
                  </label>
                  <textarea
                    id="game-message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    maxLength={500}
                    required
                    rows={4}
                  />
                  <div className={styles.honeypot} aria-hidden="true">
                    <label htmlFor="game-website">Website</label>
                    <input
                      id="game-website"
                      type="text"
                      value={website}
                      onChange={(event) => setWebsite(event.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  <button type="submit" disabled={sendStatus === "sending"}>
                    {sendStatus === "sending" ? "SENDING…" : "SEND TO NICK →"}
                  </button>
                  {sendStatus === "error" && (
                    <p className={styles.sendError}>{sendError}</p>
                  )}
                </form>
              )}
            </div>
          )}
        </div>
      </section>
    </section>
  );
}
