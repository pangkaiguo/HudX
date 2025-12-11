/**
 * Matrix utilities for transformations
 * Similar to hrender's matrix utilities
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
export function createIdentityMatrix(): Matrix {
  return {
    a: 1, b: 0, c: 0,
    d: 1, e: 0, f: 0
  };
}

/**
 * Multiply two matrices
 */
export function multiplyMatrix(m1: Matrix, m2: Matrix): Matrix {
  return {
    a: m1.a * m2.a + m1.c * m2.b,
    b: m1.b * m2.a + m1.d * m2.b,
    c: m1.a * m2.c + m1.c * m2.d,
    d: m1.b * m2.c + m1.d * m2.d,
    e: m1.a * m2.e + m1.c * m2.f + m1.e,
    f: m1.b * m2.e + m1.d * m2.f + m1.f
  };
}

/**
 * Apply matrix to point
 */
export function applyMatrix(matrix: Matrix, x: number, y: number): [number, number] {
  return [
    matrix.a * x + matrix.c * y + matrix.e,
    matrix.b * x + matrix.d * y + matrix.f
  ];
}

/**
 * Create translation matrix
 */
export function createTranslateMatrix(tx: number, ty: number): Matrix {
  return {
    a: 1, b: 0, c: 0,
    d: 1, e: tx, f: ty
  };
}

/**
 * Create scale matrix
 */
export function createScaleMatrix(sx: number, sy: number): Matrix {
  return {
    a: sx, b: 0, c: 0,
    d: sy, e: 0, f: 0
  };
}

/**
 * Create rotation matrix
 */
export function createRotateMatrix(angle: number): Matrix {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    a: cos, b: sin, c: -sin,
    d: cos, e: 0, f: 0
  };
}

/**
 * Invert matrix
 */
export function invertMatrix(matrix: Matrix): Matrix | null {
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
}

