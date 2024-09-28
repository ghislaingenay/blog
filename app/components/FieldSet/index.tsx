import { PropsWithChildren } from "react";

type Props = {
  legend: React.ReactNode;
};

export default function FieldSet({
  children,
  legend,
}: PropsWithChildren<Props>) {
  return (
    <fieldset className="border border-black py-2 px-4 m-0 h-full rounded-[0.25rem]">
      <legend className="text-md px-1 py-2 border-none">{legend}</legend>
      <div className="mt-4">{children}</div>
    </fieldset>
  );
}
