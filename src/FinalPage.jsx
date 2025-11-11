import { useState } from "react";
import { motion as Motion } from "framer-motion";
import "./FinalPage.css";

function FinalPage() {
  const [draggedBadge, setDraggedBadge] = useState(null);
  const [matches, setMatches] = useState({
    quote1: null,
    quote2: null,
    quote3: null,
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const quotes = [
    {
      id: "quote1",
      text: "Sự nghèo nàn của tôn giáo vừa là biểu hiện của sự nghèo nàn hiện thực, vừa là sự phản kháng chống sự nghèo nàn hiện thực ấy. Tôn giáo là tiếng thở dài của chúng sinh bị áp bức, là trái tim của thế giới không có trái tim, cũng như nó là tinh thần của những trật tự không có tinh thần. Tôn giáo là thuốc phiện của nhân dân",
      correctBadge: "badge2",
      religion: "Trích dẫn 1",
    },
    {
      id: "quote2",
      text: "Những lời tuyên chiến ầm ĩ với chủ nghĩa duy tâm, những mệnh lệnh ngăn cấm tín ngưỡng, tôn giáo là những hành vi dại dột, vô chính phủ, làm cho kẻ thù lợi dụng để kích động tình cảm tôn giáo của tín đồ, làm cho họ ngày càng gắn bó với tôn giáo, xa lánh thậm chí đi đến chống lại công cuộc xây dựng chủ nghĩa xã hội. Đương nhiên, như vậy không có nghĩa là coi nhẹ việc giáo dục chủ nghĩa vô thần khoa học, thế giới quan duy vật cho toàn dân, trong đó có những tín đồ tôn giáo, việc làm đó góp phần nâng cao trình độ kiến thức cho toàn dân",
      correctBadge: "badge1",
      religion: "Trích dẫn 2",
    },
    {
      id: "quote3",
      text: "Tín ngưỡng, tôn giáo là nhu cầu của một bộ phận nhân dân, Đảng và Nhà nước ta tôn trọng quyền tự do tín ngưỡng và không tín ngưỡng của nhân dân, thực hiện bình đẳng, đoàn kết lương giáo và giữa các dân tộc. Khắc phục mọi thái độ hẹp hòi, thành kiến, phân biệt đối xử với đồng bào có đạo, chống những hành vi vi phạm tự do tín ngưỡng",
      correctBadge: "badge3",
      religion: "Trích dẫn 3",
    },
  ];

  const badges = [
    { id: "badge1", src: "/2.png", label: "Badge 2" },
    { id: "badge2", src: "/1.png", label: "Badge 1" },
    { id: "badge3", src: "/3.png", label: "Badge 3" },
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
