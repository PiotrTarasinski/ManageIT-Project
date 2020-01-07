const daysBetween = (startDate: Date, endDate: Date) => {
  const ONE_DAY = 1000 * 60 * 60 * 24;

  const differenceMs = Math.abs(startDate.getTime() - endDate.getTime());

  return Math.round(differenceMs / ONE_DAY);
};

export { daysBetween };
