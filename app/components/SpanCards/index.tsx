"use client";
import { MouseEvent, useEffect } from "react";
import { styled } from "styled-components";

// main#span-cards
const CardWrapper = styled.div<{ bgColor?: string }>`
  background-color: ${({ bgColor }) => bgColor ?? "black"};
  height: 100vh;
  align-items: center;
  overflow: hidden;
  display: flex;
  justify-content: center;
  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    max-width: 916px;
    width: calc(100% - 20px);
    &:hover {
      & > .card > .card-border {
        opacity: 1;
      }
    }
  }
`;

// main#span-cards .card
const Card = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  height: 260px;
  width: 300px;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  &:hover {
    &::before {
      opacity: 1;
    }
  }

  &:before,
  & > .card-border {
    content: "";
    position: absolute;
    border-radius: inherit;
    height: 100%;
    inset: 0;
    width: 100%;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  &:before {
    background: radial-gradient(
      800px circle at var(--mouse-x) var(--mouse-y),
      rgba(0, 0, 0, 0.06),
      transparent 40%
    );
    z-index: 3;
  }

  & > .card-border {
    background: radial-gradient(
      400px circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.3),
      transparent 40%
    );
    z-index: 1;
  }
`;

// // Fake the border
// main#span-cards .card .card-content
const CardContent = styled.div`
  height: calc(100% - 2px);
  width: calc(100% - 2px);
  border-radius: inherit;
  margin: 1px;
  z-index: 2;
  position: relative;
  background-color: transparent;
`;

export default function SpanCards() {
  const handleMouseOver = (
    e: MouseEvent<HTMLDivElement>,
    cardElements: HTMLDivElement[]
  ) => {
    for (const card of cardElements) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - (rect?.left || 0);
      const y = e.clientY - (rect?.top || 0);

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  useEffect(() => {
    const cardElements = document.querySelectorAll(
      "#span-cards .card"
    ) as unknown as HTMLDivElement[];
    const cardsElement = document.querySelector(
      "#span-cards .cards"
    ) as unknown as HTMLDivElement;

    cardsElement.addEventListener("mousemove", (event) =>
      handleMouseOver(
        event as unknown as MouseEvent<HTMLDivElement>,
        cardElements
      )
    );
  }, []);
  return (
    <CardWrapper id="span-cards">
      <div className="cards">
        <Card className="card">
          <div className="card-border"></div>
          <CardContent className="card-content"></CardContent>
        </Card>
        <Card className="card">
          <div className="card-border"></div>
          <CardContent className="card-content"></CardContent>
        </Card>
        <Card className="card">
          <div className="card-border"></div>
          <CardContent className="card-content"></CardContent>
        </Card>
        <Card className="card">
          <div className="card-border"></div>
          <CardContent className="card-content"></CardContent>
        </Card>
        <Card className="card">
          <div className="card-border"></div>
          <CardContent className="card-content"></CardContent>
        </Card>
        <Card className="card">
          <div className="card-border"></div>
          <CardContent className="card-content"></CardContent>
        </Card>
      </div>
    </CardWrapper>
  );
}
