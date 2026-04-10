import { useGetAllCategoriesQuery } from "@/features/category";
import { ICategory } from "@/types/category.type";
import { Select, Slider } from "antd/lib";
import React, { useState } from "react";

type Props = {
  filters: Record<string, any>;
  setFilters: (values: Record<string, any>) => void;
};

const CourseFilter: React.FC<Props> = ({ setFilters, filters }) => {
  const { data } = useGetAllCategoriesQuery({});
  const categories = (data?.data as ICategory[]) || [
    { id: "1", name: "Web Development" },
    { id: "2", name: "Design" },
  ];
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters?.minPrice || 0,
    filters?.maxPrice || 1000,
  ]);

  const handlePriceChange = (value: [number, number] | any) => {
    setPriceRange(value);
    setFilters({ ...filters, minPrice: value[0], maxPrice: value[1] });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3 max-w-md mx-auto lg:p-0 p-2">
      <div className="flex items-center gap-3 w-full">
        <Select
          onChange={(value) => setFilters({ ...filters, category: value })}
          placeholder="Select Category"
          className="w-full"
          value={filters.category || undefined}
          allowClear
        >
          {categories.map((category) => (
            <Select.Option key={category.id} value={category.name}>
              {category.name}
            </Select.Option>
          ))}
        </Select>

        <Select
          placeholder="Select Level"
          onChange={(value) => setFilters({ ...filters, level: value })}
          className="w-full"
          value={filters.level || undefined}
          allowClear
        >
          <Select.Option value="beginner">Beginner</Select.Option>
          <Select.Option value="intermediate">Intermediate</Select.Option>
          <Select.Option value="advanced">Advanced</Select.Option>
        </Select>
      </div>

      <div className="w-full border rounded-md px-2 pb-1">
        <Slider
          range
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onChange={handlePriceChange}
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>${priceRange[0]} Min-Price</span>
          <span>Max-Price ${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseFilter;
