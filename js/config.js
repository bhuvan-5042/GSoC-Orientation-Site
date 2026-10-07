// config.js - All editable content for the GSoC Orientation Event website
const CONFIG = {
    // Event details
    event: {
        title: "Google Summer of Code (GSoC) Orientation Event",
        host: "Geethanjali College of Engineering and Technology",
        date: "09-10-2026", // DD-MM-YYYY
        time: "1:30 P.M. to 3:20 P.M. IST",
        venue: "Block 5 Seminar Hall", // Editable; if set, show the venue, else show a TBA badge
        audience: "All students and faculty members",
        whatToExpect: "Experienced speakers and past GSoC contributors sharing valuable insights, proposal-writing strategies, and open-source guidance for the college community.",
        callToAction: "All students are encouraged to attend and participate. For further updates, scan the QR code. All departments are requested to extend their cooperation and support for the smooth conduct of the event."
    },
    // Navbar links
    navLinks: [
        { id: "about", text: "About", href: "#about" },
        { id: "why", text: "Why GSoC", href: "#why" },
        { id: "agenda", text: "Agenda", href: "#agenda" },
        { id: "speakers", text: "Speakers", href: "#speakers" },
        { id: "details", text: "Details", href: "#details" }
    ],
    // Hero section
    hero: {
        headline: "GSoC Orientation",
        tagline: "Code. Contribute. Create. Your open-source journey starts here.",
        // The date, time, venue chips will be generated from event object
        cta1: { text: "Add to Calendar", id: "add-to-calendar" }
    },
    // About section
    about: {
        title: "About the Event",
        content: "This orientation event introduces students to Google Summer of Code, a global program that offers stipends to contributors who successfully complete open-source projects. Learn how to get started, write a winning proposal, and connect with mentors from around the world."
    },
    // Why GSoC section
    whyGsoc: {
        title: "Why GSoC?",
        cards: [
            {
                id: "orgs",
                title: "Real Open-Source Organizations",
                description: "Contribute to projects used by millions worldwide.",
                icon: "" // We'll use inline SVG in HTML, but we can store a key or the SVG string
            },
            {
                id: "mentors",
                title: "Global Mentors",
                description: "Learn from experienced developers and industry leaders.",
                icon: ""
            },
            {
                id: "stipend",
                title: "Google Stipend",
                description: "Earn while you learn and contribute to open source.",
                icon: ""
            },
            {
                id: "resume",
                title: "Resume & Portfolio Boost",
                description: "Showcase your contributions to top tech companies.",
                icon: ""
            },
            {
                id: "community",
                title: "Worldwide Developer Community",
                description: "Join a network of passionate contributors across the globe.",
                icon: ""
            },
            {
                id: "proposal",
                title: "Proposal-Writing Skills",
                description: "Master the art of writing compelling project proposals.",
                icon: ""
            }
        ]
    },
    // GSoC Journey timeline (horizontal)
    journey: {
        title: "Your GSoC Journey",
        steps: [
            { label: "Explore Orgs", description: "Find open-source organizations that match your interests." },
            { label: "Make Contributions", description: "Start with small contributions to understand the project." },
            { label: "Write Proposal", description: "Craft a detailed project plan for your summer of code." },
            { label: "Get Selected", description: "Work with mentors to refine your proposal and get accepted." },
            { label: "Code with Mentor", description: "Bring your project to life with guidance from experienced contributors." },
            { label: "Finish & Grow", description: "Complete your project and continue contributing to open source." }
        ]
    },
    // Event agenda (vertical timeline)
    agenda: {
        title: "Event Agenda (Tentative)",
        time: "1:30 P.M. to 3:20 P.M. IST",
        items: [
            { time: "1:30 PM", label: "Welcome & Introduction", description: "Opening remarks and event overview." },
            { time: "1:40 PM", label: "What is GSoC & How It Works", description: "Understand the program structure, timelines, and benefits." },
            { time: "2:00 PM", label: "Talks by Past GSoC Contributors", description: "Hear firsthand experiences and tips from previous participants." },
            { time: "2:20 PM", label: "Proposal-Writing Strategies", description: "Learn how to write a winning project proposal." },
            { time: "2:40 PM", label: "Open-Source Guidance", description: "Best practices for contributing to open-source projects." },
            { time: "3:00 PM", label: "Q&A", description: "Ask questions and get clarifications from mentors and organizers." }
        ]
    },
    // Speakers
    speakers: {
        title: "Meet the Speakers",
        list: [
            {
                name: "Speaker One",
                initials: "SO",
                role: "Past GSoC Contributor",
                social: { twitter: "#", linkedin: "#", github: "#" }
            },
            {
                name: "Speaker Two",
                initials: "ST",
                role: "Past GSoC Contributor",
                social: { twitter: "#", linkedin: "#", github: "#" }
            },
            {
                name: "Speaker Three",
                initials: "SR",
                role: "Past GSoC Contributor",
                social: { twitter: "#", linkedin: "#", github: "#" }
            }
        ]
    },
    // Open-source tools marquee (list of tool names for infinite scroll)
    toolsMarquee: [
        "Git", "GitHub", "Linux", "Python", "JavaScript", "Rust", "C++", "Docker", "Open Source"
    ],
    // Event details section
    details: {
        title: "Event Details",
        // These will be pulled from event object but we can duplicate for clarity
        date: "09-10-2026",
        time: "1:30 P.M. to 3:20 P.M. IST",
        venue: "Block 5 Seminar Hall",
        audience: "All students and faculty members"
    },
    // Footer
    footer: {
        college: "Geethanjali College of Engineering and Technology",
        message: "All departments are requested to extend their cooperation and support for the smooth conduct of the event.",
        quickLinks: [
            { text: "Privacy Policy", href: "#" },
            { text: "Terms of Use", href: "#" },
            { text: "Contact Us", href: "#" }
        ],
        copyright: `© ${new Date().getFullYear()} Geethanjali College. All rights reserved.`
    }
};

// Make CONFIG available globally (for use in other scripts)
window.CONFIG = CONFIG;