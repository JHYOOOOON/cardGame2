import React, { useState } from "react";
import "./Finish";
import "./Card.scss";
import Finish from "./Finish";

// 레벨 당 카드 개수
const LEVEL = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
};

const CARD_IMAGE = {
  0: "cpp",
  1: "go",
  2: "ruby",
  3: "csharp",
  4: "java",
  5: "react",
};

const CARD_KINDS = 6;

let clickedCard = [];
let flippedCard = [];

const time = new Date().getTime();
const Card = () => {
  const [lv, setLv] = useState(1);

  const removeClassName = (arrayName) => {
    if (arrayName === "click") {
      while (clickedCard.length) {
        clickedCard.pop().targetNode.classList.remove("flipped");
      }
    } else if (arrayName === "flip") {
      let tmp;
      while (flippedCard.length) {
        tmp = flippedCard.pop().targetNode;
        tmp.classList.add("notransition");
        tmp.classList.remove("flipped");
        (function (a) {
          setTimeout(function () {
            a.classList.remove("notransition");
          }, 500);
        })(tmp);
      }
    }
  };
  const handleClickCard = (event) => {
    const targetNode = event.target.parentNode;
    const targetKind = event.target.parentNode.childNodes[0].childNodes[0].alt;
    targetNode.classList.add("flipped");
    clickedCard.push({ targetNode, targetKind });
    if (clickedCard.length === 2) {
      if (clickedCard[0].targetKind === clickedCard[1].targetKind) {
        let tmp;
        while (clickedCard.length) {
          tmp = clickedCard.pop();
          flippedCard.push(tmp);
        }
        if (flippedCard.length === LEVEL[lv]) {
          window.setTimeout(() => {
            removeClassName("flip");
            setLv(lv + 1);
          }, 500);
        }
      } else {
        window.setTimeout(() => {
          removeClassName("click");
        }, 500);
      }
    }
  };

  // 카드 섞기
  const cardShuffle = (cardArray) => {
    for (let i = cardArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const tmp = cardArray[i];
      cardArray[i] = cardArray[j];
      cardArray[j] = tmp;
    }
    return cardArray;
  };

  // 카드 이미지 배정
  const assignCard = (cardCnt) => {
    let cardArray = [];
    for (let i = 0; i < cardCnt; i += 2) {
      let cardImg = Math.floor(Math.random() * CARD_KINDS);
      // 짝 맞춰야돼서 2번 푸시
      cardArray.push(cardImg);
      cardArray.push(cardImg);
    }

    // 카드 섞기
    cardArray = cardShuffle(cardArray);

    return cardArray;
  };

  // 카드 그리기
  const printCard = (card, idx) => {
    const cardKind = CARD_IMAGE[card];
    const cardSrc = require(`../img/${cardKind}.svg`);
    return (
      <div className={`card ${idx}`} key={idx}>
        <div className="card-inner">
          <div className="card-front">
            <img src={cardSrc} alt={cardKind} />
          </div>
          <div className="card-back" onClick={handleClickCard}></div>
        </div>
      </div>
    );
  };

  let cardArray = assignCard(LEVEL[lv]);
  return (
    <>
      {lv !== 6 ? (
        <div className="card-section">
          <section className="card-container">
            {cardArray.map((card, i) => printCard(card, i))}
          </section>
        </div>
      ) : (
        <Finish time={(new Date().getTime() - time) * 0.001} />
      )}
    </>
  );
};

export default Card;
