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

const PERIOD_VALUES: { value: number; label: string }[] = [
  { value: 7, label: "7 days" },
  { value: 14, label: "14 days" },
  { value: 30, label: "1 month" },
  { value: 90, label: "3 months" },
];

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
            {PERIOD_VALUES.map(({ value, label }, i) => (
              <option value={value} key={i} selected={state.period === value}>
                {label}
              </option>
            ))}
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
