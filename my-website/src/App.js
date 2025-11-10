// App.jsx
import React, { useEffect, useState } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from "@vercel/analytics/react"
import './App.css';
import { FaGithub, FaLinkedin, FaSun, FaMoon, FaLink, FaFileAlt, FaTwitter, FaEnvelope, FaYoutube, FaCode, FaGraduationCap, FaProjectDiagram, FaHome, FaBriefcase} from 'react-icons/fa';
import { SiDevpost } from "react-icons/si";

function App() {
  const [typedText, setTypedText] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
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

  const scrollToSection = (e, sectionId) => {
  e.preventDefault();
  const element = document.getElementById(sectionId);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 20, // Offset to account for nav
      behavior: 'smooth'
    });
  }
};


  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

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
            src="./images/profile-pic.jpeg"
            alt="mudit-arora's profile picture" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Section - Content */}
        <div className="flex-1 text-left" id="home">
          <h1 className="text-3xl font-cousine mb-4 text-gray-900 dark:text-white">
             Sup, I'm Mudit <span className="waving-hand">👋</span></h1>
          <h2 className="text-xl font-cousine mb-6 min-h-[1.5em] text-gray-600 dark:text-white">{typedText}</h2>

          <div className="font-cousine text-gray-800 dark:text-white space-y-6">
            <div className="flex space-x-6">
              <a 
                href="https://github.com/Mudit-Arora" 
                className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={20} className="mr-2" /> 
              </a>
              <a 
                href="https://linkedin.com/in/aroramudit" 
                className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={20} className="mr-2 " /> 
              </a>
              <a 
                  href="https://muditarora.vercel.app/" 
                  className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLink size={20} className="mr-2" />
                </a>
                <a 
                  href="/MuditAroraResume.pdf" 
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
              My research interests include Data Science, Natural Language Processing, Computer Vision, Large Language Models, and Generative AI. 
              You'll find me working on projects, reading research papers, and talking to chatbots instead of real people.
              When I'm not optimizing algorithms or debugging, you can find me playing video games or watching sitcom.
              I thrive on solving complex problems and building innovative solutions.
            </p>

            <h3 className="text-lg mb-2" id="work-exp"> Work Experience </h3>
            <ul className="text-sm list-disc pl-5 space-y-2">
              <li><strong>Deep Learning Researcher, Uniphore</strong> (May 2025 - Present)</li>
              <li><strong>Computer Science Grader, UCSC</strong> (Oct 2025 - Present)</li>
              <li><strong>AI Software Engineer Intern, CRED</strong> (May 2025 - Spet 2025)</li>
              <li><strong>Graduate Teaching Assistant, UCSC</strong> (Apr 2025 - June 2025)</li>
              <li><strong>STAT Course Grader, UCSC</strong> (Jan 2025 - Mar 2025)</li>
              <li><strong>Social Media Assistant, UCSC</strong> (Nov 2024 - Feb 2025)</li>
              <li><strong>Machine Learning Researcher, Mayo Clinic</strong> (Aug 2023 - May 2024)</li>
              <li><strong>Software Engineering Tutor, ASU</strong> (Feb 2022 - May 2024)</li>
              <li><strong>Software Quality Assurance Intern, Knight Transportation</strong> (May 2022 - Aug 2022)</li>
              <li><strong>Undergraduate Teaching Assistant, ASU</strong> (Aug 2021 - May 2022)</li>
            </ul>

            <h3 className="text-lg mb-2" id="education"> Education </h3>
            <p className="text-sm">
              <li><strong>MSAI @ UC Santa Cruz</strong> </li>
              <li><strong>BSCS @ ASU</strong> </li>
            </p>

            {/* Skills section*/}
<div className="mt-6 font-cousine text-gray-700 dark:text-white">
  <h3 className="text-lg mb-3" id="skills" >Skills</h3>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
    <div>
      <h4 className="font-bold mb-1">Programming Languages</h4>
      <p className="mb-3">Python, R, JavaScript, TypeScript, C++, Java, Swift, MATLAB</p>
      
      <h4 className="font-bold mb-1">AI & Machine Learning</h4>
      <p className="mb-3">PyTorch, TensorFlow, Keras, scikit-learn, MLX, NLTK, spaCy, OpenCV, LangChain, AutoGen</p>
    </div>
    
    <div>
      <h4 className="font-bold mb-1">Web Development</h4>
      <p className="mb-3">React.js, Node.js, Next.js, Django, Flask, HTML/CSS</p>
      
      <h4 className="font-bold mb-1">Mobile Development</h4>
      <p className="mb-3">SwiftUI, UIKit, iOS Development</p>
      
      <h4 className="font-bold mb-1">Data Science</h4>
      <p className="mb-3">Pandas, NumPy, Matplotlib, Seaborn, Plotly, MySQL, Spark</p>

      <h4 className="font-bold mb-1">Tools & Platforms</h4>
      <p>Hugging Face, Ollama, Make.com, AWS (S3), GCP, Azure, Git, Docker, Postman</p>
    </div>
  </div>
</div>

<div className="mt-6 font-cousine text-gray-700 dark:text-white">
  <h3 className="text-lg mb-4" id="projects">Projects</h3>
  
  <div className="space-y-6">
    {/* SlugMeditate */}
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <img 
          src="/images/slugmeditate.jpg" 
          alt="" 
          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 p-4">
        <h4 className="font-bold text-lg flex items-center">
          <span>SlugMeditate - CruzHacks 2025 Winner 🏆</span>
          <div className="ml-auto flex space-x-2">
            <a href="https://slugmeditate.tech/" 
               className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
               target="_blank" 
               rel="noopener noreferrer">
              <FaLink size={16} />
            </a>
            <a href="https://devpost.com/software/slugmeditate?_gl=1*1fhz630*_gcl_au*MTc1MDgzMzkzOC4xNzQxMjA2Mzk0*_ga*MTEzNzk5MDA0MS4xNzQxMjA2Mzk0*_ga_0YHJK3Y10M*MTc0NTI5NTM5Mi4xMS4xLjE3NDUyOTYwMDUuMC4wLjA." 
               className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
               target="_blank" 
               rel="noopener noreferrer">
              <SiDevpost size={16} />
            </a>
          </div>
        </h4>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md text-xs">Python</span>
          <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md text-xs">Gemini API</span>
          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-md text-xs">Niantic Studio</span>
          <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-md text-xs">Next.js</span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm">
          A pipeline that transforms your thoughts into a 3D ambient escape. SlugMeditate takes a text input from the user and transforms it into Image Generation, Video Creation, Music Generation, 3D Scene Mapping, and finally VR Immersion.
        </p>
      </div>
    </div>

    {/* AmICooked.Chat */}
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <img 
          src="/images/amicookedchat.jpg" 
          alt="" 
          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 p-4">
        <h4 className="font-bold text-lg flex items-center">
          <span>AmICooked.Chat - HackDavis 2025</span>
          <div className="ml-auto flex space-x-2">
            <a href="https://devpost.com/software/amicooked-chat?ref_content=my-projects-tab&ref_feature=my_projects"
               className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
               target="_blank" 
               rel="noopener noreferrer">
              <SiDevpost size={16} />
            </a>
          </div>
        </h4>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md text-xs">Python</span>
          <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md text-xs">Gemini API</span>
          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-md text-xs">FastAPI</span>
          <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-md text-xs">React + Tailwind</span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm">
          A chrome browser extension that passively tracks your browser activity (tab switches, app changes, timestamps), groups them into sessions using heuristics, and summarizes user focus using LLMs as efficiently as possible. 
        </p>
      </div>
    </div>

        {/* Multi-Lingual Emotion Detection System */}
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <img 
          src="/images/emotion-detection.png" 
          alt="Emotion Detection System" 
          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 p-4">
        <h4 className="font-bold text-lg flex items-center">
          <span>Multi-Lingual Emotion Detection System – SemEval 2025</span>
          <div className="ml-auto flex space-x-2">
            <a href="https://github.com/Mudit-Arora/semeval-task11" 
               className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
               target="_blank" 
               rel="noopener noreferrer">
              <FaGithub size={16} />
            </a>
            <a href="/NLP243ProjectReport.pdf"
               className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
               target="_blank" 
               rel="noopener noreferrer">
              <FaFileAlt size={16} />
            </a>
          </div>
        </h4>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md text-xs">PyTorch</span>
          <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md text-xs">NLP</span>
          <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-md text-xs">LSTM/BiLSTM</span>
          {/*<span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-md text-xs">Multi-lingual</span>*/}
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm">
          Architected both LSTM and BiLSTM models for single and cross-language emotion detection, achieving competitive results in the SemEval 2025 competition.
        </p>
      </div>
    </div>

        {/* Language Modelling */}
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <img 
          src="/images/language-model.png" 
          alt="Language Model architecture" 
          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 p-4">
        <h4 className="font-bold text-lg flex items-center">
          <span>Language Modelling</span>
          <div className="ml-auto flex space-x-2">
            <a href="/NLP_243_Homework_3.pdf" 
               className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
               target="_blank" 
               rel="noopener noreferrer">
              <FaFileAlt size={16} />
            </a>
          </div>
        </h4>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md text-xs">PyTorch</span>
          <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md text-xs">Transformers</span>
          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-md text-xs">NLP</span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm">
          Engineered a decoder-only transformer architecture from scratch using PyTorch, focusing on next-word prediction tasks.
        </p>
      </div>
    </div>

    {/* Socially Unsocial */}
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <img 
          src="/images/socially-unsocial.png" 
          alt="Socially Unsocial app" 
          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 p-4">
        <h4 className="font-bold text-lg flex items-center">
          <span>Socially Unsocial</span>
          <div className="ml-auto flex space-x-2">
            <a href="https://www.loom.com/share/bcc65c60c381479d9f416a20986ea431?sid=979070cf-46e8-47c6-a3f2-da211f63091b" 
               className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
               target="_blank" 
               rel="noopener noreferrer">
              <FaYoutube size={16} />
            </a>
          </div>
        </h4>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md text-xs">React.js + Tailwind</span>
          <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md text-xs">Supabase</span>
          {/*<span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-md text-xs">Full-Stack</span>*/}
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm">
          Full-stack social media application featuring dynamic content creation with multimedia support, real-time comment functionality, and content filtering capabilities.
        </p>
      </div>
    </div>
    
    
    {/* ParkPal */}
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <img 
          src="/images/parkpal.png" 
          alt="ParkPal app" 
          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 p-4">
        <h4 className="font-bold text-lg flex items-center">
          <span>ParkPal</span>
          <div className="ml-auto flex space-x-2">
            <a href="https://github.com/Mudit-Arora/ParkPal" 
               className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
               target="_blank" 
               rel="noopener noreferrer">
              <FaGithub size={16} />
            </a>
            <a href="https://youtu.be/KRMCgYt3N_I?si=Jk-4k1mnpJbAB1kJ" 
               className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
               target="_blank" 
               rel="noopener noreferrer">
              <FaYoutube size={16} />
            </a>
          </div>
        </h4>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md text-xs">Swift</span>
          <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md text-xs">SwiftUI</span>
          {/*<span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-md text-xs">iOS</span>*/}
          <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-md text-xs">CoreData</span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm">
          iOS application that locates nearby parking spots with directions and CoreData integration for saving favorite parking locations.
        </p>
      </div>
    </div>
    
    {/* Photo Share */}
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <img 
          src="/images/photo-share.png" 
          alt="Photo Share application" 
          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 p-4">
        <h4 className="font-bold text-lg flex items-center">
          <span>Photo Share</span>
          <div className="ml-auto flex space-x-2">
            <a href="https://youtu.be/JONdeJ6hhk0?si=OfrA7bstTST0hCVh" 
               className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
               target="_blank" 
               rel="noopener noreferrer">
              <FaYoutube size={16} />
            </a>
            <a href="https://github.com/Mudit-Arora/Photo-Share-" 
               className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
               target="_blank" 
               rel="noopener noreferrer">
              <FaGithub size={16} />
            </a>
          </div>
        </h4>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md text-xs">HTML/CSS</span>
          <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-md text-xs">JavaScript</span>
          <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md text-xs">Node.js</span>
          <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-md text-xs">SQL</span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm">
          Instagram-inspired web application with comprehensive features including user authentication, photo sharing, and social engagement.
        </p>
      </div>
    </div>
  </div>
</div>
<div className="w-full text-center py-6 mt-12 text-gray-500 dark:text-gray-400 text-sm">
  <p className="flex items-center justify-center">
    Made with 
    <svg 
      className="w-5 h-5 mx-1 text-red-500 animate-pulse" 
      fill="currentColor" 
      viewBox="0 0 20 20" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        fillRule="evenodd" 
        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
        clipRule="evenodd"
      />
    </svg>
    by Mudit Arora
  </p>
</div>

{/* Navigation Icons */}
<div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 rounded-full backdrop-blur-md bg-white/70 dark:bg-gray-900/70 shadow-lg border border-gray-200 dark:border-gray-700 px-4 py-2">
  <div className="flex items-center space-x-8">
    <a 
      href="#home" 
      onClick={(e) => scrollToSection(e, 'home')}
      className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
      aria-label="Home"
    >
      <FaHome size={20} />
    </a>
    
    <a 
      href="#work-exp"
      onClick={(e) => scrollToSection(e, 'work-exp')} 
      className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
      aria-label="Work Experience"
    >
      <FaBriefcase size={20} />
    </a>
    
    <a 
      href="#education" 
      onClick={(e) => scrollToSection(e, 'education')}
      className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
      aria-label="Education"
    >
      <FaGraduationCap size={20} />
    </a>
    
    <a 
      href="#skills"
      onClick={(e) => scrollToSection(e, 'skills')} 
      className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
      aria-label="Skills"
    >
      <FaCode size={20} />
    </a>
    
    <a 
      href="#projects"
      onClick={(e) => scrollToSection(e, 'projects')} 
      className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
      aria-label="Projects"
    >
      <FaProjectDiagram size={20} />
    </a>
  </div>
</div>
          </div>
        </div>
      </div>
      <SpeedInsights />
      <Analytics />
    </div>
  );
}

export default App;
