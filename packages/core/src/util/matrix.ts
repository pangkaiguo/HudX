/**
 * Matrix utilities for transformations
 */

export interface Matrix {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
}

/**
 * Create identity matrix
 */
export const createIdentityMatrix = (): Matrix => {
  return {
    a: 1, b: 0, c: 0,
    d: 1, e: 0, f: 0
  };
};

/**
 * Multiply two matrices
 */
export const multiplyMatrix = (m1: Matrix, m2: Matrix): Matrix => {
  return {
    a: m1.a * m2.a + m1.c * m2.b,
    b: m1.b * m2.a + m1.d * m2.b,
    c: m1.a * m2.c + m1.c * m2.d,
    d: m1.b * m2.c + m1.d * m2.d,
    e: m1.a * m2.e + m1.c * m2.f + m1.e,
    f: m1.b * m2.e + m1.d * m2.f + m1.f
  };
};

/**
 * Apply matrix to point
 */
export const applyMatrix = (matrix: Matrix, x: number, y: number): [number, number] => {
  return [
    matrix.a * x + matrix.c * y + matrix.e,
    matrix.b * x + matrix.d * y + matrix.f
  ];
};

/**
 * Create translation matrix
 */
export const createTranslateMatrix = (tx: number, ty: number): Matrix => {
  return {
    a: 1, b: 0, c: 0,
    d: 1, e: tx, f: ty
  };
};

/**
 * Create scale matrix
 */
export const createScaleMatrix = (sx: number, sy: number): Matrix => {
  return {
    a: sx, b: 0, c: 0,
    d: sy, e: 0, f: 0
  };
};

/**
 * Create rotation matrix
 */
export const createRotateMatrix = (angle: number): Matrix => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    a: cos, b: sin, c: -sin,
    d: cos, e: 0, f: 0
  };
};

/**
 * Invert matrix
 */
export const invertMatrix = (matrix: Matrix): Matrix | null => {
  const det = matrix.a * matrix.d - matrix.b * matrix.c;
  if (Math.abs(det) < 1e-10) {
    return null; // Matrix is not invertible
  }
  const invDet = 1 / det;
  return {
    a: matrix.d * invDet,
    b: -matrix.b * invDet,
    c: -matrix.c * invDet,
    d: matrix.a * invDet,
    e: (matrix.c * matrix.f - matrix.d * matrix.e) * invDet,
    f: (matrix.b * matrix.e - matrix.a * matrix.f) * invDet
  };
};

/**
 * Clone matrix
 */
export const cloneMatrix = (m: Matrix): Matrix => {
  return { ...m };
};

/**
 * Copy matrix
 */
export const copyMatrix = (target: Matrix, source: Matrix): Matrix => {
  target.a = source.a;
  target.b = source.b;
  target.c = source.c;
  target.d = source.d;
  target.e = source.e;
  target.f = source.f;
  return target;
};

/**
 * Translate matrix
 */
export const translate = (m: Matrix, tx: number, ty: number): Matrix => {
  return {
    a: m.a,
    b: m.b,
    c: m.c,
    d: m.d,
    e: m.a * tx + m.c * ty + m.e,
    f: m.b * tx + m.d * ty + m.f
  };
};

/**
 * Scale matrix
 */
export const scale = (m: Matrix, sx: number, sy: number): Matrix => {
  return {
    a: m.a * sx,
    b: m.b * sx,
    c: m.c * sy,
    d: m.d * sy,
    e: m.e,
    f: m.f
  };
};

/**
 * Rotate matrix
 */
export const rotate = (m: Matrix, angle: number): Matrix => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    a: m.a * cos + m.c * sin,
    b: m.b * cos + m.d * sin,
    c: m.a * -sin + m.c * cos,
    d: m.b * -sin + m.d * cos,
    e: m.e,
    f: m.f
  };
};
