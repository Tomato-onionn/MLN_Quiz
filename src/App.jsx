import { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import "./App.css";

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  // Quiz state
  const [quizOpen, setQuizOpen] = useState(false);
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [unlockedIndex, setUnlockedIndex] = useState(0); // which milestone index is unlocked (0-based)
  // track which milestones have been completed (answered fully correct)
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

  // On initial mount, scroll to the bottom of the page so the app opens
  // at the bottom. This runs only once and doesn't interfere with later
  // user scrolling or navigation.
  useEffect(() => {
    const scrollToBottom = () => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "auto",
      });
    };

    // Ensure layout is finished before calculating heights.
    // requestAnimationFrame + setTimeout gives the browser a tick to render.
    requestAnimationFrame(() => setTimeout(scrollToBottom, 0));
    // empty deps: only run once on mount
  }, []);

  const milestones = [
    {
      id: 1,
      title: "Giác ngộ viên mãn",
      year: "2025",
      description: "Đạt được sự thanh thản nội tâm",
      questions: [
        {
          q: "Nguyên tắc nào giúp thanh thản?",
          options: ["Buông bỏ", "Giữ lại", "Phán xét"],
          a: 0,
        },
        {
          q: "Thiền định giúp gì?",
          options: ["Tập trung", "Tăng lo lắng", "Làm việc nhiều hơn"],
          a: 0,
        },
        {
          q: "Từ bi có nghĩa là?",
          options: ["Yêu thương và giúp đỡ", "Phớt lờ", "Khởi tố"],
          a: 0,
        },
      ],
    },

    {
      id: 3,
      title: "Thực hành từ bi",
      year: "2023",
      description: "Nuôi dưỡng lòng thương yêu",
      questions: [
        {
          q: "Từ bi là gì?",
          options: ["Thương yêu", "Ghét bỏ", "Trung lập"],
          a: 0,
        },
        {
          q: "Làm sao thực hành?",
          options: ["Hành động cụ thể", "Ngó lơ", "Chỉ nghĩ"],
          a: 0,
        },
        {
          q: "Kết quả của từ bi?",
          options: ["Hòa bình", "Xung đột", "Lo lắng"],
          a: 0,
        },
      ],
    },
    {
      id: 4,
      title: "Tu tập thiền định",
      year: "2022",
      description: "Rèn luyện tâm trí thanh tịnh",
      questions: [
        {
          q: "Thiền giúp gì?",
          options: ["Tĩnh tâm", "Rối loạn", "Lười biếng"],
          a: 0,
        },
        {
          q: "Thời lượng tốt để bắt đầu?",
          options: ["Ít nhất 5 phút", "0 phút", "8 giờ"],
          a: 0,
        },
        {
          q: "Tập trung vào?",
          options: ["Hơi thở", "Mùi vị", "Thời tiết"],
          a: 0,
        },
      ],
    },
    {
      id: 5,
      title: "Học hỏi giáo pháp",
      year: "2021",
      description: "Tiếp thu tri thức và trí tuệ",
      questions: [
        {
          q: "Giáo pháp giúp?",
          options: ["Hướng dẫn sống", "Gây nhầm lẫn", "Làm xấu đi"],
          a: 0,
        },
        {
          q: "Học qua gì?",
          options: ["Sách và thầy", "Chỉ mạng xã hội", "Ngủ"],
          a: 0,
        },
        {
          q: "Ứng dụng chính?",
          options: ["Hành xử từ bi", "Cãi lộn", "Bỏ cuộc"],
          a: 0,
        },
      ],
    },
    {
      id: 6,
      title: "Khởi đầu hành trình",
      year: "2020",
      description: "Bước đầu tiên trên con đường giác ngộ",
      questions: [
        {
          q: "Bước đầu là gì?",
          options: ["Nhận thức", "Phủ nhận", "Bỏ chạy"],
          a: 0,
        },
        { q: "Cần gì để bắt đầu?", options: ["Ý chí", "Đổ lỗi", "Ngại"], a: 0 },
        {
          q: "Ai đồng hành?",
          options: ["Thầy và bạn hữu", "Một mình hoàn toàn", "Kẻ thù"],
          a: 0,
        },
      ],
    },
  ];

  // click handler to open quiz for a milestone index
  const openQuizFor = (index) => {
    // only allow opening if index <= unlockedIndex
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
      // correct
      const nextQuestion = currentQuestionIndex + 1;
      setConsecutiveCorrect((c) => c + 1);
      if (nextQuestion < ms.questions.length) {
        setCurrentQuestionIndex(nextQuestion);
      } else {
        // answered all 3 correctly in this milestone
        // unlock next milestone if exists
        if (unlockedIndex < milestones.length - 1) {
          setUnlockedIndex((i) => i + 1);
        }
        // mark this milestone as completed so its content appears
        setCompletedSet((s) => {
          const n = new Set(s);
          n.add(activeMilestoneIndex);
          return n;
        });
        closeQuiz();
      }
    } else {
      // wrong answer -> reset progress to top (nấc đầu tiên)
      closeQuiz();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setScrollProgress(0);
      // also lock back to first milestone
      setUnlockedIndex(0);
      // clear completed set as penalty (optional: reset progress)
      setCompletedSet(new Set());
    }
  };

  return (
    <>
      <div className="app-container">
        {/* Progress Bar */}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Background Image - Scrolls with content */}
        <div className="background-image">
          <img src="/PhatGiao.png" alt="Phật Giáo" className="hero-image" />
          <div className="background-overlay" />
        </div>

        {/* Content Container */}
        <div className="content-wrapper">
          {/* Timeline Section */}
          <div className="timeline-container">
            <div className="timeline-path" />

            {/** render so index 0 is the bottom-most (first milestone) */}
            {[...milestones].reverse().map((milestone, index) => (
              <Motion.div
                key={milestone.id}
                className={`milestone ${index % 2 === 0 ? "left" : "right"}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* show content only after the milestone is completed */}
                {completedSet.has(milestones.length - 1 - index) ? (
                  <div className="milestone-content">
                    <span className="milestone-year">{milestone.year}</span>
                    <h3 className="milestone-title">{milestone.title}</h3>
                    <p className="milestone-description">
                      {milestone.description}
                    </p>
                  </div>
                ) : (
                  // hidden until completed
                  <div className="milestone-content hidden" aria-hidden />
                )}
                {/* clickable overlay to open quiz (only if unlocked) */}
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
            <p>Namo Amitabha Buddha</p>
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

export default App;
