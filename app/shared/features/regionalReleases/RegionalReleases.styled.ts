import { CountryDropdown } from "react-country-region-selector";
import { styled } from "styled-components";
import { DropdownStyles } from "../filtersPanel/filtersPanel.styled";

export const Container = styled.section`
  padding: var(--spacing-s);
`;

export const CountriesSelect = styled(CountryDropdown)`
  ${DropdownStyles};
  width: 10rem;

  @media (max-width: 600px) {
    width: 8rem;
  }
`;
