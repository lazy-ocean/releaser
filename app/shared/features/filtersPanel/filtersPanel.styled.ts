import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  margin: 0 var(--spacing-s);
  padding: var(--spacing-xs) var(--spacing-s);
  background-color: var(--bg-card);
  border-radius: 20px;
  align-items: center;
  min-height: 35px;
  gap: var(--spacing-s);
`;

export const FilterLabel = styled.label`
  font-size: 1rem;
  color: var(--text-faded);
  margin: 0;
  cursor: pointer;

  & span {
    background-color: #b3b3b32b;
    padding: 0.3rem 0.5rem;
    border-radius: 5px;
    color: var(--text-secondary);
  }
`;

export const Dropdown = styled.select`
  margin-left: 0.4rem;
  background-color: var(--bg-elevation);
  border: none;
  color: var(--text-secondary);
  font-family: "Circular Std", sans-serif;
  font-size: 1rem;
  border-radius: 5px;
  padding: 0.3rem;
`;

export const FiltersButton = styled.button<{ active: boolean }>`
  background-color: transparent;
  border: none;
  margin-left: auto;
  cursor: pointer;

  & svg {
    width: 1.5rem;
    height: 1.5rem;
    fill: ${({ active }) =>
      active ? `var(  --brand-green)` : `var(--text-secondary)`};
  }
`;

export const FiltersWrapper = styled.div`
  display: flex;
  gap: var(--spacing-s);
  flex-wrap: wrap;
`;
