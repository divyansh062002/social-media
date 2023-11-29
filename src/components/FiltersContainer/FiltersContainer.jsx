import React, { useContext, useEffect, useRef } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { MdTrendingUp } from "react-icons/md";
import "./FiltersContainer.css";
import { DataContext } from "../../contexts/DataContext";

function FiltersContainer({ filtersContainer, setFiltersContainer }) {
  const { filter, handleChangeFilter } = useContext(DataContext);
  const filtersContainerRef = useRef(null);

  const filters = [
    { text: "trending", icon: <MdTrendingUp size={21} /> },
    { text: "latest", icon: <AiFillCaretUp size={22} /> },
    { text: "oldest", icon: <AiFillCaretDown size={22} /> },
  ];

  const handleClick = (selectedFilter) => {
    handleChangeFilter(selectedFilter);
    setFiltersContainer(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filtersContainerRef.current &&
        !filtersContainerRef.current.contains(event.target) &&
        !event.target.classList.contains("feedIcon")
      ) {
        setFiltersContainer(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="filtersContainer" ref={filtersContainerRef}>
      {filters.map((singleFilter, idx) => {
        return (
          <div
            className={
              filter === singleFilter?.text ? "selectedFilter" : "singleFilter"
            }
            onClick={() => handleClick(singleFilter?.text)}
            key={idx}
          >
            {singleFilter?.icon}
            <span>{singleFilter?.text}</span>
          </div>
        );
      })}
    </div>
  );
}

export default FiltersContainer;
