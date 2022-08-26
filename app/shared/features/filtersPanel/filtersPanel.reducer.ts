import type { FiltersState, Action } from "./filtersPanel.interface";
import { FilterActions } from "./filtersPanel.interface";
import { setLocalStorageItem } from "~/shared/utils/hooks/useLocalStorage";

const filtersPanelReducer = (
  state: FiltersState,
  action: Action
): FiltersState => {
  switch (action.type) {
    case FilterActions.ChangePeriod:
      setLocalStorageItem("period", action.value.toString());
      return {
        ...state,
        period: Number(action.value),
      };

    default:
      return state;
  }
};

export default filtersPanelReducer;
