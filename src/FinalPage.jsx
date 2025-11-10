import { useState } from "react";
import { motion as Motion } from "framer-motion";
import "./FinalPage.css";

function FinalPage() {
  const [draggedBadge, setDraggedBadge] = useState(null);
  const [matches, setMatches] = useState({
    quote1: null,
    quote2: null,
    quote3: null,
    quote4: null,
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const quotes = [
    {
      id: "quote1",
      text: "Phật pháp là kim chỉ nam dẫn đường cho cuộc sống an lạc",
      correctBadge: "badge1",
      religion: "Phật giáo",
    },
    {
      id: "quote2",
      text: "Hãy yêu người lân cận như chính mình",
      correctBadge: "badge2",
      religion: "Công giáo",
    },
    {
      id: "quote3",
      text: "Đạo là lẽ phải, cần tu tâm dưỡng tính",
      correctBadge: "badge3",
      religion: "Đạo Chiên",
    },
    {
      id: "quote4",
      text: "Bần Tăng Phật Tử, tu hành gắn liền với lao động sản xuất",
      correctBadge: "badge4",
      religion: "Đạo Hòa Hảo",
    },
  ];

  const badges = [
    { id: "badge1", src: "/1.png", label: "Phật giáo" },
    { id: "badge2", src: "/2.png", label: "Công giáo" },
    { id: "badge3", src: "/3.png", label: "Đạo Chiên" },
    { id: "badge4", src: "/4.png", label: "Đạo Hòa Hảo" },
  ];

  const handleDragStart = (badgeId) => {
    setDraggedBadge(badgeId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (quoteId) => {
    if (draggedBadge) {
      setMatches((prev) => ({
        ...prev,
        [quoteId]: draggedBadge,
      }));
      setDraggedBadge(null);
    }
  };

  const handleRemoveMatch = (quoteId) => {
    setMatches((prev) => ({
      ...prev,
      [quoteId]: null,
    }));
  };

  const checkAnswers = () => {
    const allCorrect = quotes.every(
      (quote) => matches[quote.id] === quote.correctBadge
    );
    if (allCorrect) {
      setShowSuccess(true);
    } else {
      alert("Chưa đúng hết! Hãy thử lại.");
    }
  };

  const isAllMatched = Object.values(matches).every((match) => match !== null);
  const isBadgeUsed = (badgeId) => Object.values(matches).includes(badgeId);

  return (
    <div className="final-page">
      {/* Background */}
      <div className="final-background">
        <div className="final-overlay" />
      </div>

      {/* Content */}
      <div className="final-content">
        <Motion.h1
          className="final-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Ghép Câu Trích Dẫn
        </Motion.h1>

        {/* Quotes Section */}
        <div className="quotes-container">
          {quotes.map((quote, index) => (
            <Motion.div
              key={quote.id}
              className={`quote-box ${matches[quote.id] ? "has-match" : ""}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(quote.id)}
            >
              <div className="quote-content">
                <p className="quote-text">{quote.text}</p>
              </div>
              <div className="badge-area">
                {matches[quote.id] && (
                  <div className="matched-badge">
                    <img
                      src={badges.find((b) => b.id === matches[quote.id]).src}
                      alt="Badge"
                    />
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveMatch(quote.id)}
                    >
                      ✕
                    </button>
                  </div>
                )}
                {!matches[quote.id] && (
                  <div className="drop-zone">Kéo thả badge vào đây</div>
                )}
              </div>
            </Motion.div>
          ))}
        </div>

        {/* Badges Section */}
        <div className="badges-container">
          {badges.map((badge, index) => (
            <Motion.div
              key={badge.id}
              className={`draggable-badge ${
                isBadgeUsed(badge.id) ? "used" : ""
              }`}
              draggable={!isBadgeUsed(badge.id)}
              onDragStart={() => handleDragStart(badge.id)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <img src={badge.src} alt={badge.label} />
              <span className="badge-label">{badge.label}</span>
            </Motion.div>
          ))}
        </div>

        {/* Check Button */}
        {isAllMatched && (
          <Motion.button
            className="check-button"
            onClick={checkAnswers}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Kiểm tra đáp án
          </Motion.button>
        )}

        {/* Success Message */}
        {showSuccess && (
          <Motion.div
            className="success-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Motion.div
              className="success-modal"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2>🎉 Chúc mừng! 🎉</h2>
              <p>Bạn đã hoàn thành tất cả các thử thách!</p>
              <div className="all-badges">
                {badges.map((badge) => (
                  <img key={badge.id} src={badge.src} alt={badge.label} />
                ))}
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </div>
    </div>
  );
}

export default FinalPage;
