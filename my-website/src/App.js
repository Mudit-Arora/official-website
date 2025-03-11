// App.jsx
import React, { useEffect, useState } from 'react';
import './App.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function App() {
  const [typedText, setTypedText] = useState('');
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

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start">
        {/* Left Section - Image */}
        <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 mr-6 mb-6 md:mb-0 rounded-full overflow-hidden border-2 border-gray-300">
          <img 
            src="https://via.placeholder.com/150" 
            alt="Mudit Arora" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Section - Content */}
        <div className="flex-1 text-left">
          <h1 className="text-3xl font-cousine mb-4">Mudit Arora</h1>
          <h2 className="text-xl font-cousine text-gray-600 mb-6 min-h-[1.5em]">{typedText}</h2>

          <div className="font-cousine text-gray-800 space-y-6">
            <p>Santa Clara, CA | +1 (602) 545-7387</p>
            <p>muditarora31@gmail.com</p>
            <div className="flex space-x-6">
              <a 
                href="https://github.com/Mudit-Arara" 
                className="text-gray-800 hover:text-blue-600 flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="mr-2" /> GitHub
              </a>
              <a 
                href="https://linkedin.com/in/muditarora" // Replace with your actual LinkedIn URL
                className="text-gray-800 hover:text-blue-600 flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="mr-2" /> LinkedIn
              </a>
              <a 
                href="https://portfolio.com" 
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Portfolio
              </a>
            </div>
          </div>

          <div className="mt-6 font-cousine text-gray-700 space-y-6">
            <h3 className="text-lg mb-2">Summary</h3>
            <p className="text-sm">
              Experienced in building and deploying AI models for Healthcare, Education & Software. 
              Skilled in Python, PyTorch, TensorFlow, NLP, LLMs, Computer Vision, and more. 
              Driven by solving complex problems through innovative algorithms.
            </p>

            <h3 className="text-lg mb-2">Work Experience</h3>
            <p className="text-sm">
              <strong>STAT 132 Reader, UCSC</strong> (Jan 2025 - Present)  
            </p>
            <p className="text-sm">
              <strong>Social Media Assistant, UCSC</strong> (Nov 2024 - Feb 2025)  
            </p>
            <p className="text-sm">
              <strong>Machine Learning Researcher, Mayo Clinic</strong> (Aug 2023 - May 2024)  
            </p>
            <p className="text-sm">
              <strong>Software Engineering Tutor, ASU</strong> (Feb 2022 - May 2024)  
            </p>
            <p className="text-sm">
              <strong>Machine Learning Researcher, Mayo Clinic</strong> (Aug 2023 - May 2024)  
            </p>
            <p className="text-sm">
              <strong>Software Engineering Tutor, ASU</strong> (Feb 2022 - May 2024)  
            </p>
            <p className="text-sm">
              <strong>Software Quality Assurance Intern, Knight Transportation</strong> (May 2022 - Aug 2022)  
            </p>
            <p className="text-sm">
              <strong>Undergraduate Teaching Assistant, ASU</strong> (Aug 2021 - May 2022)  
            </p>


            <h3 className="text-lg mb-2">Projects</h3>
            <p className="text-sm">
              <strong>Multi-Lingual Emotion Detection System</strong>  
              Built LSTM models with PyTorch, achieving F1 scores of 0.35 using language-aware attention.
            </p>

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
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;