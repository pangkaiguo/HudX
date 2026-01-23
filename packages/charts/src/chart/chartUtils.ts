export const getSeriesDisplayName = (
  t: (key: string, defaultValue?: string) => string,
  seriesItem: any,
  seriesIndex: number,
): string => {
  return (
    seriesItem?.name ||
    `${t('series.name', 'Series')}-${String(seriesIndex + 1)}`
  );
};

export const findSeriesIndexByDisplayName = (
  t: (key: string, defaultValue?: string) => string,
  series: any[],
  name: string,
): number => {
  return (series || []).findIndex(
    (s, i) => getSeriesDisplayName(t, s, i) === name,
  );
};

export const resolveAnimationDelay = (
  animationDelay: any,
  dataIndex: number,
): number => {
  if (typeof animationDelay === 'function') {
    const v = animationDelay(dataIndex);
    return typeof v === 'number' ? v : 0;
  }
  return typeof animationDelay === 'number' ? animationDelay : 0;
};
