type IOptions = {
  page?: number | string;
  limit?: number | string;
  sortBy?: string;
  sortOrder?: "asc" | "desc" | string;
};

type IReturnOptions = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
};

export const calculatePagination = (
  options: IOptions,
  maxLimit = 50,
): IReturnOptions => {
  const parsedPage = Number(options?.page);
  const parsedLimit = Number(options?.limit);

  const page = !isNaN(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const limit =
    !isNaN(parsedLimit) && parsedLimit > 0
      ? Math.min(parsedLimit, maxLimit)
      : 10;

  const sortBy = options?.sortBy || "createdAt";
  const sortOrder = options?.sortOrder === "asc" ? "asc" : "desc";

  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
