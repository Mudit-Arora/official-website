// App.jsx
import React, { useEffect, useState } from 'react';
import './App.css';
import { FaGithub, FaLinkedin, FaSun, FaMoon } from 'react-icons/fa';

function App() {
  const [typedText, setTypedText] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false); // State for theme
  const fullText = "Machine & Deep Learning Engineer";

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 100);
    return () => clearInterval(typing);
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'} flex items-center justify-center p-6 transition-colors duration-300`}>
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
          aria-label="Toggle theme"
        >
          {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start">
        {/* Left Section - Image */}
        <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 mr-6 mb-6 md:mb-0 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600">
          <img 
            src="/pic.jpeg"
            alt="Mudit Arora" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Section - Content */}
        <div className="flex-1 text-left">
          <h1 className="text-3xl font-cousine mb-4 text-gray-900 dark:text-white">Mudit Arora</h1>
          <h2 className="text-xl font-cousine mb-6 min-h-[1.5em] text-gray-600 dark:text-white">{typedText}</h2>

          <div className="font-cousine text-gray-800 dark:text-white space-y-6">
            <div className="flex space-x-6">
              <a 
                href="https://github.com/Mudit-Arara" 
                className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="mr-2" /> 
              </a>
              <a 
                href="https://linkedin.com/in/muditarora" // Replace with your actual LinkedIn URL
                className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="mr-2" /> 
              </a>
              <a 
                href="https://portfolio.com" 
                className="text-blue-600 dark:text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Portfolio
              </a>
            </div>
          </div>

          <div className="mt-6 font-cousine text-gray-700 dark:text-white space-y-6">
            <h3 className="text-lg mb-2">Summary</h3>
            <p className="text-sm">
              Experienced in building and deploying AI models for Healthcare, Education & Software. 
              Skilled in Python, PyTorch, TensorFlow, NLP, LLMs, Computer Vision, and more. 
              Driven by solving complex problems through innovative algorithms.
            </p>

            <h3 className="text-lg mb-2">Work Experience</h3>
            <ul className="text-sm list-disc pl-5 space-y-2">
              <li><strong>STAT 132 Reader, UCSC</strong> (Jan 2025 - Present)</li>
              <li><strong>Social Media Assistant, UCSC</strong> (Nov 2024 - Feb 2025)</li>
              <li><strong>Machine Learning Researcher, Mayo Clinic</strong> (Aug 2023 - May 2024)</li>
              <li><strong>Software Engineering Tutor, ASU</strong> (Feb 2022 - May 2024)</li>
              <li><strong>Software Quality Assurance Intern, Knight Transportation</strong> (May 2022 - Aug 2022)</li>
              <li><strong>Undergraduate Teaching Assistant, ASU</strong> (Aug 2021 - May 2022)</li>
            </ul>

            <h3 className="text-lg mb-2">Projects</h3>
            <ul className="text-sm list-disc pl-5 space-y-2">
              <li><strong>Multi-Lingual Emotion Detection System</strong></li>
            </ul>

            <h3 className="text-lg mb-2">Skills</h3>
            <p className="text-sm">
              Python, R, C++, MATLAB, Java, JavaScript, MySQL, PyTorch, TensorFlow, scikit-learn, OpenCV, AWS, Azure, Git
            </p>

            <h3 className="text-lg mb-2">Education</h3>
            <p className="text-sm">
              <strong>MS in NLP, UC Santa Cruz</strong> (Expected Jun 2026, GPA 3.66)  
              <strong>BS in CS, ASU</strong> (May 2024, Magna Cum Laude, GPA 3.77)
            </p>

            <h3 className="text-lg mb-2">Personal Note</h3>
            <p className="text-sm">
              I’m passionate about leveraging AI to solve real-world challenges and enjoy exploring new technologies in my free time.
            </p>

            <h3 className="text-lg mb-2">Stay Updated</h3>
            <p className="text-sm">
              Get tips and updates on my AI projects. Subscribe below!  
              <a href="mailto:muditarora31@gmail.com?subject=Subscribe" className="text-blue-600 dark:text-blue-400 hover:underline">Subscribe</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;