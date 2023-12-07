import { container, item } from "./Animation";
import { motion as m } from "framer-motion";
import { Icon } from "@iconify/react";

const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(items / pageSize); // 26/4

  if (pagesCount === 1) return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <div className="flex mx-auto justify-between items-center w-3/4 xl:w-1/2">
      <m.div variants={item} className="lg:hidden flex">
        {currentPage <= 1 ? (
          <button
            key={currentPage}
            className="w-12 h-12 flex items-center justify-center duration-200 rounded-full bg-secondary-200 text-warna1 font-medium text-lg md:text-2xl tracking-tight cursor-not-allowed focus:outline-none focus:ring focus:ring-secondary-300"
          >
            <Icon
              icon="line-md:arrow-left"
            />
          </button>
        ) : (
          <button
            key={currentPage}
            className="w-12 h-12 flex items-center justify-center duration-200 rounded-full bg-warna1 hover:bg-secondary-600 active:bg-secondary-700 focus:outline-none focus:ring focus:ring-secondary-300 text-warna2 font-medium text-lg md:text-2xl tracking-tight"
            onClick={() => onPageChange(currentPage - 1)}
          >
            <Icon
              icon="line-md:arrow-left"
            />
          </button>
        )}
      </m.div>
      <div className=" w-fit mx-auto flex flex-row gap-1">
        {pages.map((page) => (
          <div key={page} className={page === currentPage ? "w-3 h-3 bg-secondary-600 rounded-full" : "w-3 h-3 bg-black-500/20 rounded-full"}></div>
        ))}
      </div>
      <m.div variants={item} className="lg:hidden flex">
        {currentPage >= 4 ? (
          <button
            key={currentPage}
            className="w-12 h-12 flex items-center justify-center duration-200 rounded-full bg-secondary-200 text-black-50 font-medium text-lg md:text-2xl tracking-tight cursor-not-allowed focus:outline-none focus:ring focus:ring-secondary-300"
          >
            <Icon
              icon="line-md:arrow-right"
            />
          </button>
        ) : (
          <button
            key={currentPage}
            className="w-12 h-12 flex items-center justify-center duration-200 rounded-full bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700 focus:outline-none focus:ring focus:ring-secondary-300 text-warna2 font-medium text-lg md:text-2xl tracking-tight"
            onClick={() => onPageChange(currentPage + 1)}
          >
            <Icon
              icon="line-md:arrow-right"
            />
          </button>
        )}
      </m.div>
    </div>
  );
};

export default Pagination;