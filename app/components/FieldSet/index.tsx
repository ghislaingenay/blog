import { PropsWithChildren } from "react";
import styled from "styled-components";

type Props = {
  legend: React.ReactNode;
};

const BaseFieldSet = styled.fieldset`
  border: 1px solid black;
  padding: 0.5rem 1rem;
  margin: 0;
  height: fit-content;
  border-radius: 0.25rem;
`;

const BaseLegend = styled.legend`
  font-size: 1rem;
  max-width: max-content;
  padding: 0.25rem 0.5rem;
  border: none;
`;

export default function FieldSet({
  children,
  legend,
}: PropsWithChildren<Props>) {
  return (
    <BaseFieldSet>
      <BaseLegend>{legend}</BaseLegend>
      <div className="mt-4">{children}</div>
    </BaseFieldSet>
  );
}
