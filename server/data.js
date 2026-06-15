// Single source of truth for all site content.
// Used to seed the database and served back through the REST API.

export const profile = {
  name: 'Khaled Hasan',
  title: 'Lecturer, CSE, MIST | Researcher in Human-Centered Trustworthy Agentic AI',
  tagline:
    'I build AI that people can understand, question, and trust. My work sits where machine learning meets the humans who actually use it.',
  researchIdentity: 'Human-Centered Trustworthy Agentic AI',
  email: 'khaled@cse.mist.ac.bd',
  personalEmail: 'khaledirfan7@gmail.com',
  phone: '+880-1622-156330',
  location: 'Wari, Dhaka-1203, Bangladesh',
  links: {
    github: '#',
    scholar: '#',
    linkedin: '#'
  }
};

export const researchAreas = [
  'Machine Learning',
  'Deep Learning',
  'LLMs',
  'Trustworthy AI',
  'Explainable AI (XAI)',
  'Secure AI',
  'Agentic AI',
  'HCI / HAI',
  'Computer Vision'
];

export const publications = [
  {
    title:
      'Adaptive User Interface for Mobile Banking Apps: Enhancing UX Through Machine Learning',
    venue: 'Elsevier Array',
    year: 2026,
    doi: '10.1016/j.array.2026.100901',
    status: 'Published',
    tags: ['Machine Learning', 'HCI']
  },
  {
    title:
      'From Keywords to Context: SBERT vs. Keyword ML for Job Recommendation',
    venue: 'IEEE ICCIT',
    year: 2025,
    doi: null,
    status: 'Accepted',
    tags: ['LLMs', 'Recommendation']
  },
  {
    title:
      'Assessing Usability of Agricultural Mobile Apps for Illiterate and Semi-literate Farmers',
    venue: 'IEEE ICCIT',
    year: 2025,
    doi: null,
    status: 'Accepted',
    tags: ['HCI', 'Usability']
  },
  {
    title: 'Web3 vs. Web2 UX: A Comparative Study',
    venue: 'Springer HCI-E',
    year: 2025,
    doi: null,
    status: 'Accepted',
    tags: ['HCI', 'Web3']
  },
  {
    title: 'Light Canvas',
    venue: 'ACM ICCA',
    year: 2024,
    doi: null,
    status: 'Published',
    tags: ['HCI', 'Interaction']
  },
  {
    title: 'Anchor Eye: A Computer Vision System for Pisciculture',
    venue: 'In progress',
    year: null,
    doi: null,
    status: 'In progress',
    tags: ['Computer Vision']
  }
];

export const projects = [
  {
    title: 'Mars Rover Phoenix 2.0',
    role: 'Led the software team',
    summary:
      'Built the control and autonomy software for the rover. Won the University Rover Challenge 2021 World Championship.',
    highlight: 'World Champion, URC 2021',
    tags: ['Robotics', 'Autonomy']
  },
  {
    title: 'MIST CSE Archive',
    role: 'Built and launched',
    summary:
      'A shared archive of course material and resources for the CSE department. Grew to 800+ active users.',
    highlight: '800+ active users',
    tags: ['Web', 'Community']
  },
  {
    title: 'Bangladesh Army Secure Mobile App Suite',
    role: 'Ongoing since May 2025',
    summary:
      'A suite of secure mobile applications built with strict security and reliability requirements.',
    highlight: 'Active engagement',
    tags: ['Secure AI', 'Mobile']
  },
  {
    title: 'Global CS Scholarship Radar',
    role: 'React application',
    summary:
      'Tracks funded PhD and MSc opportunities in computer science from across the world in one clean dashboard.',
    highlight: 'Funded opportunities worldwide',
    tags: ['React', 'Data']
  },
  {
    title: 'Scholarship Opportunity Tracker',
    role: 'Automation pipeline',
    summary:
      'A Python scraper on GitHub Actions that updates a JSON-driven dashboard hosted on GitHub Pages, fully hands-free.',
    highlight: 'Automated daily updates',
    tags: ['Python', 'Automation']
  }
];

export const courses = [
  { code: 'CSE-105', name: 'Structured Programming' },
  { code: 'CSE-220', name: 'Object Oriented Programming' },
  { code: 'CSE-310', name: 'Computer Networking' },
  { code: 'CSE-213', name: 'Computer Architecture' },
  { code: 'CSE-DS', name: 'Data Structures' }
];

export const teachingRoles = [
  'Lab final design with Cisco Packet Tracer',
  'Project rubric design',
  'ABET-style PEO assessment support',
  'Thesis defense coordination for the CSE-22 batch'
];

export const news = [
  {
    date: '2026',
    text: 'Elsevier Array paper on adaptive mobile banking UI is now published.'
  },
  {
    date: 'Jun to Jul 2026',
    text: 'Preparing for the GRE.'
  },
  {
    date: 'Jun 15 to 19, 2026',
    text: 'Taking part in the Kaggle 5-Day AI Agents Intensive.'
  },
  {
    date: 'Ongoing',
    text: 'Coordinating the thesis defense for the CSE-22 batch at MIST.'
  }
];

export const about = {
  facts: [
    'Lecturer at MIST since April 2024',
    'Taught 16+ courses and guided 220+ students',
    'B.Sc. in CSE, CGPA 3.83 out of 4.00, ranked 4th of 88',
    'IELTS 7.5',
    'Advisor, MIST Mars Rover Society',
    'Moderator, MIST Computer Club',
    'Mentored robotics teams at other universities'
  ],
  goal:
    'I am applying for a fully funded PhD abroad, targeting Fall 2026 or Spring to Fall 2027. My long-term goal is to become a global AI researcher, an academic leader, and someone who ships real-world AI.'
};
