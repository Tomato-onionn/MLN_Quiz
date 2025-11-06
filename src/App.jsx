import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./App.css";

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

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

  const milestones = [
    {
      id: 1,
      title: "Giác ngộ viên mãn",
      year: "2025",
      description: "Đạt được sự thanh thản nội tâm",
    },
   
    {
      id: 3,
      title: "Thực hành từ bi",
      year: "2023",
      description: "Nuôi dưỡng lòng thương yêu",
    },
    {
      id: 4,
      title: "Tu tập thiền định",
      year: "2022",
      description: "Rèn luyện tâm trí thanh tịnh",
    },
    {
      id: 5,
      title: "Học hỏi giáo pháp",
      year: "2021",
      description: "Tiếp thu tri thức và trí tuệ",
    },
    {
      id: 6,
      title: "Khởi đầu hành trình",
      year: "2020",
      description: "Bước đầu tiên trên con đường giác ngộ",
    },
  ];

  return (
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

          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              className={`milestone ${index % 2 === 0 ? "left" : "right"}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="milestone-content">
                <span className="milestone-year">{milestone.year}</span>
                <h3 className="milestone-title">{milestone.title}</h3>
                <p className="milestone-description">{milestone.description}</p>
              </div>
              <div className="milestone-marker" />
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <footer className="footer">
          <p>Namo Amitabha Buddha</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
