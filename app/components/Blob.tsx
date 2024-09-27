import { useEffect } from "react";
import styled from "styled-components";

const BlobRound = styled.div`
  background: linear-gradient(to right, var(--color-one), var(--color-two));
  height: 250px;
  aspect-ratio: 1;
  position: absolute;
  inset: 50%;
  animation: rotate 20s infinite;
  translate: -50% -50%;
  border-radius: 50%;
  filter: blur(75px);
`;

const BlobBlur = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  backdrop-filter: blur(100px);
`;

export default function Blob() {
  let blobElement: HTMLDivElement;
  function moveBlob(event: MouseEvent) {
    const { clientX, clientY } = event;
    blobElement &&
      blobElement.animate(
        {
          left: `${clientX}px`,
          top: `${clientY}px`,
        },
        { duration: 3000, fill: "forwards" }
      );
  }
  useEffect(() => {
    window.addEventListener("pointermove", (e) => {});
  }, []);
  return (
    <div>
      <BlobRound />
      <BlobBlur />
    </div>
  );
}
