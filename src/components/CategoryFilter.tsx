import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface Category {
  icon: LucideIcon;
  name: string;
  color: string;
}

interface CategoryFilterProps {
  categories: Category[];
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories }) => {
  return (
    <div className="flex flex-wrap gap-4">
      <button className="px-6 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 font-medium">
        All Projects
      </button>
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <button
            key={category.name}
            className={`flex items-center px-6 py-2 rounded-full ${category.color} hover:opacity-90`}
          >
            <Icon className="h-5 w-5 mr-2" />
            {category.name}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;