"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "../../who-are-you/who-are-you.module.css";
import useTrackedContact from "../../hooks/useTrackedContact";

const WIDTH = 800;
const HEIGHT = 450;
const PLAYER_SIZE = 18;
const GATE_MIN_X = 300;
const GATE_MAX_X = 500;
const GATE_MIN_Y = 160;
const GATE_MAX_Y = 290;

const ROOM_EXITS = {
  0: { right: 1 },
  1: { left: 0, up: 2, right: 3, down: 4 },
  2: { down: 1 },
  3: { left: 1 },
  4: { up: 1, left: 5, right: 6, down: 7 },
  5: { right: 4 },
  6: { left: 4, right: 8 },
  7: { up: 4 },
  8: { left: 6 },
};

function getRoomExits(roomId) {
  return ROOM_EXITS[roomId] || {};
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

function drawMacPinwheel(ctx, x, y, radius, rotation) {
  const colors = [
    "#ff365e",
    "#ff7a28",
    "#ffd52a",
    "#9edb32",
    "#21d86c",
    "#20d8c5",
    "#20a9ff",
    "#4169ff",
    "#7653ff",
    "#bd4cff",
    "#f34acb",
    "#ff4f89",
  ];

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);

  colors.forEach((color, index) => {
    const start = (Math.PI * 2 * index) / colors.length;
    const end = (Math.PI * 2 * (index + 1)) / colors.length;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, start, end);
    ctx.closePath();

    const gradient = ctx.createRadialGradient(
      -radius * 0.2,
      -radius * 0.28,
      radius * 0.1,
      0,
      0,
      radius,
    );
    gradient.addColorStop(0, "#ffffff");
    gradient.addColorStop(0.14, color);
    gradient.addColorStop(1, color);
    ctx.fillStyle = gradient;
    ctx.fill();
  });

  const gloss = ctx.createRadialGradient(
    -radius * 0.35,
    -radius * 0.42,
    0,
    -radius * 0.2,
    -radius * 0.3,
    radius * 0.92,
  );
  gloss.addColorStop(0, "rgba(255,255,255,0.78)");
  gloss.addColorStop(0.28, "rgba(255,255,255,0.22)");
  gloss.addColorStop(0.62, "rgba(255,255,255,0)");
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fillStyle = gloss;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(255,255,255,0.72)";
  ctx.stroke();

  ctx.restore();
}

function drawWalls(ctx, exits) {
  const wall = "#4e66ff";
  const thickness = 16;

  ctx.fillStyle = wall;

  if (typeof exits.up === "number") {
    ctx.fillRect(0, 0, GATE_MIN_X, thickness);
    ctx.fillRect(GATE_MAX_X, 0, WIDTH - GATE_MAX_X, thickness);
  } else {
    ctx.fillRect(0, 0, WIDTH, thickness);
  }

  if (typeof exits.down === "number") {
    ctx.fillRect(0, HEIGHT - thickness, GATE_MIN_X, thickness);
    ctx.fillRect(GATE_MAX_X, HEIGHT - thickness, WIDTH - GATE_MAX_X, thickness);
  } else {
    ctx.fillRect(0, HEIGHT - thickness, WIDTH, thickness);
  }

  if (typeof exits.left === "number") {
    ctx.fillRect(0, 0, thickness, GATE_MIN_Y);
    ctx.fillRect(0, GATE_MAX_Y, thickness, HEIGHT - GATE_MAX_Y);
  } else {
    ctx.fillRect(0, 0, thickness, HEIGHT);
  }

  if (typeof exits.right === "number") {
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
    fakeKeyTriggered: false,
    flashUntil: 0,
    blobX: 600,
    blobY: HEIGHT / 2,
    blobRadius: 72,
    pinwheelX: WIDTH / 2,
    pinwheelY: HEIGHT / 2,
  };
}

export default function NicholasAdventureGame({
  title,
  headingLevel = "h2",
  messageEndpoint = "/api/nicholas-adventure",
}) {
  const searchParams = useSearchParams();
  const canvasRef = useRef(null);
  const gameShellRef = useRef(null);
  const mobileControlsRef = useRef(null);
  const keysRef = useRef(new Set());
  const activeRef = useRef(false);
  const gameRef = useRef(createGameState());
  const startedAt = useRef(Date.now());
  const autoWinAttemptedRef = useRef(false);

  const [won, setWon] = useState(false);
  const [message, setMessage] = useState("");
  const [noteStatus, setNoteStatus] = useState("idle");
  const [noteError, setNoteError] = useState("");
  const [winnerName, setWinnerName] = useState("");
  const [winnerEmail, setWinnerEmail] = useState("");
  const [sendStatus, setSendStatus] = useState("idle");
  const [sendError, setSendError] = useState("");
  const [website, setWebsite] = useState("");

  const {
    trackingId,
    isKnownContact,
    name,
    resolving: resolvingContact,
  } = useTrackedContact(searchParams);

  const HeadingTag = headingLevel === "h1" ? "h1" : "h2";

  useEffect(() => {
    if (
      !won ||
      !isKnownContact ||
      !trackingId ||
      autoWinAttemptedRef.current
    ) {
      return;
    }

    autoWinAttemptedRef.current = true;
    setSendStatus("sending");
    setSendError("");

    fetch(messageEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        trackingId,
        startedAt: startedAt.current,
        utmSource: searchParams.get("utm_source") || "",
        utmMedium: searchParams.get("utm_medium") || "",
        utmCampaign: searchParams.get("utm_campaign") || "",
        referrer: typeof document !== "undefined" ? document.referrer : "",
        sourcePath:
          typeof window !== "undefined" ? window.location.pathname : "",
      }),
    })
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));

        if (!response.ok || !data?.tracked) {
          throw new Error(
            data?.error || "Automatic victory tracking is unavailable.",
          );
        }

        if (data?.name) {
          setWinnerName(data.name);
        }
        setSendStatus("sent");
      })
      .catch((error) => {
        setSendStatus("error");
        setSendError(
          error?.message ||
            "Automatic victory tracking is unavailable. You can claim it below.",
        );
      });
  }, [
    isKnownContact,
    messageEndpoint,
    searchParams,
    trackingId,
    won,
  ]);

  const pressMouseDirection = (event, key) => {
    event.preventDefault();
    keysRef.current.add(key);
  };

  const releaseMouseDirection = (event, key) => {
    event.preventDefault();
    keysRef.current.delete(key);
  };

  useEffect(() => {
    if (won) return undefined;

    const shell = gameShellRef.current;
    const controls = mobileControlsRef.current;

    if (!shell || !controls) return undefined;

    const touchDirections = new Map();
    const blockBrowserGesture = (event) => event.preventDefault();

    const keyAtPoint = (clientX, clientY) => {
      const element = document.elementFromPoint(clientX, clientY);
      const button = element?.closest?.("[data-game-key]");
      return button?.dataset?.gameKey || "";
    };

    const updateTouchDirection = (touch) => {
      const previousKey = touchDirections.get(touch.identifier);
      const nextKey = keyAtPoint(touch.clientX, touch.clientY);

      if (previousKey === nextKey) return;

      if (previousKey) {
        keysRef.current.delete(previousKey);
      }

      if (nextKey) {
        keysRef.current.add(nextKey);
        touchDirections.set(touch.identifier, nextKey);
      } else {
        touchDirections.delete(touch.identifier);
      }
    };

    const handleTouchStart = (event) => {
      event.preventDefault();
      Array.from(event.changedTouches).forEach(updateTouchDirection);
    };

    const handleTouchMove = (event) => {
      event.preventDefault();
      Array.from(event.changedTouches).forEach(updateTouchDirection);
    };

    const handleTouchEnd = (event) => {
      event.preventDefault();

      Array.from(event.changedTouches).forEach((touch) => {
        const key = touchDirections.get(touch.identifier);
        if (key) {
          keysRef.current.delete(key);
        }
        touchDirections.delete(touch.identifier);
      });
    };

    controls.addEventListener("touchstart", handleTouchStart, { passive: false });
    controls.addEventListener("touchmove", handleTouchMove, { passive: false });
    controls.addEventListener("touchend", handleTouchEnd, { passive: false });
    controls.addEventListener("touchcancel", handleTouchEnd, { passive: false });

    shell.addEventListener("touchstart", blockBrowserGesture, { passive: false });
    shell.addEventListener("touchmove", blockBrowserGesture, { passive: false });

    [shell, controls].forEach((element) => {
      element.addEventListener("contextmenu", blockBrowserGesture);
      element.addEventListener("selectstart", blockBrowserGesture);
      element.addEventListener("dragstart", blockBrowserGesture);
    });

    return () => {
      controls.removeEventListener("touchstart", handleTouchStart);
      controls.removeEventListener("touchmove", handleTouchMove);
      controls.removeEventListener("touchend", handleTouchEnd);
      controls.removeEventListener("touchcancel", handleTouchEnd);

      shell.removeEventListener("touchstart", blockBrowserGesture);
      shell.removeEventListener("touchmove", blockBrowserGesture);

      [shell, controls].forEach((element) => {
        element.removeEventListener("contextmenu", blockBrowserGesture);
        element.removeEventListener("selectstart", blockBrowserGesture);
        element.removeEventListener("dragstart", blockBrowserGesture);
      });

      touchDirections.forEach((key) => keysRef.current.delete(key));
      touchDirections.clear();
    };
  }, [won]);

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
      const exits = getRoomExits(game.room);
      const nextRoom = exits[direction];
      if (typeof nextRoom !== "number") return false;

      const previousRoom = game.room;
      game.room = nextRoom;

      if (direction === "right") game.x = 22;
      if (direction === "left") game.x = WIDTH - PLAYER_SIZE - 22;
      if (direction === "up") game.y = HEIGHT - PLAYER_SIZE - 22;
      if (direction === "down") game.y = 22;

      if (nextRoom === 3 && previousRoom !== 3) {
        game.blobX = 610;
        game.blobY = HEIGHT / 2;
        game.blobRadius = 72;
      }

      if (previousRoom === 3 && nextRoom !== 3) {
        game.blobX = 600;
        game.blobY = HEIGHT / 2;
        game.blobRadius = 72;
      }

      if (nextRoom === 6 && previousRoom !== 6) {
        game.pinwheelX = WIDTH / 2;
        game.pinwheelY = HEIGHT / 2;
      }

      return true;
    }

    function constrainOrTransition(nx, ny) {
      const game = gameRef.current;
      const centerX = nx + PLAYER_SIZE / 2;
      const centerY = ny + PLAYER_SIZE / 2;
      const wallInset = 16;

      if (nx <= wallInset) {
        if (centerY >= GATE_MIN_Y && centerY <= GATE_MAX_Y && transition("left")) {
          return;
        }
        nx = wallInset;
      }

      if (nx + PLAYER_SIZE >= WIDTH - wallInset) {
        if (centerY >= GATE_MIN_Y && centerY <= GATE_MAX_Y && transition("right")) {
          return;
        }
        nx = WIDTH - PLAYER_SIZE - wallInset;
      }

      if (ny <= wallInset) {
        if (centerX >= GATE_MIN_X && centerX <= GATE_MAX_X && transition("up")) {
          return;
        }
        ny = wallInset;
      }

      if (ny + PLAYER_SIZE >= HEIGHT - wallInset) {
        if (centerX >= GATE_MIN_X && centerX <= GATE_MAX_X && transition("down")) {
          return;
        }
        ny = HEIGHT - PLAYER_SIZE - wallInset;
      }

      game.x = Math.max(
        wallInset,
        Math.min(WIDTH - PLAYER_SIZE - wallInset, nx),
      );
      game.y = Math.max(
        wallInset,
        Math.min(HEIGHT - PLAYER_SIZE - wallInset, ny),
      );
    }

    function killPlayer(now) {
      resetGame();
      gameRef.current.flashUntil = now + 150;
    }

    function drawChest(game) {
      const chest = { x: 320, y: 34, w: 160, h: 92 };

      ctx.fillStyle = "#241007";
      ctx.fillRect(chest.x - 6, chest.y - 6, chest.w + 12, chest.h + 12);

      ctx.fillStyle = "#6f2d12";
      ctx.fillRect(chest.x, chest.y, chest.w, 34);

      ctx.fillStyle = "#9a4219";
      ctx.fillRect(chest.x, chest.y + 34, chest.w, chest.h - 34);

      ctx.fillStyle = "#bd5828";
      ctx.fillRect(chest.x + 12, chest.y + 10, chest.w - 24, 10);
      ctx.fillRect(chest.x + 12, chest.y + 49, chest.w - 24, 15);

      ctx.fillStyle = "#3a190c";
      ctx.fillRect(chest.x, chest.y + 31, chest.w, 8);

      const lockX = chest.x + chest.w / 2;
      const lockY = chest.y + 56;

      ctx.fillStyle = game.hasKey ? "#63e08a" : "#ffd43b";
      ctx.fillRect(lockX - 18, lockY - 20, 36, 42);

      ctx.fillStyle = "#111";
      ctx.beginPath();
      ctx.arc(lockX, lockY - 5, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(lockX - 3, lockY - 4, 6, 15);

      ctx.strokeStyle = game.hasKey ? "#63e08a" : "#ffd43b";
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.arc(lockX, lockY - 22, 17, Math.PI, 0);
      ctx.stroke();

      return chest;
    }

    function drawRoom(now, dt) {
      const game = gameRef.current;
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      ctx.fillStyle = "#06070d";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      drawWalls(ctx, getRoomExits(game.room));

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "700 28px monospace";

      const enemies = [];

      if (game.room === 0) {
        const chest = drawChest(game);
        if (rectHitsPlayer(game, chest) && game.hasKey) {
          setWon(true);
          setWinnerName((currentName) => currentName || name || "");
          setMessage("");
          return;
        }
      }

      if (game.room === 1) {
        const enemy = {
          x: 255 + Math.sin(now * 0.0011) * 145,
          y: 118,
          r: 18,
        };

        enemies.push(enemy);

        ctx.fillStyle = "#e33232";
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (game.room === 2) {
        ctx.fillStyle = "#f5f7ff";
        ctx.font = "700 25px monospace";
        ctx.fillText("FIND THE KEY", WIDTH / 2, HEIGHT / 2 - 24);
        ctx.fillText("TO UNLOCK GREAT POTENTIAL", WIDTH / 2, HEIGHT / 2 + 24);
      }

      if (game.room === 3) {
        const playerCenterX = game.x + PLAYER_SIZE / 2;
        const playerCenterY = game.y + PLAYER_SIZE / 2;
        const dx = playerCenterX - game.blobX;
        const dy = playerCenterY - game.blobY;
        const distance = Math.hypot(dx, dy) || 1;
        const chaseSpeed = 125;

        game.blobX += (dx / distance) * chaseSpeed * dt;
        game.blobY += (dy / distance) * chaseSpeed * dt;
        game.blobRadius = Math.min(360, game.blobRadius + 185 * dt);

        ctx.fillStyle = "#d92f2f";
        ctx.beginPath();
        ctx.arc(game.blobX, game.blobY, game.blobRadius, 0, Math.PI * 2);
        ctx.fill();

        enemies.push({
          x: game.blobX,
          y: game.blobY,
          r: game.blobRadius,
        });
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
          game.fakeKeyTriggered = true;
        }
      }

      if (game.room === 5 && game.fakeKeyTriggered) {
        ctx.fillStyle = "#ffffff";
        ctx.font = "800 32px monospace";
        ctx.fillText("NOPE.", WIDTH / 2, HEIGHT / 2 - 28);
        ctx.font = "700 22px monospace";
        ctx.fillText("YOUR KEY IS IN ANOTHER CASTLE.", WIDTH / 2, HEIGHT / 2 + 24);

        ctx.fillStyle = "#777b89";
        ctx.fillRect(WIDTH / 2 - 24, HEIGHT / 2 + 66, 48, 8);
        ctx.fillRect(WIDTH / 2 - 5, HEIGHT / 2 + 58, 10, 24);
      }

      if (game.room === 6) {
        ctx.fillStyle = "#f5f7ff";
        ctx.font = "900 24px monospace";
        ctx.fillText("MAC WHEEL OF DEATH!", WIDTH / 2, 62);

        const playerCenterX = game.x + PLAYER_SIZE / 2;
        const playerCenterY = game.y + PLAYER_SIZE / 2;
        const dx = playerCenterX - game.pinwheelX;
        const dy = playerCenterY - game.pinwheelY;
        const distance = Math.hypot(dx, dy) || 1;
        const chaseSpeed = 155;
        const radius = 34;

        game.pinwheelX += (dx / distance) * chaseSpeed * dt;
        game.pinwheelY += (dy / distance) * chaseSpeed * dt;

        drawMacPinwheel(
          ctx,
          game.pinwheelX,
          game.pinwheelY,
          radius,
          now * 0.0065,
        );

        enemies.push({
          x: game.pinwheelX,
          y: game.pinwheelY,
          r: radius,
        });
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

      drawRoom(now, dt);
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

  const restartGame = () => {
    gameRef.current = createGameState();
    keysRef.current.clear();
    setWon(false);
    setMessage("");
    setNoteStatus("idle");
    setNoteError("");
    setWinnerName(name || "");
    setWinnerEmail("");
    setSendStatus("idle");
    setSendError("");
    setWebsite("");
    autoWinAttemptedRef.current = false;
    startedAt.current = Date.now();
  };

  const sendVictoryMessage = async (event) => {
    event.preventDefault();
    if (sendStatus === "sending") return;

    setSendStatus("sending");
    setSendError("");

    try {
      const response = await fetch(messageEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: winnerName || name || "Someone",
          email: winnerEmail,
          message,
          website,
          startedAt: startedAt.current,
          utmSource: searchParams.get("utm_source") || "",
          utmMedium: searchParams.get("utm_medium") || "",
          utmCampaign: searchParams.get("utm_campaign") || "",
          referrer: typeof document !== "undefined" ? document.referrer : "",
          sourcePath:
            typeof window !== "undefined" ? window.location.pathname : "",
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

  const sendTrackedNote = async (event) => {
    event.preventDefault();
    if (!isKnownContact || !trackingId || sendStatus !== "sent" || noteStatus === "sending" || noteStatus === "sent") return;
    const note = message.trim();
    if (!note) return;

    setNoteStatus("sending");
    setNoteError("");
    try {
      const response = await fetch("/api/adventure-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackingId, message: note, website }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error || "Message could not be sent.");
      setNoteStatus("sent");
      setMessage("");
    } catch (error) {
      setNoteStatus("error");
      setNoteError(error?.message || "Message could not be sent.");
    }
  };

  return (
    <section className={styles.gameSection} aria-label="Nicholas's Adventure">
      <HeadingTag className={styles.gameTitle}>
        {title || (name ? `${name}’s Adventure` : "Your Adventure")}
      </HeadingTag>
      {isKnownContact && name && (
        <p className={styles.gameWelcome}>
          {name}, welcome to Nicholas’s Adventure! Use your arrow keys on
          desktop or the on-screen controls on mobile to explore the dungeon.
          Find the key, avoid the enemies, and enjoy!
        </p>
      )}
      <div
        className={`${styles.gameShell} ${won ? styles.gameShellWon : ""}`}
        ref={gameShellRef}
        onContextMenu={(event) => {
          if (!won) event.preventDefault();
        }}
        onDragStart={(event) => {
          if (!won) event.preventDefault();
        }}
      >
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
            <h2>{winnerName || name ? `${winnerName || name} beat the game!` : "You beat the game!"}</h2>
            <p>What a legend!</p>

            {sendStatus === "sent" ? (
              <div className={styles.sentMessage}>
                {isKnownContact
                  ? "VICTORY RECORDED."
                  : "VICTORY CLAIMED. CHECK YOUR EMAIL."}
              </div>
            ) : isKnownContact && sendStatus === "sending" ? (
              <div className={styles.sentMessage}>RECORDING VICTORY…</div>
            ) : resolvingContact && trackingId ? (
              <div className={styles.sentMessage}>VERIFYING PLAYER…</div>
            ) : (
              <form onSubmit={sendVictoryMessage} className={styles.winForm}>
                <p className={styles.winPrompt}>
                  Want proof you were here before this thing goes global?
                </p>

                <div className={styles.winFields}>
                  <label>
                    <span>Name</span>
                    <input
                      type="text"
                      value={winnerName}
                      onChange={(event) => setWinnerName(event.target.value)}
                      maxLength={80}
                      autoComplete="name"
                      required
                    />
                  </label>

                  <label>
                    <span>Email</span>
                    <input
                      type="email"
                      value={winnerEmail}
                      onChange={(event) => setWinnerEmail(event.target.value)}
                      maxLength={160}
                      autoComplete="email"
                      required
                    />
                  </label>
                </div>

                <label className={styles.winMessage}>
                  <span>Message <em>(optional)</em></span>
                  <textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    maxLength={300}
                    rows={2}
                    placeholder="Say something to Nick..."
                  />
                </label>

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
                  {sendStatus === "sending" ? "CLAIMING…" : "CLAIM VICTORY →"}
                </button>
                {sendStatus === "error" && (
                  <p className={styles.sendError}>{sendError}</p>
                )}
              </form>
            )}

            {isKnownContact && sendStatus === "sent" && (
              noteStatus === "sent" ? (
                <p className={styles.sentMessage} role="status">MESSAGE SENT!</p>
              ) : (
                <form onSubmit={sendTrackedNote} className={styles.trackedNoteForm}>
                  <label className={styles.winMessage}>
                    <span>Want to leave Nicholas a message?</span>
                    <textarea
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      maxLength={500}
                      rows={3}
                      placeholder="Type your message here..."
                      required
                    />
                  </label>
                  <div className={styles.honeypot} aria-hidden="true">
                    <label htmlFor="tracked-game-website">Website</label>
                    <input
                      id="tracked-game-website"
                      type="text"
                      value={website}
                      onChange={(event) => setWebsite(event.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  <button type="submit" disabled={noteStatus === "sending" || !message.trim()}>
                    {noteStatus === "sending" ? "SENDING…" : "SEND MESSAGE →"}
                  </button>
                  {noteStatus === "error" && <p className={styles.sendError} role="alert">{noteError}</p>}
                </form>
              )
            )}

            <button
              type="button"
              className={styles.restartButton}
              onClick={restartGame}
            >
              PLAY AGAIN ↻
            </button>
          </div>
        )}
      </div>

      {!won && (
        <div
          ref={mobileControlsRef}
          className={styles.mobileControls}
          aria-label="Game controls"
        >
          <button
            type="button"
            className={`${styles.mobileControlButton} ${styles.mobileControlUp}`}
            aria-label="Move up"
            data-game-key="ArrowUp"
            onMouseDown={(event) => pressMouseDirection(event, "ArrowUp")}
            onMouseUp={(event) => releaseMouseDirection(event, "ArrowUp")}
            onMouseLeave={(event) => releaseMouseDirection(event, "ArrowUp")}
          >
            <svg
              className={styles.mobileControlIcon}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 4 3.5 15.5h17L12 4Z" />
            </svg>
          </button>
          <button
            type="button"
            className={`${styles.mobileControlButton} ${styles.mobileControlLeft}`}
            aria-label="Move left"
            data-game-key="ArrowLeft"
            onMouseDown={(event) => pressMouseDirection(event, "ArrowLeft")}
            onMouseUp={(event) => releaseMouseDirection(event, "ArrowLeft")}
            onMouseLeave={(event) => releaseMouseDirection(event, "ArrowLeft")}
          >
            <svg
              className={styles.mobileControlIcon}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 4 3.5 15.5h17L12 4Z" />
            </svg>
          </button>
          <button
            type="button"
            className={`${styles.mobileControlButton} ${styles.mobileControlRight}`}
            aria-label="Move right"
            data-game-key="ArrowRight"
            onMouseDown={(event) => pressMouseDirection(event, "ArrowRight")}
            onMouseUp={(event) => releaseMouseDirection(event, "ArrowRight")}
            onMouseLeave={(event) => releaseMouseDirection(event, "ArrowRight")}
          >
            <svg
              className={styles.mobileControlIcon}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 4 3.5 15.5h17L12 4Z" />
            </svg>
          </button>
          <button
            type="button"
            className={`${styles.mobileControlButton} ${styles.mobileControlDown}`}
            aria-label="Move down"
            data-game-key="ArrowDown"
            onMouseDown={(event) => pressMouseDirection(event, "ArrowDown")}
            onMouseUp={(event) => releaseMouseDirection(event, "ArrowDown")}
            onMouseLeave={(event) => releaseMouseDirection(event, "ArrowDown")}
          >
            <svg
              className={styles.mobileControlIcon}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 4 3.5 15.5h17L12 4Z" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
