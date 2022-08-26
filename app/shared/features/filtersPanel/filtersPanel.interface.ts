export interface FiltersState {
  period: number | null;
}

export enum FilterActions {
  ChangePeriod = "change_period",
}

export type Action = {
  type: FilterActions.ChangePeriod;
  value: number | string;
};

export interface FiltersPanelProps {
  dispatch: React.Dispatch<Action>;
  state: FiltersState;
}
