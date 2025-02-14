import React, { useEffect, useRef } from "react";
import '../fonts/Valentine.woff';
import './enverlope.css';

function Enverlope() {
  const lettersContainerRef = useRef(null);
  const envelopeRef = useRef(null);
  const openEnvelopeRef = useRef(null);
  let zIndexCounter = 10;

  useEffect(() => {
    const lettersContainer = lettersContainerRef.current;
    const letters = lettersContainer?.querySelectorAll(".letter");
    if (!letters) return;

    letters.forEach((letter) => {
      letter.style.left = "50%";
      letter.style.transform = "translateX(-50%)";

      letter.addEventListener("mousedown", (e) => {
        if (e.target.tagName !== "BUTTON") {
          const rect = letter.getBoundingClientRect();
          let offsetX = e.clientX - rect.left;
          let offsetY = e.clientY - rect.top;

          letter.style.position = "absolute";
          letter.style.zIndex = zIndexCounter++;
          
          const moveAt = (posX, posY) => {
            letter.style.left = `${posX - offsetX}px`;
            letter.style.top = `${posY - offsetY}px`;
          };

          const onMouseMove = (moveEvent) => {
            moveAt(moveEvent.clientX, moveEvent.clientY);
          };

          const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
          };

          document.addEventListener("mousemove", onMouseMove);
          document.addEventListener("mouseup", onMouseUp);
        }
      });
    });

    if (openEnvelopeRef.current) {
      openEnvelopeRef.current.addEventListener("click", () => {
        envelopeRef.current?.classList.add("active");
      });
    }

    const closeButtons = lettersContainer.querySelectorAll(".closeLetter");
    closeButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const letter = e.target.closest(".letter");
        if (letter) {
          letter.style.display = "none";
        }
      });
    });
  }, []);

  const letterTexts = [
    "Ти будеш моєю валентинкою? ",
    "Найбільше у світі я радий що все таки ми почали зустрічатись, незважаючи на всі труднощі ми досі разом уже другий рік.. цьом",
    "Тебе безмежно кохаю!\nДумки лиш про тебе,\nЩе на один неймовірний рік я чекаю!\nІ скучив вже я, обійняв би тебе,\nАле відстань далека між нами(",
    "Найкрасивіша і найрозумніша дівчинка на цій планеті, у нас все обовʼязково вийде!",
    "Ти моє найбільше щастя в цьому житті! Дякую що ти зі мною весь цей час!"
  ];

  const formatText = (text) => {
    return text.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <div>
      <section className="cssletter">
        <div className="envelope" ref={envelopeRef}>
          <button
            className="heart"
            id="openEnvelope"
            ref={openEnvelopeRef}
            aria-label="Open Envelope"
          >
            <span className="heart-text">Open</span>
          </button>
          <div className="envelope-flap"></div>
          <div className="envelope-folds">
            <div className="envelope-left"></div>
            <div className="envelope-right"></div>
            <div className="envelope-bottom"></div>
          </div>
        </div>
        <div className="letters" ref={lettersContainerRef}>
          {letterTexts.map((text, index) => (
            <blockquote
              key={index}
              className="letter center"
              id={`${index + 1}`}
              tabIndex={index}
              style={{ left: "50%", transform: "translateX(-50%)" }}
            >
              <button className="closeLetter" title="Close letter">
                Close letter
              </button>
              <p>{formatText(text)}</p>
              <cite>Твій Котик</cite>
            </blockquote>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Enverlope;
