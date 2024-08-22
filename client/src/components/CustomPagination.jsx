import React from "react";
import { Pagination, PaginationItemType } from "@nextui-org/react";
import { ChevronIcon } from "./icons/ChevronIcon";
import cn from "classnames";

const CustomPagination = ({ page, setPage, total }) => {
  const renderItem = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    className,
  }) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button
          key={key}
          className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")}
          onClick={onNext}
        >
          <ChevronIcon className="rotate-180" />
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button
          key={key}
          className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")}
          onClick={onPrevious}
        >
          <ChevronIcon />
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return <button key={key} className={className}>...</button>;
    }

    return (
      <button
        key={key}
        ref={ref}
        className={cn(
          className,
          "min-w-8 w-8 h-8 rounded-lg",
          isActive
            ? "bg-gray-700  text-white"
            : "bg-default-200/50 text-black"
        )}
        onClick={() => setPage(value)}
      >
        {value}
      </button>
    );
  };

  return (
    <Pagination
      disableCursorAnimation
      showControls
      total={total}
      page={page}
      onChange={setPage}
      className="gap-2"
      renderItem={renderItem}
      variant="light"
    />
  );
};

export default CustomPagination;
