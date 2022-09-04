import {
  Form,
  FilterLabel,
  Dropdown,
  FiltersButton,
  FiltersWrapper,
} from "./filtersPanel.styled";
import { FaFilter } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { FilterActions, ReleaseType } from "./filtersPanel.interface";
import type { FiltersPanelProps } from "./filtersPanel.interface";

const PERIOD_VALUES: {
  value: number;
  label: string;
}[] = [
  { value: 7, label: "7 days" },
  { value: 14, label: "14 days" },
  { value: 30, label: "1 month" },
  { value: 90, label: "3 months" },
  { value: 180, label: "6 months" },
  { value: 365, label: "1 year" },
];

const RELEASE_TYPES = {
  [ReleaseType.Album]: "only albums",
  [ReleaseType.Single]: "only singles",
  [ReleaseType.Both]: "albums and singles",
};

const FiltersPanel = ({ dispatch, state }: FiltersPanelProps) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const formFef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        filtersOpen &&
        formFef.current &&
        !formFef.current.contains(event.target as Node)
      ) {
        if (typeof formFef.current.requestSubmit === "function") {
          formFef.current.requestSubmit();
        } else
          formFef.current.dispatchEvent(
            new Event("submit", { cancelable: true })
          );
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filtersOpen]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (filtersOpen) {
      const target = e.target as typeof e.target & {
        period: { value: number };
        type: { value: ReleaseType };
      };
      const data = {
        period: target.period.value,
        type: target.type.value,
      };
      dispatch({ type: FilterActions.ChangePeriod, value: data.period });
      dispatch({ type: FilterActions.ChangeType, value: data.type });
      setFiltersOpen(false);
    } else setFiltersOpen(true);
  };

  return (
    <Form onSubmit={handleSubmit} ref={formFef}>
      <FiltersWrapper>
        {filtersOpen ? (
          <>
            <div>
              <FilterLabel htmlFor="period">Show releases for </FilterLabel>
              <Dropdown id="period" name="period">
                {PERIOD_VALUES.map(({ value, label }, i) => (
                  <option
                    value={value}
                    key={i}
                    selected={state.period === value}
                  >
                    {label}
                  </option>
                ))}
              </Dropdown>
            </div>
            <div>
              <FilterLabel htmlFor="period">Show </FilterLabel>
              <Dropdown
                id="type"
                name="type"
                defaultValue={RELEASE_TYPES[state.type]}
              >
                {Object.entries(RELEASE_TYPES).map(([key, value], i) => {
                  return (
                    <option value={key} key={i}>
                      {value}
                    </option>
                  );
                })}
              </Dropdown>
            </div>
          </>
        ) : (
          <>
            <FilterLabel as="p" onClick={() => setFiltersOpen(true)}>
              Show releases for <span>{state.period}</span> days
            </FilterLabel>
            <FilterLabel as="p" onClick={() => setFiltersOpen(true)}>
              Show <span>{RELEASE_TYPES[state.type]}</span>
            </FilterLabel>
          </>
        )}
      </FiltersWrapper>
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
