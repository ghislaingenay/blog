import FieldSet from "@components/FieldSet";
import { styled } from "styled-components";

type Props = {
  formDict: any;
};

const FormButton = styled.button`
  .button {
    border-radius: 4px;
    border-color: #a0c0f0;
    background-color: #acf;
    color: #124;
    transition: 0.2s ease all;
    padding: 6px 10px;
  }

  .button:hover {
    border-color: #b0d0f0;
    background-color: #bdf;
    color: #248;
  }
`;

export default function ContactForm({ formDict }: Props) {
  return <FieldSet legend="Contact me"></FieldSet>;
}
