import React, { useRef, useEffect, useCallback } from "react";

type QRCodeErrorLevel = "L" | "M" | "Q" | "H";

interface QRCodeProps {
  value: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
  errorLevel?: QRCodeErrorLevel;
  icon?: string;
  iconSize?: number;
  bordered?: boolean;
  className?: string;
}

const EXP = new Uint8Array(256);
const LOG = new Uint8Array(256);
(() => {
  let v = 1;
  for (let i = 0; i < 255; i++) {
    EXP[i] = v;
    LOG[v] = i;
    v = (v << 1) ^ (v >= 128 ? 0x11d : 0);
  }
  EXP[255] = EXP[0];
})();

function gfMul(a: number, b: number) {
  return a === 0 || b === 0 ? 0 : EXP[(LOG[a] + LOG[b]) % 255];
}

function polyMul(a: number[], b: number[]) {
  const result = new Array(a.length + b.length - 1).fill(0);
  for (let i = 0; i < a.length; i++)
    for (let j = 0; j < b.length; j++)
      result[i + j] ^= gfMul(a[i], b[j]);
  return result;
}

function ecBytes(data: number[], ecCount: number) {
  let gen = [1];
  for (let i = 0; i < ecCount; i++) gen = polyMul(gen, [1, EXP[i]]);
  const msg = [...data, ...new Array(ecCount).fill(0)];
  for (let i = 0; i < data.length; i++) {
    const coef = msg[i];
    if (coef !== 0)
      for (let j = 0; j < gen.length; j++) msg[i + j] ^= gfMul(gen[j], coef);
  }
  return msg.slice(data.length);
}

function getBestVersion(dataLen: number, ecl: QRCodeErrorLevel) {
  const caps: Record<QRCodeErrorLevel, number[]> = {
    L: [17, 32, 53, 78, 106, 134, 154, 192, 230, 271],
    M: [14, 26, 42, 62, 84, 106, 122, 152, 180, 213],
    Q: [11, 20, 32, 46, 60, 74, 86, 108, 130, 151],
    H: [7, 14, 24, 34, 44, 58, 64, 84, 98, 119],
  };
  const c = caps[ecl];
  for (let v = 0; v < c.length; v++) if (dataLen <= c[v]) return v + 1;
  return 10;
}

function createQRMatrix(value: string, ecl: QRCodeErrorLevel): boolean[][] {
  const data = new TextEncoder().encode(value);
  const version = getBestVersion(data.length, ecl);
  const size = version * 4 + 17;

  const ecCounts: Record<QRCodeErrorLevel, number[]> = {
    L: [7, 10, 15, 20, 26, 18, 20, 24, 30, 18],
    M: [10, 16, 26, 18, 24, 16, 18, 22, 22, 26],
    Q: [13, 22, 18, 26, 18, 24, 18, 22, 20, 24],
    H: [17, 28, 22, 16, 22, 28, 26, 26, 28, 28],
  };
  const ecCount = ecCounts[ecl][(version - 1)] || 7;

  const totalCodewords = [26, 44, 70, 100, 134, 172, 196, 242, 292, 346];
  const totalCW = totalCodewords[version - 1] || 26;
  const dataCW = totalCW - ecCount;

  const bits: number[] = [];
  const push = (val: number, len: number) => {
    for (let i = len - 1; i >= 0; i--) bits.push((val >> i) & 1);
  };

  push(0b0100, 4);
  if (version >= 10) push(data.length, 16);
  else push(data.length, 8);
  for (const b of data) push(b, 8);

  const maxBits = dataCW * 8;
  const termLen = Math.min(4, maxBits - bits.length);
  for (let i = 0; i < termLen; i++) bits.push(0);
  while (bits.length % 8 !== 0) bits.push(0);
  const padBytes = [0xec, 0x11];
  let padIdx = 0;
  while (bits.length < maxBits) {
    push(padBytes[padIdx % 2], 8);
    padIdx++;
  }

  const codewords: number[] = [];
  for (let i = 0; i < bits.length; i += 8)
    codewords.push(
      bits.slice(i, i + 8).reduce((a, b, k) => a | (b << (7 - k)), 0)
    );

  const ec = ecBytes(codewords, ecCount);
  const allCW = [...codewords, ...ec];

  const matrix: (boolean | null)[][] = Array.from({ length: size }, () =>
    new Array(size).fill(null)
  );

  const setModule = (r: number, c: number, val: boolean) => {
    if (r >= 0 && r < size && c >= 0 && c < size) matrix[r][c] = val;
  };

  const drawFinder = (row: number, col: number) => {
    for (let r = -1; r <= 7; r++)
      for (let c = -1; c <= 7; c++) {
        const inFinder =
          r >= 0 && r <= 6 && c >= 0 && c <= 6 &&
          (r === 0 || r === 6 || c === 0 || c === 6 ||
            (r >= 2 && r <= 4 && c >= 2 && c <= 4));
        setModule(row + r, col + c, inFinder);
      }
  };
  drawFinder(0, 0);
  drawFinder(0, size - 7);
  drawFinder(size - 7, 0);

  for (let i = 8; i < size - 8; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  matrix[size - 8][8] = true;

  for (let i = 0; i < 15; i++) {
    const c = i < 8 ? i : i < 9 ? i + 1 : size - 15 + i;
    if (matrix[8][c] === null) matrix[8][c] = false;
    const r = i < 6 ? size - 1 - i : i < 8 ? 15 - i : 14 - i;
    if (matrix[r][8] === null) matrix[r][8] = false;
  }

  if (version >= 2) {
    const alignPos = [[], [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34],
      [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50]];
    const pos = alignPos[version] || [];
    for (const r of pos)
      for (const c of pos) {
        if (matrix[r][c] !== null) continue;
        for (let dr = -2; dr <= 2; dr++)
          for (let dc = -2; dc <= 2; dc++)
            setModule(r + dr, c + dc,
              Math.abs(dr) === 2 || Math.abs(dc) === 2 || (dr === 0 && dc === 0));
      }
  }

  const allBits: number[] = [];
  for (const cw of allCW) for (let b = 7; b >= 0; b--) allBits.push((cw >> b) & 1);

  let bitIdx = 0;
  let upward = true;
  for (let col = size - 1; col >= 1; col -= 2) {
    if (col === 6) col = 5;
    const rows = upward
      ? Array.from({ length: size }, (_, i) => size - 1 - i)
      : Array.from({ length: size }, (_, i) => i);
    for (const row of rows) {
      for (const dc of [0, -1]) {
        const c = col + dc;
        if (c < 0 || c >= size) continue;
        if (matrix[row][c] !== null) continue;
        matrix[row][c] = bitIdx < allBits.length ? allBits[bitIdx++] === 1 : false;
      }
    }
    upward = !upward;
  }

  const result: boolean[][] = Array.from({ length: size }, () =>
    new Array(size).fill(false)
  );
  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++)
      result[r][c] = matrix[r][c] !== null ? matrix[r][c]! : false;

  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++) {
      const inFinder =
        (r < 9 && c < 9) || (r < 9 && c >= size - 8) || (r >= size - 8 && c < 9);
      const inTiming = r === 6 || c === 6;
      if (!inFinder && !inTiming && (r + c) % 2 === 0)
        result[r][c] = !result[r][c];
    }

  return result;
}

const QRCode: React.FC<QRCodeProps> = ({
  value,
  size = 160,
  bgColor,
  fgColor,
  errorLevel = "M",
  icon,
  iconSize = 32,
  bordered = true,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const matrix = createQRMatrix(value, errorLevel);
    const moduleCount = matrix.length;
    const dpr = window.devicePixelRatio || 1;
    const quiet = 4;
    const totalModules = moduleCount + quiet * 2;
    const moduleSize = size / totalModules;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const styles = getComputedStyle(canvas);
    const bg = bgColor || styles.getPropertyValue("--qr-bg").trim() || "#ffffff";
    const fg = fgColor || styles.getPropertyValue("--qr-fg").trim() || "#000000";

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, size, size);

    ctx.fillStyle = fg;
    for (let r = 0; r < moduleCount; r++)
      for (let c = 0; c < moduleCount; c++)
        if (matrix[r][c])
          ctx.fillRect(
            (c + quiet) * moduleSize,
            (r + quiet) * moduleSize,
            moduleSize + 0.5,
            moduleSize + 0.5
          );

    if (icon) {
      const img = new Image();
      img.onload = () => {
        const x = (size - iconSize) / 2;
        const y = (size - iconSize) / 2;
        const pad = 4;
        ctx.fillStyle = bg;
        ctx.fillRect(x - pad, y - pad, iconSize + pad * 2, iconSize + pad * 2);
        ctx.drawImage(img, x, y, iconSize, iconSize);
      };
      img.src = icon;
    }
  }, [value, size, bgColor, fgColor, errorLevel, icon, iconSize]);

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className={`qrcode-wrapper ${bordered ? "qrcode-bordered" : ""} ${className}`}>
      <canvas ref={canvasRef} className="qrcode-canvas" />
    </div>
  );
};

export default QRCode;
