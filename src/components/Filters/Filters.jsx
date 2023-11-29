import React, { useContext, useState } from "react";
import { MdFilterList } from "react-icons/md";
import "./Filters.css";
import FiltersContainer from "../FiltersContainer/FiltersContainer";
import { DataContext } from "../../contexts/DataContext";

function Filters() {
  const { filter } = useContext(DataContext);
  const [filtersContainer, setFiltersContainer] = useState(false);

  const handleFiltersContainer = () => {
    if (filtersContainer) {
      setFiltersContainer(false);
    } else {
      setFiltersContainer(true);
    }
  };

  return (
    <div className="filterContainer">
      <h3 className="filterName">{filter} Posts</h3>
      <MdFilterList
        className="icon feedIcon"
        onClick={handleFiltersContainer}
        size={25}
      />
      {filtersContainer && (
        <FiltersContainer
          filtersContainer={filtersContainer}
          setFiltersContainer={setFiltersContainer}
        />
      )}
    </div>
  );
}

export default Filters;
