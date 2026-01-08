// src/App.jsx
import { useState } from "react";
import CardNav from "./components/CardNav";
import TextType from "./components/TextType";
import DotGrid from "./components/DotGrid";
import DecryptedText from "./components/DecryptedText";
import SplitText from "./components/SplitText";
import GradientText from "./components/GradientText";
import ScrollVelocity from "./components/ScrollVelocity";
import Stack from "./components/Stack";
import img1 from "../Images/Untitled2.jpg";
import img2 from "../Images/firefox_VgMe7AAG1P.jpg";
import img3 from "../Images/static.jpg";
import ScrollReveal from "./components/ScrollReveal";
import Carousel from "./components/Carousel";
import notepadImg from "../Images/Notepad_L9bfdFRXEe.png";
import portfolioImg from "../Images/portfolioimage.png";
import skillmatcher1Img from "../Images/Skillmatcher1.png";
import skillmatcher2Img from "../Images/Skillmatcher2.png";
import ProfileCard from "./components/ProfileCard";

// Navigation items for CardNav
const navItems = [
  {
    label: "About",
    bgColor: "#1a1a1a",
    textColor: "#fff",
    links: [
      { label: "CV", href: "/AbdulmalikAlGhamdi_CV_V3.5.pdf", ariaLabel: "View my CV", target: "_blank" },
    ],
  },
  {
    label: "Projects",
    bgColor: "#14b8a6",
    textColor: "#000",
    links: [
      { label: "GitHub", href: "https://github.com/ASG00-0/", ariaLabel: "Visit my GitHub", target: "_blank" },
    ],
  },
  {
    label: "Contact",
    bgColor: "#1a1a1a",
    textColor: "#fff",
    links: [
      { label: "Email Me", href: "mailto:abdalmalik2873@gmail.com", ariaLabel: "Send me an email" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/abdalmalik0/", ariaLabel: "Connect on LinkedIn", target: "_blank" },
    ],
  },
];


export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden bg-black text-white">
      {/* 1) DotGrid canvas: background layer (Fixed across sections) */}
      <div className="fixed inset-0 z-0">
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#2c2c2cff"
          activeColor="#00FFFF"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      {/* 2) Dark overlay: above canvas, below all UI */}
      <div className="fixed inset-0 z-10 bg-black/35 pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative h-screen w-full z-20">
        {/* 2.5) Welcome Text: off to the left */}
        <div className="absolute top-1/3 left-[10%] -translate-y-1/2 pointer-events-none hidden md:block">
          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={3}
            showBorder={false}
            className="px-0"
          >
            <DecryptedText
              text="Welcome!"
              speed={100}
              maxIterations={40}
              characters="ABCD1234!?@#$%^&*()_+"
              className="text-9xl font-bold italic"
              parentClassName="all-letters"
              encryptedClassName="text-9xl font-bold"
              animateOn="view"
              revealDirection="start"
              sequential={true}
            />
          </GradientText>
        </div>

        <div className="absolute top-[60%] left-[10%] w-[40%] -translate-y-1/2 pointer-events-none hidden md:block">
          <SplitText
            text="This portfolio is a brief introduction to who I am and some of the projects I’ve worked on. Feel free to look around!"
            className="text-3xl font-semibold text-white"
            delay={10}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="left"
          />
        </div>


      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="relative z-20 w-full min-h-[50vh] flex flex-col justify-center pt-20 pb-40">
        <div className="w-full">
          {/* Glass background bar */}
          <div className="relative w-full">
            <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm border-y border-white/10 z-0 h-full w-full pointer-events-none" />

            <div className="relative z-10 py-4">
              <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={10}
                showBorder={false}
                className="px-0 w-full"
              >
                <ScrollVelocity
                  texts={['About']}
                  velocity={50}
                  numCopies={12}
                  className="font-bold italic text-6xl cursor-default pr-20"
                />
              </GradientText>
            </div>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-8 mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 items-center">

          {/* Left side: Text placeholder */}
          <div className="text-left pl-12 md:col-span-2">
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={5}
              blurStrength={10}
              textClassName="text-2xl font-semibold text-white !leading-tight"
            >
              I am Abdulmalik AlGhamdi, a recent Computer Science graduate from King Abdulaziz University with a solid background in problem solving and analytical thinking.
            </ScrollReveal>
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={5}
              blurStrength={10}
              textClassName="text-2xl font-semibold text-white !leading-tight"
            >
              I approach challenges by breaking them down into clear, manageable steps and addressing them with logic and persistence.
            </ScrollReveal>
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={5}
              blurStrength={10}
              textClassName="text-2xl font-semibold text-white !leading-tight"
            >
              I value simplicity, continuous learning, and thoughtful structure, and I strive to produce work that is both effective and intuitive.
            </ScrollReveal>
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={5}
              blurStrength={10}
              textClassName="text-2xl font-semibold text-white !leading-tight"
            >
              This portfolio offers a brief introduction to my mindset and how I approach learning and growth as I move forward in my professional journey.
            </ScrollReveal>
          </div>

          {/* Right side: Stack of images */}
          <div className="relative h-[400px] w-full flex items-center justify-center md:justify-end">
            <div className="relative w-[300px] h-[300px]">
              <Stack
                randomRotation={true}
                sensitivity={180}
                sendToBackOnClick={true}
                cardDimensions={{ width: 300, height: 300 }}
                autoplay={true}
                autoplayDelay={2000}
                cards={[
                  <img src={img1} alt="Project 1" className="w-full h-full object-cover rounded-2xl" />,
                  <img src={img2} alt="Project 2" className="w-full h-full object-cover rounded-2xl" />,
                  <img src={img3} alt="Project 3" className="w-full h-full object-cover rounded-2xl" />,
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="relative z-20 w-full min-h-[50vh] flex flex-col justify-center pt-20 pb-40">
        <div className="w-full">
          {/* Glass background bar */}
          <div className="relative w-full">
            <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm border-y border-white/10 z-0 h-full w-full pointer-events-none" />

            <div className="relative z-10 py-4">
              <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={10}
                showBorder={false}
                className="px-0 w-full"
              >
                <ScrollVelocity
                  texts={['Projects']}
                  velocity={50}
                  numCopies={12}
                  className="font-bold italic text-6xl cursor-default pr-20 -translate-y-2"
                />
              </GradientText>
            </div>
          </div>
        </div>

        {/* Carousel with Projects */}
        <div className="mt-8 w-full flex justify-center">
          <div className="w-full max-w-4xl">
          <Carousel
            items={[
              {
                id: 1,
                content: (
                  <div className="bg-gradient-to-br from-blue-900/30 to-blue-700/20 border border-blue-500/20 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] p-8" style={{ width: '100%' }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full min-h-[350px]">
                      <div className="flex flex-col justify-center py-4">
                        <h2 className="text-4xl font-bold mb-4 text-white">Saudi Legal RAG System</h2>
                        <p className="text-lg text-gray-300 leading-relaxed">
                          Developed an end-to-end pipeline that scrapes Saudi legal texts from laws.moj.gov.sa, preprocesses them into clean
                          article chunks, builds a FAISS vector index with OpenAI embeddings, and implements a Retrieval-Augmented
                          Generation (RAG) workflow using the humain-ai/ALLaM-7B-Instruct-preview model.
                        </p>
                        <p className="text-lg text-gray-300 leading-relaxed mt-4">
                          The project includes robust Arabic-specific text normalization, accurate article-level chunking, deduplication, and a flexible prompt that treats
                          retrieved statutes as reference material while allowing the LLM to add additional context.
                        </p>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="relative w-[400px] h-[300px]">
                          <Stack
                            randomRotation={true}
                            sensitivity={180}
                            sendToBackOnClick={true}
                            autoplay={true}
                            autoplayDelay={3000}
                            cards={[
                              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-1 flex items-center justify-center overflow-hidden">
                                <img src={notepadImg} alt="Notepad Application" className="w-full h-full object-cover rounded-xl" />
                              </div>
                            ]}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                id: 2,
                content: (
                  <div className="bg-gradient-to-br from-blue-800/30 to-blue-600/20 border border-blue-400/20 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] p-8" style={{ width: '100%' }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full min-h-[350px]">
                      <div className="flex flex-col justify-center py-4">
                        <h2 className="text-4xl font-bold mb-4 text-white">Portfolio Website</h2>
                        <p className="text-lg text-gray-300 leading-relaxed">
                          A personal portfolio website showcasing my projects and professional journey. Built with modern web
                          technologies including React, Tailwind CSS, and various animation libraries to create an engaging and
                          interactive user experience.
                        </p>
                        <p className="text-lg text-gray-300 leading-relaxed mt-4">
                          The website features smooth scrolling animations, responsive design, and a dark theme aesthetic. It
                          serves as both a demonstration of technical skills and a platform to share my work with potential
                          employers and collaborators.
                        </p>
                      </div>
                      <div className="flex items-center justify-center py-4">
                        <div className="relative w-[400px] h-[300px]">
                          <Stack
                            randomRotation={true}
                            sensitivity={180}
                            sendToBackOnClick={true}
                            autoplay={true}
                            autoplayDelay={3000}
                            cards={[
                              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-700 to-blue-900 p-1 flex items-center justify-center overflow-hidden">
                                <img src={portfolioImg} alt="Portfolio Website" className="w-full h-full object-cover rounded-xl" />
                              </div>
                            ]}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                id: 3,
                content: (
                  <div className="bg-gradient-to-br from-blue-700/30 to-blue-500/20 border border-blue-300/20 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] p-8" style={{ width: '100%' }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full min-h-[350px]">
                      <div className="flex flex-col justify-center py-4">
                        <h2 className="text-4xl font-bold mb-4 text-white">Job Matching Platform</h2>
                        <p className="text-lg text-gray-300 leading-relaxed">
                          A full-stack job board application that combines a Django backend with a React frontend to connect job seekers
                          and companies. The server side defines a custom user model with roles for job seekers and companies, manages job
                          listings and applications, and can generate personalized CV feedback using the OpenAI API. A separate model pulled
                          with Ollama ranks applicants for each job.
                        </p>
                        <p className="text-lg text-gray-300 leading-relaxed mt-4">
                          The React interface provides pages for viewing and posting jobs, uploading CVs, requesting feedback, and managing profiles, while Django templates handle server-rendered views.
                        </p>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="relative w-[400px] h-[300px]">
                          <Stack
                            randomRotation={true}
                            sensitivity={180}
                            sendToBackOnClick={true}
                            autoplay={true}
                            autoplayDelay={3000}
                            cards={[
                              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 p-1 flex items-center justify-center overflow-hidden">
                                <img src={skillmatcher1Img} alt="Skill Matcher Dashboard" className="w-full h-full object-cover rounded-xl" />
                              </div>,
                              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-1 flex items-center justify-center overflow-hidden">
                                <img src={skillmatcher2Img} alt="Skill Matcher Features" className="w-full h-full object-cover rounded-xl" />
                              </div>
                            ]}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                id: 4,
                content: (
                  <div className="bg-gradient-to-br from-blue-900/30 to-blue-700/20 border border-blue-500/20 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] p-8" style={{ width: '100%' }}>
                    <div className="flex items-center justify-center h-full min-h-[350px]">
                      <p className="text-5xl md:text-6xl font-bold italic text-white/90 text-center">
                        ...and many more to come!
                      </p>
                    </div>
                  </div>
                )
              }
            ]}
            baseWidth={1000}
            autoplay={false}
            loop={false}
            round={false}
          />
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="relative z-20 w-full min-h-[50vh] flex flex-col justify-center pt-20 pb-40">
        <div className="w-full">
          {/* Glass background bar */}
          <div className="relative w-full">
            <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm border-y border-white/10 z-0 h-full w-full pointer-events-none" />
            <div className="relative z-10 py-4">
              <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={10}
                showBorder={false}
                className="px-0 w-full"
              >
                <ScrollVelocity
                  texts={['Contact']}
                  velocity={50}
                  numCopies={12}
                  className="font-bold italic text-6xl cursor-default pr-20 -translate-y-2"
                />
              </GradientText>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center mt-14">
          <div className="w-full max-w-md">
            <ProfileCard
              name="Abdulmalik AlGhamdi"
              title="Software Developer"
              avatarUrl="https://avatars.githubusercontent.com/u/1?v=4"
              showUserInfo={false}
              phone="+966592344713"
              email="abdalmalik2873@gmail.com"
            />
          </div>
        </div>
      </section>

      {/* NAV: Fixed at top */}
      <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <CardNav
            logo="https://via.placeholder.com/120x28/000000/ffffff?text=LOGO"
            logoAlt=""
            logoContent={
              <TextType
                text={[
                  "Welcome to my portfolio!",
                  "Great to see you here :)",
                  "Make sure to check out my projects!",
                ]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                className="font-['JetBrains Mono'] font-semibold"
              />
            }
            items={navItems}
            baseColor="rgba(255, 255, 255, 0.05)"
            menuColor="#fff"
          />
        </div>
      </div>
    </div>
  );
}
