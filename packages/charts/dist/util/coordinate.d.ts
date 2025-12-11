/**
 * Coordinate system utilities
 */
import { AxisOption, ChartData, Coordinate } from '../types';
export interface Scale {
    (value: any): number;
    invert?(value: number): any;
    domain(): any[];
    range(): number[];
    domain(domain: any[]): Scale;
    range(range: number[]): Scale;
}
/**
 * Create linear scale
 */
export declare function createLinearScale(domain: number[], range: number[]): Scale;
/**
 * Create ordinal scale (for categories)
 */
export declare function createOrdinalScale(domain: any[], range: number[]): Scale;
/**
 * Calculate axis domain from data
 */
export declare function calculateDomain(axis: AxisOption, data: ChartData[], isXAxis?: boolean): any[];
/**
 * Convert data point to coordinate
 */
export declare function dataToCoordinate(data: ChartData, xScale: Scale, yScale: Scale): Coordinate;
