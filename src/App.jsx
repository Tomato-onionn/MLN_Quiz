import { useState } from "react";
import { motion as Motion } from "framer-motion";
import TimelinePage from "./TimelinePage";
import FinalPage from "./FinalPage";
import { phatGiaoData } from "./data/phatgiao";
import { congGiaoData } from "./data/conggiao";
import { daoChienData } from "./data/daochien";
import { daoHoaHaoData } from "./data/daohoahao";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("phatgiao");
  const [page1Completed, setPage1Completed] = useState(false);
  const [page2Completed, setPage2Completed] = useState(false);
  const [page3Completed, setPage3Completed] = useState(false);
  const [page4Completed, setPage4Completed] = useState(false);

  const handlePage1Complete = () => {
    setPage1Completed(true);
  };

  const handlePage2Complete = () => {
    setPage2Completed(true);
  };

  const handlePage3Complete = () => {
    setPage3Completed(true);
  };

  const handlePage4Complete = () => {
    setPage4Completed(true);
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
      {currentPage === "phatgiao" && (
        <>
          <TimelinePage
            milestones={phatGiaoData}
            bgImage="/PhatGiao.png"
            badgeImage="/1.png"
            footerText="Group 7"
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
              onClick={() => goToPage("daohoahao")}
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

      {currentPage === "daohoahao" && (
        <>
          {/* Keep all previous badges */}
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

          {page3Completed && (
            <Motion.div
              className="achievement-badge achievement-badge-third"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <img src="/3.png" alt="Achievement 3" />
            </Motion.div>
          )}

          {/* Badge 4 when page 4 is completed */}
          {page4Completed && (
            <Motion.div
              className="achievement-badge achievement-badge-fourth"
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.3,
              }}
            >
              <img src="/4.png" alt="Achievement 4" />
            </Motion.div>
          )}

          <TimelinePage
            milestones={daoHoaHaoData}
            bgImage="/Hoigiao.png"
            badgeImage=""
            footerText="Bần Tăng Phật Tử"
            onComplete={handlePage4Complete}
            hideBadge={true}
          />

          {page4Completed && (
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
