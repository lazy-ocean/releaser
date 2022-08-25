import type { FiltersState, Action } from "./filtersPanel.interface";
import { FilterActions } from "./filtersPanel.interface";

const filtersPanelReducer = (
  state: FiltersState,
  action: Action
): FiltersState => {
  switch (action.type) {
    case FilterActions.ChangePeriod:
      return {
        ...state,
        period: Number(action.value),
      };

    default:
      return state;
  }
};

export default filtersPanelReducer;
