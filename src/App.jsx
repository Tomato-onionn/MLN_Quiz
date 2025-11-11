import { useState, useRef } from "react";
import { motion as Motion } from "framer-motion";
import TimelinePage from "./TimelinePage";
import FinalPage from "./FinalPage";
import { phatGiaoData } from "./data/phatgiao";
import { congGiaoData } from "./data/conggiao";
import { daoChienData } from "./data/daochien";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("phatgiao");
  const [page1Completed, setPage1Completed] = useState(false);
  const [page2Completed, setPage2Completed] = useState(false);
  const [page3Completed, setPage3Completed] = useState(false);
  const [earnedBadge, setEarnedBadge] = useState(null);
  const [showEarned, setShowEarned] = useState(false);

  const badge1Shown = useRef(false);
  const badge2Shown = useRef(false);
  const badge3Shown = useRef(false);

  const handlePage1Complete = () => {
    if (!page1Completed && !badge1Shown.current) {
      badge1Shown.current = true;
      setPage1Completed(true);
      setEarnedBadge("/1.png");
      setShowEarned(true);
      setTimeout(() => setShowEarned(false), 2500);
    }
  };

  const handlePage2Complete = () => {
    if (!page2Completed && !badge2Shown.current) {
      badge2Shown.current = true;
      setPage2Completed(true);
      setEarnedBadge("/2.png");
      setShowEarned(true);
      setTimeout(() => setShowEarned(false), 2500);
    }
  };

  const handlePage3Complete = () => {
    if (!page3Completed && !badge3Shown.current) {
      badge3Shown.current = true;
      setPage3Completed(true);
      setEarnedBadge("/3.png");
      setShowEarned(true);
      setTimeout(() => setShowEarned(false), 2500);
    }
  };

  const goToPage = (pageName) => {
    setCurrentPage(pageName);
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "auto",
      });
    }, 100);
  };

  return (
    <>
      {showEarned && earnedBadge && (
        <Motion.div
          className="earned-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
            pointerEvents: "none",
            background: "transparent",
          }}
        >
          <Motion.div
            className="earned-modal"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              padding: 20,
              textAlign: "center",
              minWidth: 240,
              background: "transparent",
            }}
          >
            <h3
              style={{
                margin: 0,
                marginBottom: 8,
                color: "#fff",
                textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                fontSize: "1.8rem",
                background: "transparent",
              }}
            >
              🎉 Chúc mừng!
            </h3>
            <p
              style={{
                margin: 0,
                marginBottom: 12,
                color: "#fff",
                textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                fontSize: "1.1rem",
                background: "transparent",
              }}
            >
              Bạn nhận được 1 thẻ
            </p>
            <img
              src={earnedBadge}
              alt="earned"
              style={{
                width: 120,
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.5))",
                background: "transparent",
              }}
            />
          </Motion.div>
        </Motion.div>
      )}
      {currentPage === "phatgiao" && (
        <>
          <TimelinePage
            milestones={phatGiaoData}
            bgImage="/PhatGiao.png"
            badgeImage="/1.png"
            footerText="Namo Amitabha Buddha              "
            onComplete={handlePage1Complete}
          />

          {page1Completed && (
            <Motion.div
              className="next-page-arrow"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => goToPage("conggiao")}
            >
              <div className="arrow-content">
                <span>Tiếp theo</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Motion.div>
          )}
        </>
      )}

      {currentPage === "conggiao" && (
        <>
          {/* Keep badge 1 from page 1 */}
          {page1Completed && (
            <Motion.div
              className="achievement-badge"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <img src="/1.png" alt="Achievement 1" />
            </Motion.div>
          )}

          {/* Badge 2 when page 2 is completed */}
          {page2Completed && (
            <Motion.div
              className="achievement-badge achievement-badge-second"
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.3,
              }}
            >
              <img src="/2.png" alt="Achievement 2" />
            </Motion.div>
          )}

          <TimelinePage
            milestones={congGiaoData}
            bgImage="/CongGiao.png"
            badgeImage=""
            footerText="In the name of the Father, and of the Son, and of the Holy Spirit"
            onComplete={handlePage2Complete}
            hideBadge={true}
          />

          {page2Completed && (
            <Motion.div
              className="next-page-arrow"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => goToPage("daochien")}
            >
              <div className="arrow-content">
                <span>Tiếp theo</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Motion.div>
          )}
        </>
      )}

      {currentPage === "daochien" && (
        <>
          {/* Keep badges from previous pages */}
          {page1Completed && (
            <Motion.div
              className="achievement-badge"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <img src="/1.png" alt="Achievement 1" />
            </Motion.div>
          )}

          {page2Completed && (
            <Motion.div
              className="achievement-badge achievement-badge-second"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <img src="/2.png" alt="Achievement 2" />
            </Motion.div>
          )}

          {/* Badge 3 when page 3 is completed */}
          {page3Completed && (
            <Motion.div
              className="achievement-badge achievement-badge-third"
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.3,
              }}
            >
              <img src="/3.png" alt="Achievement 3" />
            </Motion.div>
          )}

          <TimelinePage
            milestones={daoChienData}
            bgImage="/Balamon.png"
            badgeImage=""
            footerText="Peace and Harmony"
            onComplete={handlePage3Complete}
            hideBadge={true}
          />

          {page3Completed && (
            <Motion.div
              className="next-page-arrow"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => goToPage("final")}
            >
              <div className="arrow-content">
                <span>Hoàn thành</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Motion.div>
          )}
        </>
      )}

      {currentPage === "final" && <FinalPage />}
    </>
  );
}

export default App;
