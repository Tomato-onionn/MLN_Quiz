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

  // Auto scroll to newly unlocked milestone
  useEffect(() => {
    if (unlockedIndex > 0) {
      // Use setTimeout to wait for content to render
      setTimeout(() => {
        const milestoneElements = document.querySelectorAll(".milestone");
        // Milestones are reversed in render, so calculate correct index
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
  }, [unlockedIndex]);

  const milestones = [
    {
      id: 1,
      title: "Phật giáo trong đổi mới và hội nhập",
      year: "Giai đoạn 1986 – nay",
      description: `Từ Đổi mới (1986), Phật giáo phát triển mạnh mẽ trong đời sống xã hội:

Hoạt động nổi bật:

Xây dựng, trùng tu hàng ngàn chùa, tự viện trên cả nước.

Mở rộng đào tạo tăng tài: Thành lập các học viện Phật giáo tại Hà Nội, Huế, TP.HCM, Cần Thơ.

Tăng cường hợp tác quốc tế: Tổ chức Đại lễ Vesak LHQ (2008, 2014, 2019).

Tham gia các hoạt động xã hội, từ thiện, giáo dục, y tế, bảo vệ môi trường, an sinh xã hội.`,
      questions: [
        {
          q: "Đại lễ Vesak LHQ lần đầu được tổ chức tại Việt Nam năm nào?",
          options: ["2008", "2000", "2014"],
          a: 0,
        },
        {
          q: "Phật giáo đóng góp vào lĩnh vực nào sau Đổi mới?",
          options: ["Từ thiện, y tế, giáo dục", "Chính trị", "Quân sự"],
          a: 0,
        },
        {
          q: "Các học viện Phật giáo được thành lập ở đâu?",
          options: ["Hà Nội, Huế, TP.HCM, Cần Thơ", "Chỉ Hà Nội", "Chỉ TP.HCM"],
          a: 0,
        },
      ],
    },
    {
      id: 2,
      title: "Thành lập Giáo hội Phật giáo Việt Nam",
      year: "Cột mốc 1981",
      description: `Ngày 7/11/1981: Giáo hội Phật giáo Việt Nam (GHPGVN) chính thức được thành lập tại Hà Nội.

Ý nghĩa:

Đánh dấu bước ngoặt lịch sử trong quá trình thống nhất Phật giáo cả nước.

Khẩu hiệu hành động: "Đạo pháp – Dân tộc – Chủ nghĩa xã hội."

Vai trò: Trở thành tổ chức duy nhất đại diện cho Tăng Ni, Phật tử Việt Nam, hoạt động trong khuôn khổ pháp luật và định hướng của Nhà nước XHCN.`,
      questions: [
        {
          q: "GHPGVN được thành lập ngày nào?",
          options: ["7/11/1981", "30/4/1975", "2/9/1945"],
          a: 0,
        },
        {
          q: "Khẩu hiệu hành động của GHPGVN là gì?",
          options: [
            "Đạo pháp – Dân tộc – Chủ nghĩa xã hội",
            "Độc lập – Tự do – Hạnh phúc",
            "Tự do tín ngưỡng",
          ],
          a: 0,
        },
        {
          q: "GHPGVN được thành lập tại đâu?",
          options: ["Hà Nội", "Sài Gòn", "Huế"],
          a: 0,
        },
      ],
    },
    {
      id: 3,
      title: "Thống nhất đất nước, chuẩn bị thống nhất Phật giáo",
      year: "Giai đoạn 1975 – 1981",
      description: `Sau 1975, đất nước thống nhất, bước vào thời kỳ quá độ lên CNXH trên phạm vi cả nước.

Phật giáo cả nước bắt đầu quá trình thống nhất tổ chức.

Nhiều cuộc họp, hội nghị được tổ chức giữa các tổ chức Phật giáo Bắc – Trung – Nam để hướng tới một Giáo hội chung.`,
      questions: [
        {
          q: "Đất nước thống nhất năm nào?",
          options: ["1975", "1981", "1954"],
          a: 0,
        },
        {
          q: "Giai đoạn này Phật giáo tập trung làm gì?",
          options: ["Thống nhất tổ chức", "Kháng chiến", "Xây chùa"],
          a: 0,
        },
        {
          q: "Các cuộc họp được tổ chức giữa Phật giáo vùng nào?",
          options: ["Bắc – Trung – Nam", "Chỉ miền Bắc", "Chỉ miền Nam"],
          a: 0,
        },
      ],
    },
    {
      id: 4,
      title: "Phật giáo trong hai miền chia cắt",
      year: "Giai đoạn 1954 – 1975",
      description: `Miền Bắc (XHCN):
• Năm 1958: Thành lập Hội Phật giáo Thống nhất Việt Nam ở miền Bắc.
• Hoạt động: Xây dựng tinh thần "Đạo pháp – Dân tộc – Chủ nghĩa xã hội", tham gia phong trào thi đua yêu nước.

Miền Nam (trước 1975):
• Phật giáo phát triển mạnh, có phong trào đấu tranh chống Mỹ – Ngụy (phong trào Phật giáo 1963).
• Khẩu hiệu: "Phật giáo Việt Nam đồng hành cùng dân tộc".`,
      questions: [
        {
          q: "Hội Phật giáo Thống nhất VN miền Bắc thành lập năm nào?",
          options: ["1958", "1954", "1975"],
          a: 0,
        },
        {
          q: "Phong trào Phật giáo năm 1963 diễn ra ở đâu?",
          options: ["Miền Nam", "Miền Bắc", "Cả nước"],
          a: 0,
        },
        {
          q: "Phật giáo miền Bắc hoạt động theo tinh thần nào?",
          options: [
            "Đạo pháp – Dân tộc – CNXH",
            "Độc lập – Tự do",
            "Chỉ Đạo pháp",
          ],
          a: 0,
        },
      ],
    },
    {
      id: 5,
      title: "Phật giáo đồng hành cùng kháng chiến",
      year: "Giai đoạn 1945 – 1954",
      description: `Bối cảnh: Cách mạng Tháng Tám thành công, nước Việt Nam Dân chủ Cộng hòa ra đời.

Hoạt động nổi bật:

Nhiều tăng ni, phật tử tham gia kháng chiến chống Pháp, ủng hộ Chính phủ Hồ Chí Minh.

Hình thành các tổ chức Phật giáo yêu nước ở cả Bắc – Trung – Nam, tiêu biểu như:

Hội Phật giáo Cứu quốc Việt Nam (1946) – tham gia Mặt trận Việt Minh.

Phật giáo trở thành một lực lượng xã hội tích cực trong phong trào yêu nước.`,
      questions: [
        {
          q: "Cách mạng Tháng Tám thành công năm nào?",
          options: ["1945", "1954", "1946"],
          a: 0,
        },
        {
          q: "Hội Phật giáo Cứu quốc Việt Nam thành lập năm nào?",
          options: ["1946", "1945", "1950"],
          a: 0,
        },
        {
          q: "Phật giáo tham gia tổ chức nào trong kháng chiến?",
          options: [
            "Mặt trận Việt Minh",
            "Chỉ hoạt động riêng",
            "Không tham gia",
          ],
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
        {/* Achievement Badge - Shows when all milestones completed */}
        {completedSet.size === milestones.length && (
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
            <img src="/1.png" alt="Achievement" />
          </Motion.div>
        )}

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
                {/* Content wrapper to maintain consistent height */}
                <div className="milestone-content-wrapper">
                  {/* Always render hidden content to maintain space */}
                  <div className="milestone-content milestone-content-hidden">
                    <span className="milestone-year">{milestone.year}</span>
                    <h3 className="milestone-title">{milestone.title}</h3>
                    <p className="milestone-description">
                      {milestone.description}
                    </p>
                  </div>

                  {/* Show visible content only for completed milestones - overlays the hidden one */}
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
