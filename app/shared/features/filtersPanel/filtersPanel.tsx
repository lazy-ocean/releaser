import {
  Form,
  FilterLabel,
  Dropdown,
  FiltersButton,
} from "./filtersPanel.styled";
import { FaFilter } from "react-icons/fa";
import { useState } from "react";
import { FilterActions } from "./filtersPanel.interface";
import type { FiltersPanelProps } from "./filtersPanel.interface";

const FiltersPanel = ({ dispatch, state }: FiltersPanelProps) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (filtersOpen) {
      const target = e.target as typeof e.target & {
        period: { value: number };
      };
      const data = {
        period: target.period.value,
      };
      dispatch({ type: FilterActions.ChangePeriod, value: data.period });
      setFiltersOpen(false);
    } else setFiltersOpen(true);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {filtersOpen ? (
        <div>
          <FilterLabel htmlFor="period">Show releases for </FilterLabel>
          <Dropdown id="period" name="period">
            <option value={7}>7 days</option>
            <option value={14}>14 days</option>
            <option value={30}>1 month</option>
            <option value={90}>3 months</option>
          </Dropdown>
        </div>
      ) : (
        <FilterLabel as="p">
          Show releases for <span>{state.period}</span> days
        </FilterLabel>
      )}
      <FiltersButton
        active={filtersOpen}
        type="submit"
        aria-label={filtersOpen ? "Submit filters" : "Open filters"}
      >
        <FaFilter />
      </FiltersButton>
    </Form>
  );
};

export default FiltersPanel;
