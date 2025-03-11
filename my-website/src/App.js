// App.jsx
import React, { useEffect, useState } from 'react';
import './App.css';
import { FaGithub, FaLinkedin, FaSun, FaMoon, FaLink, FaFileAlt, FaTwitter, FaEnvelope} from 'react-icons/fa';

function App() {
  const [typedText, setTypedText] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false); // State for theme
  const fullText = "Full Time Developer | Part Time Gamer | All Time Learner";

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
            alt="mudit-arora's profile picture" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Section - Content */}
        <div className="flex-1 text-left">
          <h1 className="text-3xl font-cousine mb-4 text-gray-900 dark:text-white">Sup, I'm Mudit 👋 </h1>
          <h2 className="text-xl font-cousine mb-6 min-h-[1.5em] text-gray-600 dark:text-white">{typedText}</h2>

          <div className="font-cousine text-gray-800 dark:text-white space-y-6">
            <div className="flex space-x-6">
              <a 
                href="https://github.com/Mudit-Arara" 
                className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={20} className="mr-2" /> 
              </a>
              <a 
                href="https://linkedin.com/in/muditarora" // Replace with your actual LinkedIn URL
                className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={20} className="mr-2 " /> 
              </a>
              <a 
                  href="https://mudit-arora.github.io/official-website/" 
                  className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLink size={20} className="mr-2" />
                </a>
                <a 
                  href="" 
                  className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFileAlt size={20} className="mr-2" />
                </a>
                 <a 
                  href="https://x.com/xxmuditaroraxx" 
                  className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter size={20} className="mr-2" />
                </a>
                <a 
                  href="mailto:muditarora31@gmail.com" 
                  className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaEnvelope size={20} className="mr-2" />
                </a>
            </div>
          </div>

          <div className="mt-6 font-cousine text-gray-700 dark:text-white space-y-6">
            <h3 className="text-lg mb-2">About</h3>
            <p className="text-sm">
              I'm a Machine Learning and Deep Learning researcher based in the Bay Area. 
              My research interests include Data Science, Natural Language Processing, Computer Vision, and Large Language Models. 
              You'll find me working on projects, reading research papers, and talking to chatbots instead of real people.
              When I'm not opimizing algorithms or debugging, you can find me playing video games or watching sitcom.
              I thrive on solving complex problems and building innovative solutions.
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

            <h3 className="text-lg mb-2">Education</h3>
            <p className="text-sm">
              <li><strong>MSNLP @ UC Santa Cruz</strong> </li>
              <li><strong>BSCS @ ASU</strong> </li>
            </p>

            {/* Replace the existing Skills section with this categorized version */}
<div className="mt-6 font-cousine text-gray-700 dark:text-white">
  <h3 className="text-lg mb-3">Skills</h3>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
    <div>
      <h4 className="font-bold mb-1">Programming Languages</h4>
      <p className="mb-3">Python, JavaScript, Swift, R, HTML/CSS, C++, Java, MATLAB</p>
      
      <h4 className="font-bold mb-1">AI & Machine Learning</h4>
      <p className="mb-3">PyTorch, TensorFlow, Keras, scikit-learn, NLTK, spaCy, OpenCV</p>
    </div>
    
    <div>
      <h4 className="font-bold mb-1">Web Development</h4>
      <p className="mb-3">React.js, Node.js, Django, Flask, HTML/CSS</p>
      
      <h4 className="font-bold mb-1">Mobile Development</h4>
      <p className="mb-3">SwiftUI, UIKit, iOS Development</p>
      
      <h4 className="font-bold mb-1">Data Science</h4>
      <p className="mb-3">Pandas, NumPy, Matplotlib, Seaborn, Plotly, MySQL, Spark</p>

      <h4 className="font-bold mb-1">Tools & Platforms</h4>
      <p>AWS, Azure, Git</p>
    </div>
  </div>
</div>

            <h3 className="text-lg mb-2">Projects</h3>
            <ul className="text-sm list-disc pl-5 space-y-2">
              <li><strong>Multi-Lingual Emotion Detection System</strong></li>
            </ul>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;