import {
  Form,
  FilterLabel,
  Dropdown,
  FiltersButton,
  FiltersWrapper,
} from "./filtersPanel.styled";
import { FaFilter } from "react-icons/fa";
import { useState, useRef, useEffect, useContext } from "react";
import { LibraryAccessType, ReleaseType } from "./filtersPanel.interface";
import type { FiltersPanelProps } from "./filtersPanel.interface";
import { setLocalStorageItem } from "~/shared/utils/hooks/useLocalStorage";
import LikedSongsWarningModal from "./LikedSongsWarningModal";
import ModalContext from "~/shared/contexts/modalContext";

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

const LIBRARY_ACCESS = {
  [LibraryAccessType.Artists]: "liked artists",
  [LibraryAccessType.Songs]: "liked songs",
};

const FiltersPanel = ({
  type,
  setType,
  period,
  setPeriod,
  libraryAccess,
  setLibraryAccess,
}: FiltersPanelProps) => {
  const isInitialMount = useRef(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filtersData, setFiltersData] = useState({
    period,
    type,
    library: libraryAccess,
  });
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);
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

  const onConfirmSearch = () => {
    if (isModalOpen) setIsModalOpen(false);
    setLocalStorageItem("period", filtersData.period);
    setLocalStorageItem("type", filtersData.type);

    setPeriod(filtersData.period);
    setType(filtersData.type);
    setLibraryAccess(filtersData.library);
    setFiltersOpen(false);
  };

  const onAbortSongsSearch = () => {
    if (isModalOpen) setIsModalOpen(false);
    setLocalStorageItem("period", filtersData.period);
    setLocalStorageItem("type", filtersData.type);

    setPeriod(filtersData.period);
    setType(filtersData.type);
    setLibraryAccess(LibraryAccessType.Artists);
    setFiltersOpen(false);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (filtersOpen) {
      const target = e.target as typeof e.target & {
        period: { value: number };
        type: { value: ReleaseType };
        library: { value: LibraryAccessType };
      };
      const data = {
        period: target.period.value,
        type: target.type.value,
        library: target.library.value,
      };
      setFiltersData(data);
    } else setFiltersOpen(true);
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (filtersData) {
        if (filtersData?.library === LibraryAccessType.Songs) {
          setIsModalOpen("liked-warning");
        } else {
          onConfirmSearch();
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersData]);

  return (
    <Form onSubmit={handleSubmit} ref={formFef}>
      <FiltersWrapper isOpen={filtersOpen}>
        {filtersOpen ? (
          <>
            <div>
              <FilterLabel htmlFor="period">Show releases for </FilterLabel>
              <Dropdown id="period" name="period" defaultValue={period}>
                {PERIOD_VALUES.map(({ value, label }, i) => (
                  <option value={value} key={i}>
                    {label}
                  </option>
                ))}
              </Dropdown>
            </div>
            <div>
              <FilterLabel htmlFor="type">Show </FilterLabel>
              <Dropdown id="type" name="type" defaultValue={type}>
                {Object.entries(RELEASE_TYPES).map(([key, value], i) => (
                  <option value={key} key={i}>
                    {value}
                  </option>
                ))}
              </Dropdown>
            </div>
            <div>
              <FilterLabel htmlFor="library">Show releases from </FilterLabel>
              <Dropdown
                id="library"
                name="library"
                defaultValue={libraryAccess}
              >
                {Object.entries(LIBRARY_ACCESS).map(([key, value], i) => (
                  <option value={key} key={i}>
                    {value}
                  </option>
                ))}
              </Dropdown>
            </div>
          </>
        ) : (
          <>
            <FilterLabel as="p" onClick={() => setFiltersOpen(true)}>
              Show releases for <span>{period}</span> days
            </FilterLabel>
            <FilterLabel as="p" onClick={() => setFiltersOpen(true)}>
              Show <span>{RELEASE_TYPES[type]}</span>
            </FilterLabel>
            <FilterLabel as="p" onClick={() => setFiltersOpen(true)}>
              Show releases from <span>{LIBRARY_ACCESS[libraryAccess]}</span>
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
      <LikedSongsWarningModal
        onAccept={onConfirmSearch}
        onSkip={onAbortSongsSearch}
      />
    </Form>
  );
};

export default FiltersPanel;
