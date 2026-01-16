import { describe, it, expect } from 'vitest';
import {
  createIdentityMatrix,
  multiplyMatrix,
  applyMatrix,
  createTranslateMatrix,
  createScaleMatrix,
  createRotateMatrix,
  invertMatrix,
  translate,
  scale,
  rotate,
} from '../matrix';

describe('matrix', () => {
  it('should create identity matrix', () => {
    const m = createIdentityMatrix();
    expect(m).toEqual({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 });
  });

  it('should create translation matrix', () => {
    const m = createTranslateMatrix(10, 20);
    expect(m).toEqual({ a: 1, b: 0, c: 0, d: 1, e: 10, f: 20 });
  });

  it('should apply matrix to point', () => {
    const m = createTranslateMatrix(10, 20);
    const p = applyMatrix(m, 5, 5);
    expect(p).toEqual([15, 25]);
  });

  it('should multiply matrices', () => {
    const t = createTranslateMatrix(10, 20);
    const s = createScaleMatrix(2, 2);
    // Scale then Translate: T * S * P -> T * (S * P)
    // S: x*2, y*2
    // T: x+10, y+20
    // Result: 2x+10, 2y+20
    const m = multiplyMatrix(t, s);
    const p = applyMatrix(m, 5, 5);
    expect(p).toEqual([20, 30]); // (5*2)+10, (5*2)+20
  });

  it('should invert matrix', () => {
    const t = createTranslateMatrix(10, 20);
    const inv = invertMatrix(t);
    expect(inv).not.toBeNull();
    if (inv) {
      const p = applyMatrix(inv, 15, 25);
      expect(p).toEqual([5, 5]);
    }
  });

  it('should handle non-invertible matrix', () => {
    const m = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0 };
    const inv = invertMatrix(m);
    expect(inv).toBeNull();
  });

  it('should transform existing matrix', () => {
    let m = createIdentityMatrix();
    m = translate(m, 10, 20);
    expect(m.e).toBe(10);
    expect(m.f).toBe(20);

    m = scale(m, 2, 2);
    // Order matters in implementation.
    // translate: e = m.a * tx + m.c * ty + m.e => 1*10 + 0*20 + 0 = 10
    // scale: a = m.a * sx => 1*2 = 2. e = m.e => 10.
    // So this is effectively Translate THEN Scale? No.
    // Let's check logic:
    // translate implementation:
    // a: m.a, b: m.b...
    // e: m.a * tx + m.c * ty + m.e
    // This looks like post-multiplication (m * T)?
    // m * T =
    // [a c e]   [1 0 tx]   [a  c  a*tx + c*ty + e]
    // [b d f] * [0 1 ty] = [b  d  b*tx + d*ty + f]
    // [0 0 1]   [0 0 1 ]   [0  0  1              ]
    // Yes, it is m * T. So applying T to m means m happens first? No.
    // If P' = M * P.
    // P'' = T * P' = T * M * P.
    // If we do m = translate(m, ...), usually we want new M' such that M' corresponds to T * M or M * T.
    // The implementation `translate(m, tx, ty)` computes `m * T`.
    // So if m was Identity, result is I * T = T.
    // Then `scale(m, sx, sy)`:
    // a = m.a * sx...
    // e = m.e
    // This looks like m * S where S is scale matrix?
    // [a c e]   [sx 0  0]   [a*sx c*sy e]
    // [b d f] * [0  sy 0] = [b*sx d*sy f]
    // [0 0 1]   [0  0  1]   [0    0    1]
    // Wait, `scale` implementation:
    // a: m.a * sx
    // c: m.c * sy
    // e: m.e
    // Yes, this is m * S.

    // So:
    // 1. m = I
    // 2. m = translate(m, 10, 20) -> m = I * T = T. (Translate 10, 20)
    // 3. m = scale(m, 2, 2) -> m = T * S.
    // P' = (T * S) * P = T * (S * P).
    // So Scale happens first relative to object, then Translate?
    // Let's verify with point (0,0).
    // S * P -> (0,0). T * (0,0) -> (10, 20).
    // Point (5, 5).
    // S * P -> (10, 10). T * (10, 10) -> (20, 30).

    // Let's check my previous manual calc logic.
    // T * S matrix multiplication in `multiplyMatrix` function (m1 * m2).
    // multiplyMatrix(T, S) -> T * S.
    // My manual trace of `translate` and `scale` helpers also produces T * S.

    const p = applyMatrix(m, 5, 5);
    expect(p).toEqual([20, 30]);
  });
});
