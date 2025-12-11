/**
 * Coordinate system utilities
 */
/**
 * Create linear scale
 */
export function createLinearScale(domain, range) {
    const [d0, d1] = domain;
    const [r0, r1] = range;
    const k = (r1 - r0) / (d1 - d0);
    const scale = function (value) {
        return r0 + (value - d0) * k;
    };
    scale.invert = function (value) {
        return d0 + (value - r0) / k;
    };
    scale.domain = function (newDomain) {
        if (newDomain) {
            return createLinearScale(newDomain, range);
        }
        return domain;
    };
    scale.range = function (newRange) {
        if (newRange) {
            return createLinearScale(domain, newRange);
        }
        return range;
    };
    return scale;
}
/**
 * Create ordinal scale (for categories)
 */
export function createOrdinalScale(domain, range) {
    const domainMap = new Map();
    domain.forEach((d, i) => {
        domainMap.set(d, i);
    });
    const scale = function (value) {
        const index = domainMap.get(value);
        if (index === undefined) {
            return range[0];
        }
        const step = (range[range.length - 1] - range[0]) / (domain.length - 1);
        return range[0] + index * step;
    };
    scale.invert = function (value) {
        const step = (range[range.length - 1] - range[0]) / (domain.length - 1);
        const index = Math.round((value - range[0]) / step);
        return domain[Math.max(0, Math.min(index, domain.length - 1))];
    };
    scale.domain = function (newDomain) {
        if (newDomain) {
            return createOrdinalScale(newDomain, range);
        }
        return domain;
    };
    scale.range = function (newRange) {
        if (newRange) {
            return createOrdinalScale(domain, newRange);
        }
        return range;
    };
    return scale;
}
/**
 * Calculate axis domain from data
 */
export function calculateDomain(axis, data, isXAxis = true) {
    if (axis.type === 'category') {
        if (axis.data && axis.data.length > 0) {
            return axis.data;
        }
        // Extract categories from data
        const categories = new Set();
        data.forEach((item) => {
            const value = isXAxis ? item.name : item.value;
            if (value !== undefined) {
                categories.add(value);
            }
        });
        return Array.from(categories);
    }
    else if (axis.type === 'value') {
        const values = [];
        data.forEach((item) => {
            const value = isXAxis ? item.name : item.value;
            if (typeof value === 'number') {
                values.push(value);
            }
            else if (Array.isArray(value)) {
                values.push(...value.filter(v => typeof v === 'number'));
            }
        });
        if (values.length === 0) {
            return [0, 100];
        }
        const min = axis.min === 'dataMin' ? Math.min(...values) : (axis.min ?? Math.min(...values));
        const max = axis.max === 'dataMax' ? Math.max(...values) : (axis.max ?? Math.max(...values));
        // Add padding
        const padding = (max - min) * 0.1;
        return [min - padding, max + padding];
    }
    return [0, 100];
}
/**
 * Convert data point to coordinate
 */
export function dataToCoordinate(data, xScale, yScale) {
    const x = typeof data.name === 'number' ? xScale(data.name) : xScale(data.name || 0);
    const y = typeof data.value === 'number' ? yScale(data.value) : yScale(Array.isArray(data.value) ? data.value[0] : 0);
    return { x, y };
}
//# sourceMappingURL=coordinate.js.map