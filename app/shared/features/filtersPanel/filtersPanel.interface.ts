export enum ReleaseType {
  Album = "album",
  Single = "single",
  Both = "albums and singles",
}

export interface FiltersState {
  period: number | null;
  type: ReleaseType;
}

export enum FilterActions {
  ChangePeriod = "change_period",
  ChangeType = "change_type",
}

export type Action =
  | {
      type: FilterActions.ChangePeriod;
      value: number | string;
    }
  | {
      type: FilterActions.ChangeType;
      value: ReleaseType;
    };

export interface FiltersPanelProps {
  dispatch: React.Dispatch<Action>;
  state: FiltersState;
}
