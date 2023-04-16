export const pagination = (currentPage, totalPages) => {
  const middle = [currentPage - 1, currentPage, currentPage + 1];
  const updatedMiddle = middle.filter((p) => p > 1 && p < totalPages);
  const includeLeftDots = currentPage > 3;
  const includeRightDots = currentPage < totalPages - 2;

  if (includeLeftDots) updatedMiddle.unshift('...');
  if (includeRightDots) updatedMiddle.push('...');

  return [1, ...updatedMiddle, totalPages];
};

export { pagination as paginate };
