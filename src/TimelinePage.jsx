import { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";

function TimelinePage({
  milestones,
  bgImage,
  badgeImage,
  footerText,
  onComplete,
  hideBadge = false,
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [quizOpen, setQuizOpen] = useState(false);
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [unlockedIndex, setUnlockedIndex] = useState(0);
  const [completedSet, setCompletedSet] = useState(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const scrollToBottom = () => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "auto",
      });
    };

    requestAnimationFrame(() => setTimeout(scrollToBottom, 0));
  }, []);

  useEffect(() => {
    if (unlockedIndex > 0) {
      setTimeout(() => {
        const milestoneElements = document.querySelectorAll(".milestone");
        const targetIndex = milestones.length - 1 - unlockedIndex;
        const targetElement = milestoneElements[targetIndex];

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 300);
    }
  }, [unlockedIndex, milestones.length]);

  // Check if all milestones completed and notify parent
  useEffect(() => {
    if (completedSet.size === milestones.length && onComplete) {
      onComplete();
    }
  }, [completedSet.size, milestones.length, onComplete]);

  const openQuizFor = (index) => {
    if (index > unlockedIndex) return;
    setActiveMilestoneIndex(index);
    setCurrentQuestionIndex(0);
    setQuizOpen(true);
    setConsecutiveCorrect(0);
  };

  const closeQuiz = () => {
    setQuizOpen(false);
    setActiveMilestoneIndex(null);
    setCurrentQuestionIndex(0);
  };

  const handleAnswer = (choiceIndex) => {
    const ms = milestones[activeMilestoneIndex];
    const q = ms.questions[currentQuestionIndex];
    if (choiceIndex === q.a) {
      const nextQuestion = currentQuestionIndex + 1;
      setConsecutiveCorrect((c) => c + 1);
      if (nextQuestion < ms.questions.length) {
        setCurrentQuestionIndex(nextQuestion);
      } else {
        if (unlockedIndex < milestones.length - 1) {
          setUnlockedIndex((i) => i + 1);
        }
        setCompletedSet((s) => {
          const n = new Set(s);
          n.add(activeMilestoneIndex);
          return n;
        });
        closeQuiz();
      }
    } else {
      closeQuiz();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setScrollProgress(0);
      setUnlockedIndex(0);
      setCompletedSet(new Set());
    }
  };

  const isAllCompleted = completedSet.size === milestones.length;

  return (
    <>
      <div className="app-container">
        {/* Achievement Badge - only show if not hidden */}
        {isAllCompleted && !hideBadge && badgeImage && (
          <Motion.div
            className="achievement-badge"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.3,
            }}
          >
            <img src={badgeImage} alt="Achievement" />
          </Motion.div>
        )}

        {/* Progress Bar */}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Background Image */}
        <div className="background-image">
          <img src={bgImage} alt="Background" className="hero-image" />
          <div className="background-overlay" />
        </div>

        {/* Content Container */}
        <div className="content-wrapper">
          {/* Timeline Section */}
          <div className="timeline-container">
            <div className="timeline-path" />

            {[...milestones].reverse().map((milestone, index) => (
              <Motion.div
                key={milestone.id}
                className={`milestone ${index % 2 === 0 ? "left" : "right"}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="milestone-content-wrapper">
                  <div className="milestone-content milestone-content-hidden">
                    <span className="milestone-year">{milestone.year}</span>
                    <h3 className="milestone-title">{milestone.title}</h3>
                    <p className="milestone-description">
                      {milestone.description}
                    </p>
                  </div>

                  {completedSet.has(milestones.length - 1 - index) && (
                    <Motion.div
                      className="milestone-content milestone-content-visible"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="milestone-year">{milestone.year}</span>
                      <h3 className="milestone-title">{milestone.title}</h3>
                      <p className="milestone-description">
                        {milestone.description}
                      </p>
                    </Motion.div>
                  )}
                </div>
                <div
                  className={`milestone-click-area ${
                    milestones.length - 1 - index <= unlockedIndex
                      ? "unlocked"
                      : "locked"
                  }`}
                  onClick={
                    milestones.length - 1 - index <= unlockedIndex
                      ? () => openQuizFor(milestones.length - 1 - index)
                      : undefined
                  }
                  aria-hidden="true"
                  role="button"
                  aria-disabled={
                    milestones.length - 1 - index <= unlockedIndex
                      ? "false"
                      : "true"
                  }
                >
                  {milestones.length - 1 - index > unlockedIndex && (
                    <svg
                      className="lock-icon"
                      viewBox="0 0 24 24"
                      aria-hidden
                      focusable="false"
                    >
                      <path
                        fill="currentColor"
                        d="M10.59 13.41a4 4 0 0 1 0-5.66l1.77-1.77a4 4 0 0 1 5.66 5.66l-1.06 1.06a1 1 0 0 1-1.42-1.42l1.06-1.06a2 2 0 0 0-2.83-2.83L11 9.59a2 2 0 0 0 2.83 2.83l.71-.71a1 1 0 0 1 1.42 1.42l-.71.71a4 4 0 0 1-5.66 0zM7.05 6.34a4 4 0 0 1 5.66 0l1.06 1.06a1 1 0 0 1-1.42 1.42L11.29 7.76a2 2 0 0 0-2.83 2.83l.71.71a1 1 0 1 1-1.42 1.42l-.71-.71a4 4 0 0 1 0-5.67z"
                      />
                    </svg>
                  )}
                </div>
                <div className="milestone-marker" />
              </Motion.div>
            ))}
          </div>

          {/* Footer */}
          <footer className="footer">
            <p>{footerText}</p>
          </footer>
        </div>
      </div>

      {quizOpen && activeMilestoneIndex !== null && (
        <div className="quiz-modal-overlay" onClick={closeQuiz}>
          <div className="quiz-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="quiz-modal-title">
              {milestones[activeMilestoneIndex].title}
            </h3>
            <p className="quiz-question">
              {
                milestones[activeMilestoneIndex].questions[currentQuestionIndex]
                  .q
              }
            </p>
            <div className="quiz-options">
              {milestones[activeMilestoneIndex].questions[
                currentQuestionIndex
              ].options.map((opt, i) => (
                <button
                  key={i}
                  className="quiz-option"
                  onClick={() => handleAnswer(i)}
                >
                  {opt}
                </button>
              ))}
            </div>
            <div className="quiz-footer">
              <small>Trả lời đúng liên tiếp: {consecutiveCorrect}</small>
              <button className="quiz-close" onClick={closeQuiz}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TimelinePage;
