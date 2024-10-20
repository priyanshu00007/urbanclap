"use client"
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate } from 'react-router-dom'
import { Button } from "@/components/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Swords, User, Menu, X, ChevronRight, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"


// Mock data (unchanged)
const courses = [
  {
  id: 1,
  title: "Fundamentals of Self-Defense",
  subtitle: "Learn the basics of personal protection",
  image: "red-crossed-swords-hi.png",
  category: "Self-Defense",
  tags: ["Beginner", "Essential"]
},
{
  id: 2,
  title: "Advanced Striking Techniques",
  subtitle: "Master powerful and effective strikes",
  image: "red-crossed-swords-hi.png",
  category: "Striking",
  tags: ["Advanced", "Offensive"]
},{ id: 3, title: "Grappling and Ground Defense", subtitle: "Defend yourself on the ground", image: "red-crossed-swords-hi.png", category: "Grappling", tags: ["Intermediate", "Defensive"] },
  { id: 4, title: "Krav Maga Basics", subtitle: "Introduction to Israeli self-defense system", image: "red-crossed-swords-hi.png", category: "Self-Defense", tags: ["Beginner", "Practical"] },
  { id: 5, title: "Brazilian Jiu-Jitsu Fundamentals", subtitle: "Learn the art of ground fighting", image: "red-crossed-swords-hi.png", category: "Grappling", tags: ["Beginner", "Technique"] },
  { id: 6, title: "Muay Thai for Beginners", subtitle: "Start your journey in the art of eight limbs", image: "red-crossed-swords-hi.png", category: "Striking", tags: ["Beginner", "Conditioning"] },
  {
    id: 7,
    title: "Wrestling for Martial Arts",
    subtitle: "Improve your takedown skills",
    image: "red-crossed-swords-hi.png",
    category: "Grappling",
    tags: ["Intermediate", "Takedowns"]
  },
  {
    id: 8,
    title: "Defensive Tactics for Women",
    subtitle: "Empower yourself with self-defense skills",
    image: "red-crossed-swords-hi.png",
    category: "Self-Defense",
    tags: ["Beginner", "Women's Self-Defense"]
  },
  {
    id: 9,
    title: "Judo Throws and Takedowns",
    subtitle: "Master the art of throwing and taking down opponents",
    image: "red-crossed-swords-hi.png",
    category: "Grappling",
    tags: ["Intermediate", "Throwing"]
  },
  // {
  //   id: 10,
  //   title: "Boxing Fundamentals",
  //   subtitle: "Learn the basics of boxing technique",
  //   image: "red-crossed-swords-hi.png",
  //   category: "Striking",
  //   tags: ["Beginner", "Boxing"]
  // },
  // {
  //   id: 11,
  //   title: "Advanced Submission Holds",
  //   subtitle: "Master the art of submission grappling",
  //   image: "red-crossed-swords-hi.png",
  //   category: "Grappling",
  //   tags: ["Advanced", "Submissions"]
  // },
  // {
  //   id: 12,
  //   title: "Street Smarts and Awareness",
  //   subtitle: "Stay safe in everyday situations",
  //   image: "red-crossed-swords-hi.png",
  //   category: "Self-Defense",
  //   tags: ["Beginner", "Awareness"]
  // },
  // {
  //   id: 13,
  //   title: "Taekwondo Patterns and Forms",
  //   subtitle: "Improve your technique and focus",
  //   image: "red-crossed-swords-hi.png",
  //   category: "Striking",
  //   tags: ["Intermediate", "Forms"]
  // },
  // {
  //   id: 14,
  //   title: "Ground and Pound Techniques",
  //   subtitle: "Dominate your opponent on the ground",
  //   image: "red-crossed-swords-hi.png",
  //   category: "Grappling",
  //   tags: ["Intermediate", "Ground and Pound"]
  // },
  // {
  //   id: 15,
  //   title: "Aikido Principles and Techniques",
  //   subtitle: "Learn the art of harmonizing energy",
  //   image: "red-crossed-swords-hi.png",
  //   category: "Grappling",
  //   tags: ["Beginner", "Aikido"]
  // },
  // {
  //   id: 16,
  //   title: "Kickboxing Fitness and Conditioning",
  //   subtitle: "Improve cardiovascular endurance and technique",
  //   image: "red-crossed-swords-hi.png",
  //   category: "Striking",
  //   tags: ["Beginner", "Fitness"]
  // },
  // {
  //   id: 17,
  //   title: "Jeet Kune Do Concepts and Techniques",
  //   subtitle: "Learn Bruce Lee's hybrid martial art",
  //   image: "red-crossed-swords-hi.png",
  //   category: "Striking",
  //   tags: ["Intermediate", "Jeet Kune Do"]
  // },
  // {
  //   id: 18,
  //   title: "Martial Arts Philosophy and History",
  //   subtitle: "Explore the roots and principles of martial arts",
  //   image: "red-crossed-swords-hi.png",
  //   category: "Theory",
  //   tags: ["Beginner", "History"]
  // },
  // {
  //   id: 19,
  //   title: "Kali and Eskrima Stick Fighting",
  //   subtitle: "Learn Filipino martial arts stick fighting",
  //   image: "red-crossed-swords-hi.png",
  //   category: "Grappling",
  //   tags: ["Intermediate", "Stick Fighting"]
  // },
  // {
  //   id: 20,
  //   title: "Martial Arts for Children",
  //   subtitle: "Develop discipline and focus in young practitioners",
  //   image: "red-crossed-swords-hi.png",
  //   category: "Self-Defense",
  //   tags: ["Beginner", "Kids"]
  // },
  // {
  //   id: 21,
  //   title: "Capoeira Fundamentals",
  //   subtitle: "Learn Brazilian dance-martial art",
  //   image: "red-crossed-swords-hi.png",
  //   category: "Striking",
  //   tags: ["Beginner", "Capoeira"]
  // },
  // {
  //   id: 22,
  //   title: "Ninjutsu Fundamentals",
  //   subtitle: "Explore Japanese ninja martial art",
  //   image: "red-crossed-swords-hi.png",
  //   category: "Grappling",
  //   tags: ["Beginner", "Ninjutsu"]
  //   },
  // {
  //   id: 23,
  //   title: "Sambo Submission Holds",
  //   subtitle: "Master Russian martial art submissions",
  //   image: "red-crossed-swords-hi.png",
  //   category: "Grappling",
  //   tags: ["Intermediate", "Submissions"]
  // },
  // {
  //   id: 24,
  //   title: "Kyokushin Karate",
  //   subtitle: "Learn full-contact karate techniques",
  //   image: "red-crossed-swords-hi.png",
  //   category: "Striking",
  //   tags: ["Intermediate", "Knockdown"]
  // },
  // {
  //   id: 25,
  //   title: "Aikijujitsu Techniques",
  //   subtitle: "Learn Japanese grappling and throwing",
  //   image: "red-crossed-swords-hi.png",
  //   category: "Grappling",
  //   tags: ["Intermediate", "Throwing"]
  // },
  // {
  //   id: 26,
  //   title: "Martial Arts Conditioning",
  //   subtitle: "Improve endurance, strength, and flexibility",
  //   image: "red-crossed-swords-hi.png",
  //   category: "Fitness",
  //   tags: ["Beginner", "Conditioning"]
  // },
  // {
  //   id: 27,
  //   title: "Kendo Fundamentals",
  //   subtitle: "Learn Japanese fencing techniques",
  //   image: "red-crossed-swords-hi.png",
  //   category: "Striking",
  //   tags: ["Beginner", "Kendo"]
  // },
  // {
  //   id: 28,
  //   title: "Jujutsu Ground Fighting",
  //   subtitle: "Master Japanese grappling techniques",
  //   image: "red-crossed-swords-hi.png",
  //   category: "Grappling",
  //   tags: ["Intermediate", "Ground Fighting"]
  // },
  // {
  //   id: 29,
  //   title: "Martial Arts for Self-Discovery",
  //   subtitle: "Explore mindfulness and personal growth",
  //   image: "red-crossed-swords-hi.png",
  //   category: "Theory",
  //   tags: ["Beginner", "Mindfulness"]
  // },
  // {
  //   id: 30,
  //   title: "Historical European Martial Arts",
  //   subtitle: "Learn medieval and Renaissance combat",
  //   image: "red-crossed-swords-hi.png",
  //   category: "Grappling",
  //   tags: ["Intermediate", "HEMA"]
  // }
];


const techniques = [
  {
    id: 1,
    title: "Front Kick",
    description: "A basic yet effective striking technique",
    image: "https://tse3.mm.bing.net/th/id/OIP.kgtzqsl6Ex9tW6a5XhR8SQHaFj?rs=1&pid=ImgDetMain/200/300", // Online image URL
    steps: [
      "Stand in a fighting stance",
      "Lift your knee to your chest",
      "Extend your leg, striking with the ball of your foot",
      "Retract quickly"
    ],
    practiceRegimen: "20 repetitions per leg, daily",
    masteryTime: 30
  },
  {
    id: 2,
    title: "Wrist Escape",
    description: "Learn how to break free from a wrist grab",
    steps: [
      "Rotate your grabbed wrist towards the attacker's thumb",
      "Step towards the attacker",
      "Pull your arm towards your opposite shoulder",
      "Use your free hand to strike if necessary"
    ],
    practiceRegimen: "15 repetitions per hand, daily",
    masteryTime: 14
  },
  {
    id: 3,
    title: "Roundhouse Kick",
    description: "A powerful kick targeting the head or torso",
    steps: [
      "Rotate your hips and generate power",
      "Lift your leg, keeping it straight",
      "Strike with the instep of your foot",
      "Retract quickly"
    ],
    practiceRegimen: "15 repetitions per leg, daily",
    masteryTime: 21
  },
  {
    id: 4,
    title: "Elbow Strike",
    description: "A close-range striking technique",
    steps: [
      "Position your body for optimal striking",
      "Chamber your elbow",
      "Strike with the point of your elbow",
      "Follow through"
    ],
    practiceRegimen: "10 repetitions per arm, daily",
    masteryTime: 18
  },
  {
    id: 5,
    title: "Rear Naked Choke",
    description: "A grappling technique for submissions",
    steps: [
      "Take the back of your opponent",
      "Secure the chokehold",
      "Apply pressure",
      "Finish the submission"
    ],
    practiceRegimen: "5 repetitions per side, daily",
    masteryTime: 28
  },
  {
    id: 6,
    title: "Armbar",
    description: "A grappling technique for submissions",
    steps: [
      "Control the opponent's arm",
      "Transition to the armbar position",
      "Apply pressure",
      "Finish the submission"
    ],
    practiceRegimen: "5 repetitions per side, daily",
    masteryTime: 32
  },
  {
    id: 7,
    title: "Side Kick",
    description: "A powerful kick targeting the head or torso",
    steps: [
      "Stand in a fighting stance",
      "Lift your leg, keeping it straight",
      "Strike with the side of your foot",
      "Retract quickly"
    ],
    practiceRegimen: "15 repetitions per leg, daily",
    masteryTime: 20
  },
  {
    id: 8,
    title: "Shoulder Roll",
    description: "A defensive technique to avoid strikes",
    steps: [
      "Rotate your shoulders",
      "Shift your weight",
      "Avoid the strike",
      "Counterattack"
    ],
    practiceRegimen: "10 repetitions per side, daily",
    masteryTime: 16
  },
  {
    id: 9,
    title: "Single-Leg Takedown",
    description: "A wrestling takedown technique",
    steps: [
      "Control the opponent's leg",
      "Drive through with your legs",
      "Take the opponent down",
      "Establish dominance"
    ],
    practiceRegimen: "5 repetitions per side, daily",
    masteryTime: 25
  },
  {
    id: 10,
    title: "Guillotine Choke",
    description: "A submission technique",
    steps: [
      "Secure the chokehold",
      "Apply pressure",
      "Finish the submission"
    ],
    practiceRegimen: "5 repetitions per side, daily",
    masteryTime: 22
  },
  {
    id: 11,
    title: "High Kick",
    description: "A kick targeting the head",
    steps: [
      "Stand in a fighting stance",
      "Lift your leg, keeping it straight",
      "Strike with the instep of your foot",
      "Retract quickly"
    ],
    practiceRegimen: "10 repetitions per leg, daily",
    masteryTime: 19
  },
  {
    id: 12,
    title: "Double-Leg Takedown",
    description: "A wrestling takedown technique",
    steps: [
      "Control the opponent's legs",
      "Drive through with your legs",
      "Take the opponent down",
      "Establish dominance"
    ],
    practiceRegimen: "10 repetitions per leg, daily",
    masteryTime: 19
  },  {
    id: 13,
    title: "Kimura Lock",
    description: "A submission technique",
    steps: [
      "Control the opponent's arm",
      "Apply pressure to the shoulder",
      "Finish the submission"
    ],
    practiceRegimen: "5 repetitions per side, daily",
    masteryTime: 26
  },
  {
    id: 14,
    title: "Headlock Escape",
    description: "A defensive technique to escape headlocks",
    steps: [
      "Position your body for optimal escape",
      "Use your arms to create space",
      "Escape the headlock",
      "Counterattack"
    ],
    practiceRegimen: "5 repetitions per side, daily",
    masteryTime: 24
  },
  {
    id: 15,
    title: "Spinning Back Kick",
    description: "A powerful kick targeting the head or torso",
    steps: [
      "Rotate your body",
      "Lift your leg, keeping it straight",
      "Strike with the instep of your foot",
      "Retract quickly"
    ],
    practiceRegimen: "10 repetitions per leg, daily",
    masteryTime: 23
  },
  {
    id: 16,
    title: "Triangle Choke",
    description: "A submission technique",
    steps: [
      "Secure the chokehold",
      "Apply pressure",
      "Finish the submission"
    ],
    practiceRegimen: "5 repetitions per side, daily",
    masteryTime: 29
  },
  {
    id: 17,
    title: "Single-Arm Shoulder Throw",
    description: "A throwing technique",
    steps: [
      "Control the opponent's arm",
      "Generate power",
      "Throw the opponent",
      "Establish dominance"
    ],
    practiceRegimen: "5 repetitions per side, daily",
    masteryTime: 27
  },
  {
    id: 18,
    title: "Double Underhook Throw",
    description: "A throwing technique",
    steps: [
      "Control the opponent's arms",
      "Generate power",
      "Throw the opponent",
      "Establish dominance"
    ],
    practiceRegimen: "5 repetitions per side, daily",
    masteryTime: 31
  },
  {
    id: 19,
    title: "Heel Hook Kick",
    description: "A kick targeting the head or torso",
    steps: [
      "Stand in a fighting stance",
      "Lift your leg, keeping it straight",
      "Strike with the heel of your foot",
      "Retract quickly"
    ],
    practiceRegimen: "10 repetitions per leg, daily",
    masteryTime: 20
  },
  {
    id: 20,
    title: "Omoplata Shoulder Lock",
    description: "A submission technique",
    steps: [
      "Control the opponent's arm",
      "Apply pressure to the shoulder",
      "Finish the submission"
    ],
    practiceRegimen: "5 repetitions per side, daily",
    masteryTime: 30
  },
  {
    id: 21,
    title: "Ankle Lock",
    description: "A submission technique",
    steps: [
      "Control the opponent's ankle",
      "Apply pressure",
      "Finish the submission"
    ],
    practiceRegimen: "5 repetitions per side, daily",
    masteryTime: 22
  },
  {
    id: 22,
    title: "Knee Bar",
    description: "A submission technique",
    steps: [
      "Control the opponent's knee",
      "Apply pressure",
      "Finish the submission"
    ],
    practiceRegimen: "5 repetitions per side, daily",
    masteryTime: 25
  },
  {
    id: 23,
    title: "Shoulder Roll Escape",
    description: "A defensive technique",
    steps: [
      "Rotate your shoulders",
      "Shift your weight",
      "Escape the hold"
    ],
    practiceRegimen: "10 repetitions per side, daily",
    masteryTime: 18
  },
  {
    id: 24,
    title: "Heel Hook Takedown",
    description: "A wrestling takedown technique",
    steps: [
      "Control the opponent's leg",
      "Drive through with your legs",
      "Take the opponent down"
    ],
    practiceRegimen: "10 repetitions per leg, daily",
    masteryTime: 21
  },
  {
    id: 25,
    title: "Arm Triangle Choke",
    description: "A submission technique",
    steps: [
      "Secure the chokehold",
      "Apply pressure",
      "Finish the submission"
    ],
    practiceRegimen: "5 repetitions per side, daily",
    masteryTime: 28
  },
  {
    id: 26,
    title: "Side Control Escape",
    description: "A defensive technique",
    steps: [
      "Position your body",
      "Use your arms to create space",
      "Escape the hold"
    ],
    practiceRegimen: "10 repetitions per side, daily",
    masteryTime: 20
  },
  {
    id: 27,
    title: "Kimura Counter",
    description: "A counterattack technique",
    steps: [
      "Defend against the kimura",
      "Counter with a submission"
    ],
    practiceRegimen: "5 repetitions per side, daily",
    masteryTime: 24
  },
  {
    id: 28,
    title: "Single-Leg Defense",
    description: "A defensive technique",
    steps: [
      "Defend against the single-leg takedown",
      "Counter with a submission"
    ],
    practiceRegimen: "10 repetitions per side, daily",
    masteryTime: 23
  },
  {
    id: 29,
    title: "Double Underhook Defense",
    description: "A defensive technique",
    steps: [
      "Defend against the double underhook",
      "Counter with a submission"
    ],
    practiceRegimen: "10 repetitions per side, daily",
    masteryTime: 26
  },
  {
    id: 30,
    title: "Rear Naked Choke Defense",
    description: "A defensive technique",
    steps: [
      "Defend against the rear naked choke",
      "Counter with a submission"
    ],
    practiceRegimen: "5 repetitions per side, daily",
    masteryTime: 29
  },
  {
    id: 31,
    title: "Spinning Back Fist",
    description: "A striking technique",
    steps: [
      "Rotate your body",
      "Strike with the back of your fist"
    ],
    practiceRegimen: "10 repetitions per side, daily",
    masteryTime: 19
  },
  {
    id: 32,
    title: "High Kick Defense",
    description: "A defensive technique",
    steps: [
      "Defend against the high kick",
      "Counter with a submission"
    ],
    practiceRegimen: "10 repetitions per side, daily",
    masteryTime: 22
  },
  {
    id: 33,
    title: "Armbar Counter",
    description: "A counterattack technique",
    steps: [
      "Defend against the armbar",
      "Counter with a submission"
    ],
    practiceRegimen: "5 repetitions per side, daily",
    masteryTime: 25
  },
  {
    id: 34,
    title: "Shoulder Lock Defense",
    description: "A defensive technique",
    steps: [
      "Defend against the shoulder lock",
      "Counter with a submission"
    ],
    practiceRegimen: "10 repetitions per side, daily",
    masteryTime: 24
  },
  {
    id: 36,
    title: "Elbow Escape",
    description: "A defensive technique",
    steps: [
      "Defend against the elbow lock",
      "Escape the hold"
    ],
    practiceRegimen: "10 repetitions per side, daily",
    masteryTime: 20
  },
  {
    id: 37,
    title: "Wrist Lock",
    description: "A submission technique",
    steps: [
      "Control the opponent's wrist",
      "Apply pressure",
      "Finish the submission"
    ],
    practiceRegimen: "5 repetitions per side, daily",
    masteryTime: 23
  },
  {
    id: 38,
    title: "Ankle Pick",
    description: "A wrestling takedown technique",
    steps: [
      "Control the opponent's ankle",
      "Drive through with your legs",
      "Take the opponent down"
    ],
    practiceRegimen: "10 repetitions per leg, daily",
    masteryTime: 21
  },
  {
    id: 39,
    title: "Side Control Transition",
    description: "A transitional technique",
    steps: [
      "Transition from standing to side control",
      "Establish dominance"
    ],
    practiceRegimen: "10 repetitions per side, daily",
    masteryTime: 22
  },
  {
    id: 40,
    title: "North-South Choke",
    description: "A submission technique",
    steps: [
      "Secure the chokehold",
      "Apply pressure",
      "Finish the submission"
    ],
    practiceRegimen: "5 repetitions per side, daily",
    masteryTime: 26
  }
];

const communities = [
  { id: 1, name: "Beginner's Circle", members: 1500 },
  { id: 2, name: "Advanced Practitioners", members: 750 },
  { id: 3, name: "Martial Arts Enthusiasts", members: 2000 },
  { id: 4, name: "Self-Defense Squad", members: 1000 },
  { id: 5, name: "Fitness Fighters", members: 1200 },
  { id: 6, name: "Spiritual Warriors", members: 800 },
  { id: 7, name: "Combat Sports Club", members: 1800 },
  { id: 8, name: "Discipline and Focus", members: 900 },
  { id: 9, name: "Mindful Martial Artists", members: 1100 },
  { id: 10, name: "The Dojo", members: 2200 },
  { id: 11, name: "Eastern Arts Collective", members: 1500 },
  { id: 12, name: "Western Martial Arts Alliance", members: 1000 },
  { id: 13, name: "Martial Arts Masters", members: 500 },
  { id: 14, name: "Young Warriors", members: 1800 },
  { id: 15, name: "Women's Self-Defense Network", members: 1200 },
  { id: 16, name: "Senior's Martial Arts Group", members: 800 },
  { id: 17, name: "Special Forces Training", members: 400 },
  { id: 18, name: "Law Enforcement Training", members: 1000 },
  { id: 19, name: "Martial Arts Instructors", members: 600 },
  { id: 20, name: "World Martial Arts Federation", members: 3000 }
];

const categories = ["All", "Self-Defense", "Striking", "Grappling"]

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleAuthAction = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false)
    } else {
      navigate('/login')
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <motion.header 
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black shadow-lg' : 'bg-transparent'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center justify-center">
          <Swords className="h-8 w-8 mr-2 text-red-600" />
          <span className={`text-xl font-bold ${scrolled ? 'text-white' : 'text-black'}`}>Martial Arts Academy</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <NavLinks scrolled={scrolled} />
        </nav>
        <div className="hidden md:block">
          <Button onClick={handleAuthAction} variant="outline" className={`${scrolled ? 'bg-red-600 text-white' : 'bg-white text-red-600'} hover:bg-opacity-90`}>
            {isLoggedIn ? 'Log out' : 'Log in'}
          </Button>
        </div>
        <button className={`md:hidden ${scrolled ? 'text-white' : 'text-black'}`} onClick={toggleMenu}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="absolute top-full left-0 right-0 bg-black z-50 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center py-4">
              <NavLinks mobile onClick={toggleMenu} />
              <Button onClick={() => { handleAuthAction(); toggleMenu(); }} variant="outline" className="bg-red-600 text-white hover:bg-opacity-90 mt-4">
                {isLoggedIn ? 'Log out' : 'Log in'}
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function NavLinks({ mobile = false, scrolled = false, onClick = () => {} }) {
  const linkClass = mobile
    ? "text-white text-lg hover:text-red-500 transition-colors py-2"
    : `text-sm font-medium hover:text-red-500 transition-colors ${scrolled ? 'text-white' : 'text-black'}`

  return (
    <>
      <Link className={linkClass} to="/" onClick={onClick}>Home</Link>
      <Link className={linkClass} to="/courses" onClick={onClick}>Courses</Link>
      <Link className={linkClass} to="/techniques" onClick={onClick}>Techniques</Link>
      <Link className={linkClass} to="/communities" onClick={onClick}>Community</Link>
      <Link className={linkClass} to="/about" onClick={onClick}>About</Link>
    </>
  )
}

function HomePage() {
  return (
    <div className="bg-white">
      <HeroSection />
      <FeaturedCourses />
      <WhyChooseUs />
      <CallToAction />
    </div>
  )
}


function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-cover bg-center  bg-red-600" style={{backgroundImage: 'url("/placeholder.svg?height=1080&width=1920")'}}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <motion.div 
        className="relative text-center text-white z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Master the Art of Self-Defense</h1>
        <p className="text-xl md:text-2xl mb-8">Empower yourself with skills that last a lifetime</p>
        <Link to="/techniques"/>
          <Button
            size="lg" 
            className="bg-white text-red-600 hover:bg-gray-100"
          >
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
      </motion.div>
    </section>
  )
}


function FeaturedCourses() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="h-full flex flex-col bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="p-0">
                  <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                </CardHeader>
                <CardContent className="flex-grow p-6">
                  <CardTitle className="text-xl mb-2 text-red-600">{course.title}</CardTitle>
                  <p className="text-gray-600">{course.subtitle}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button variant="outline" className="w-full bg-red-600 text-white hover:bg-red-700">
                    Learn More
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyChooseUs() {
  const features = [
    { title: "Expert Instructors", description: "Learn from experienced martial artists and self-defense experts.", icon: User },
    { title: "Comprehensive Curriculum", description: "From beginner to advanced, our courses cover all aspects of martial arts.", icon: Swords },
    { title: "Supportive Community", description: "Join a community of like-minded individuals on your martial arts journey.", icon: User },
  ]

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="h-full bg-gray-800 border-none">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-red-500 mx-auto" />
                  <CardTitle className="text-xl text-center">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-center">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
function CallToAction() {
  return (
    <section className="py-20 bg-red-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Start Your Journey Today</h2>
        <p className="text-xl mb-8">Join thousands of students learning martial arts online</p>
        <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
          Explore Courses
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  )
}
function CoursesPage() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredCourses = activeCategory === "All" 
    ? courses 
    : courses.filter(course => course.category === activeCategory)

  return (
    <div className="bg-gray-100 pt-20">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-red-600">Our Courses</h1>
        
        <Tabs defaultValue="All" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                onClick={() => setActiveCategory(category)}
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="p-0">
                  <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                </CardHeader>
                <CardContent className="flex-grow p-6">
                  <CardTitle className="text-xl mb-2 text-red-600">{course.title}</CardTitle>
                  <p className="text-gray-600 mb-4">{course.subtitle}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-gray-200 text-gray-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button onClick={() => navigate(`/courses/${course.id}`)} className="w-full bg-red-600 text-white hover:bg-red-700">
                    Learn More
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* <h2 className="text-3xl font-bold mb-8 text-center">Pricing Plans</h2> */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Basic', 'Premium', 'Elite'].map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl text-center text-red-600">{plan} Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside mb-6 text-gray-600">
                    <li>Access to {index === 0 ? 'beginner' : 'all'} courses</li>
                    <li>{index === 0 ? 'Basic' : 'Full'} technique library</li>
                    <li>Community forum access</li>
                    {index > 0 && <li>Live Q&A sessions</li>}
                    {index > 1 && <li>1-on-1 virtual coaching</li>}
                  </ul>
                  <p className="text-3xl font-bold text-center mb-6 text-red-600">${(index + 1) * 9.99}/month</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-red-600 text-white hover:bg-red-700">Choose {plan}</Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div> */}
      </div>
    </div>
  )
}
function CourseDetailPage() {
  const { id } = useParams()
  const course = courses.find(c => c.id === parseInt(id))

  if (!course) return <div className="container mx-auto px-4 py-20 text-center">Course not found</div>

  return (
    <div className="bg-gray-100 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center text-red-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {course.title}
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-auto rounded-lg shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-xl mb-6 text-gray-600">{course.subtitle}</p>
            <Card className="bg-white shadow-lg mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-red-600">Course Modules</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Introduction to the course</li>
                  <li>Basic techniques and stances</li>
                  <li>Advanced combinations</li>
                  <li>Practical applications</li>
                  <li>Final assessment</li>
                </ul>
              </CardContent>
            </Card>
            <Button size="lg" className="w-full bg-red-600 text-white hover:bg-red-700">
              Enroll Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function TechniquesPage( ) {
  const navigate = useNavigate()

  return (
    <div className="bg-gray-100 pt-20">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12 text-center text-red-600">Self-Defense Techniques</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techniques.map((technique, index) => (
            <motion.div
              key={technique.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-red-600">{technique.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600">{technique.description}</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => navigate(`/technique/${technique.id}`)} className="w-full bg-red-600 text-white hover:bg-red-700">
                    Learn More
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TechniqueDetailPage() {
  const { id } = useParams()
  const technique = techniques.find(t => t.id === parseInt(id))

  if (!technique) return <div className="container mx-auto px-4 py-20 text-center">Technique not found</div>

  return (
    <div className="bg-gray-100 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center text-red-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {technique.title}
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.img 
          src={technique.image} 
          alt={technique.title} 
          className="w-full h-auto rounded-lg shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-xl mb-6 text-gray-600">{technique.description}</p>
            <Card className="bg-white shadow-lg mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-red-600">How to Perform</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  {technique.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-red-600">Practice Regimen</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                <p className="mb-2">Recommended practice: {technique.practiceRegimen}</p>
                <p>Estimated mastery time: {technique.masteryTime} days</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function CommunitiesPage() {
  const [joinedCommunities, setJoinedCommunities] = useState([])

  const toggleJoin = (communityId) => {
    if (joinedCommunities.includes(communityId)) {
      setJoinedCommunities(joinedCommunities.filter(id => id !== communityId))
    } else {
      setJoinedCommunities([...joinedCommunities, communityId])
    }
  }

  return (
    <div className="bg-gray-100 pt-20">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12 text-center text-red-600">Our Communities</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {communities.map((community, index) => (
            <motion.div
              key={community.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-red-600">{community.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600 mb-4">{community.members} members</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => toggleJoin(community.id)}
                    className={`w-full ${joinedCommunities.includes(community.id) ? 'bg-gray-600' : 'bg-red-600'} text-white hover:bg-opacity-90`}
                  >
                    {joinedCommunities.includes(community.id) ? 'Leave Community' : 'Join Community'}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AboutPage() {
  return (
    <div className="bg-gray-100 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center text-red-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Us
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white shadow-lg">
            <CardContent className="prose max-w-none p-6 text-gray-600">
              <p>Welcome to Martial Arts Academy, your premier online destination for learning self-defense and martial arts. Our mission is to empower individuals with the knowledge and skills to protect themselves and others, while promoting physical fitness, mental discipline, and personal growth.</p>
              <p>Founded by a team of experienced martial artists and self-defense experts, our academy offers a comprehensive curriculum that caters to beginners and advanced practitioners alike. We believe that everyone should have access to high-quality martial arts instruction, regardless of their location or schedule.</p>
              <h2 className="text-2xl font-semibold mb-4 text-red-600">Our Approach</h2>
              <p>Through our innovative online platform, we provide:</p>
              <ul className="list-disc list-inside mb-6">
                <li>Structured courses covering various martial arts disciplines and self-defense techniques</li>
                <li>Interactive video lessons with detailed explanations and demonstrations</li>
                <li>Progress tracking and personalized feedback to help you improve</li>
                <li>A supportive community of fellow learners and instructors</li>
              </ul>
              <p>Join us on this exciting journey of self-discovery and empowerment. Whether you're looking to learn practical self-defense skills, explore the rich traditions of martial arts, or simply improve your fitness and confidence, Martial Arts Academy is here to guide you every step of the way.</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

function LoginPage({ setIsLoggedIn }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    // Here you would typically validate the credentials with a backend service
    // For this example, we'll just set isLoggedIn to true
    setIsLoggedIn(true)
    navigate('/')
  }

  return (
    <div className="bg-gray-100 min-h-screen pt-20 flex items-center justify-center">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-red-600">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full mt-1"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full mt-1"
                />
              </div>
              <Button type="submit" className="w-full bg-red-600 text-white hover:bg-red-700">
                Log in
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<CourseDetailPage />} />
            <Route path="/techniques" element={<TechniquesPage />} />
            <Route path="/technique/:id" element={<TechniqueDetailPage />} />
            <Route path="/communities" element={<CommunitiesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          </Routes>
        </main>
        <footer className="bg-black text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p>© 2024 Martial Arts Academy. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}