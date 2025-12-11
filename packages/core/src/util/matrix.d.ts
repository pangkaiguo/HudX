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
export declare function createIdentityMatrix(): Matrix;
/**
 * Multiply two matrices
 */
export declare function multiplyMatrix(m1: Matrix, m2: Matrix): Matrix;
/**
 * Apply matrix to point
 */
export declare function applyMatrix(matrix: Matrix, x: number, y: number): [number, number];
/**
 * Create translation matrix
 */
export declare function createTranslateMatrix(tx: number, ty: number): Matrix;
/**
 * Create scale matrix
 */
export declare function createScaleMatrix(sx: number, sy: number): Matrix;
/**
 * Create rotation matrix
 */
export declare function createRotateMatrix(angle: number): Matrix;
/**
 * Invert matrix
 */
export declare function invertMatrix(matrix: Matrix): Matrix | null;
//# sourceMappingURL=matrix.d.ts.map