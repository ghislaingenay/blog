"use client";

import { useEffect, useState } from "react";
import { ParagraphLoading } from "../loading/components/ParagraphLoading";

const btnClass =
  "font-bold col-span-1  border border-black bg-slate-50 shadow-lg py-2 rounded-md hover:bg-slate-100";

export const CounterState = () => {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  const addValueToCount = (value: number) => setCount(() => count + value);
  const reinitializeCount = () => setCount(0);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <ParagraphLoading />;
  return (
    <div className="p-4 bg-slate-200 rounded-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5">
        <button className={btnClass} onClick={() => addValueToCount(-5)}>
          - 5
        </button>
        <button className={btnClass} onClick={() => addValueToCount(-1)}>
          - 1
        </button>
        <p
          className="m-0 col-span-1 sm:col-span-2 md:col-span-1 mx-auto my-auto font-bold"
          id="count"
        >
          {count}
        </p>
        <button className={btnClass} onClick={() => addValueToCount(1)}>
          + 1
        </button>
        <button className={btnClass} onClick={() => addValueToCount(5)}>
          + 5
        </button>
      </div>
      <button
        onClick={() => reinitializeCount()}
        className="bg-red-600 font-bold px-5 py-2 rounded-3xl text-white max-h-full mx-auto block mt-5"
      >
        RESET
      </button>
    </div>
  );
};

// export const JQueryState = () => {
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => setMounted(true), []);
//   useEffect(() => {
//     window.addEventListener("click", (e) => {
//       if (!(e.target instanceof HTMLButtonElement)) return;
//       const id = e.target.id;
//     });
//   }, []);
//   if (!mounted) return <ParagraphLoading />;

//   return (
//     <div className="p-4 bg-slate-200 rounded-2xl">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5">
//         <button id="minus-one" className={btnClass}>
//           - 1
//         </button>
//         <p
//           className="m-0 col-span-1 sm:col-span-2 md:col-span-1 mx-auto my-auto font-bold"
//           id="count"
//         >
//           0
//         </p>
//         <button id="plus-one" className={btnClass}>
//           + 1
//         </button>
//       </div>

//       <button
//         id="reset"
//         className="bg-red-600 font-bold px-5 py-2 rounded-3xl text-white max-h-full mx-auto block mt-5"
//       >
//         RESET
//       </button>
//     </div>
//   );
// };
