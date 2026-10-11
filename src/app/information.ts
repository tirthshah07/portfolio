//todo: Splash Screen
const splashScreen = {
    enabled: true,
    duration: 2000
  };
  
  const introduction = {
    username: 'Tirth Shah',
    title: 'I\'m Tirth.',
    subTitle:
      `I\'m a Frontend Software Engineer 👨🏻‍💻 from Gandhinagar, Gujarat, India with 4 years of experience building scalable, responsive web applications using Angular, React, TypeScript and RxJS.
      Getting to be creative 🛠️ and trying something new is why I ❤️ what I do.
      \nLets connect to discuss a project or just want to say hi? My Inbox is open for all.`
    ,
    resumeLink:
      'https://drive.google.com/drive/folders/19JNLiUbS0il8xBUWUeYssUTEg9CDMHYw?usp=sharing',
    roles: ['Frontend Developer', 'Angular Developer', 'React Developer', 'TypeScript Enthusiast'],
    location: 'Gandhinagar, Gujarat, India',
    stats: [
      { value: 4, suffix: '+', label: 'Years of experience' },
      { value: 4, suffix: '', label: 'Companies' },
      { value: 15, suffix: '+', label: 'Reusable components shipped' },
      { value: 10, suffix: 'K+', label: 'Dynamic QR codes managed' }
    ],
    display: true
  };
  
  
  const socialMediaLinks = {
    github: 'https://github.com/tirthshah07',
    linkedin: 'https://www.linkedin.com/in/tirthshah007',
    gmail: 'shahti42@gmail.com',
    gitlab: '',
    medium: '',
    stackoverflow: '',
    display: true
  };
  
  
  const aboutSection = {
    title: 'About Me',
    skillsAvatar: "./20084243-467778346_3-s5-v1.png",
    subTitle: 'A passionate developer who loves exploring different technologies',
    skills: [
      '⚡ Ever since I was a kid I\'ve had a flair for technology and computers.',
      '⚡ I was first introduced to programming in my primary section and It instantly captured my interest.',
      '⚡ I\'m working towards becoming a well rounded web application developer who comes up with creative solutions.',
      '⚡ I specialise in Angular (v10–19) with standalone components, lazy-loaded architecture, Angular Signals, Angular Material and SCSS, and I also work with React.',
      '⚡ I have hands-on experience with JWT/RBAC authentication, payment gateway integration, internationalization (i18n), performance optimization and REST API integration.',
      '⚡ I work in Agile/Scrum teams and have backend exposure to Node.js, Express.js and Django.',
      '⚡ Fixing bugs, solving tough hard problems, watching actual users using something I built are a few reasons why i love being a developer.',
      '⚡ I have a B.Tech in Electronics & Communication Engineering from Government Engineering College, Bharuch.',
      '⚡ When I"m not working, I enjoy spending time in nature, exploring spirituality, playing both indoor and outdoor games and engaging in volunteer work.'
    ],
    bio: 'Ever since I was a kid I\'ve had a flair for technology and computers. I was introduced to programming in primary school and it instantly captured my interest — today I build fast, accessible and delightful web applications for real users.',
    highlights: [
      'Angular (v10–19) with standalone components, lazy-loaded architecture, Signals, Angular Material and SCSS — plus React.',
      'JWT/RBAC authentication, payment gateway integration, i18n, performance optimization and REST API integration.',
      'Agile/Scrum teams, code reviews, and backend exposure to Node.js, Express.js and Django.'
    ],
    motivation: 'Fixing bugs, solving tough problems and watching real users use something I built are why I love being a developer.',
    education: {
      degree: 'B.Tech, Electronics & Communication',
      school: 'Government Engineering College, Bharuch',
      date: '2018 – 2022',
      logo: './gec-logo.png'
    },
    current: {
      role: 'Software Engineer',
      company: 'IndiaNIC',
      logo: './indianic-logo.png'
    },
    hobbies: ['🌿 Nature', '🧘 Spirituality', '🏏 Indoor & outdoor games', '🤝 Volunteering'],
    display: true
  }

  const skillsSection = {

    softwareSkillsHeader:'Technologies I\'ve dipped my toes in...',
    skillGroups: [
      { title: 'Languages', icon: 'fa-solid fa-code', items: ['TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'SCSS'] },
      { title: 'Frameworks & Libraries', icon: 'fa-solid fa-layer-group', items: ['Angular (v10–19)', 'Standalone Components', 'Angular Signals', 'React', 'RxJS', 'Reactive Forms', 'AngularJS', 'jQuery'] },
      { title: 'UI & Data', icon: 'fa-solid fa-palette', items: ['Angular Material', 'PrimeNG', 'AG Grid', 'Tailwind CSS', 'Bootstrap', 'Chart.js', 'Highcharts', 'IndexedDB'] },
      { title: 'Auth & Security', icon: 'fa-solid fa-shield-halved', items: ['JWT', 'Refresh Tokens', 'RBAC', 'Route Guards'] },
      { title: 'Backend (Familiar)', icon: 'fa-solid fa-server', items: ['Node.js', 'Express.js', 'Django', 'REST APIs'] },
      { title: 'Tools & Practices', icon: 'fa-solid fa-screwdriver-wrench', items: ['Git & GitHub', 'Code Reviews', 'CI/CD', 'Postman', 'Vite', 'Agile/Scrum', 'Lazy Loading', 'i18n', 'Claude Code'] }
    ],
    softwareSkillsImage: "./20053717-467778346_3-s5-v1.png",
    softwareSkills: [
      {
        skillName: 'html-5',
        badgeURL : 'https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white'
      },
      {
        skillName: 'css3',
        badgeURL : 'https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white'
      },
      {
        skillName: 'JavaScript',
        badgeURL : 'https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E'
      },
      {
        skillName: 'TypeScript',
        badgeURL : 'https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white'
      },
      {
        skillName: 'Angular',
        badgeURL : 'https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white'
      }
      ,
      {
        skillName: 'Git',
        badgeURL : 'https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white'
      },
      {
        skillName: 'Swagger',
        badgeURL : 'https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white'
      },
      {
         skillName: 'AngularJs',
        badgeURL : 'https://img.shields.io/badge/AngularJS-E23237?style=for-the-badge&logo=angular&logoColor=white'
      },
      {
        skillName: 'Bootstrap',
        badgeURL: 'https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white'
      },
      {
        skillName: 'Python',
        badgeURL: 'https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white'
      },
      {
        skillName: 'Django',
        badgeURL: 'https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white'
      },
      {
        skillName: 'SQ Lite',
        badgeURL: 'https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white'
      },
      {
        skillName: 'Node Js',
        badgeURL: 'https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white'
      },
      {
        skillName: 'Ng-zorro',
        badgeURL: 'https://img.shields.io/badge/NG--Zorro-1D39C4?style=for-the-badge&logo=ant-design&logoColor=white'
      },
      {
        skillName: 'Jquery',
        badgeURL: 'https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white'
      },
      {
        skillName: 'RXJS',
        badgeURL: 'https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactive&logoColor=white'
      },
      {
        skillName: 'NVM (Node Version Manager)',
        badgeURL: 'https://img.shields.io/badge/NVM-3C873A?style=for-the-badge&logo=nodedotjs&logoColor=white'
      },
      {
        skillName: 'React',
        badgeURL: 'https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB'
      },
      {
        skillName: 'SCSS',
        badgeURL: 'https://img.shields.io/badge/SASS-CC6699?style=for-the-badge&logo=sass&logoColor=white'
      },
      {
        skillName: 'Angular Material',
        badgeURL: 'https://img.shields.io/badge/Angular_Material-3F51B5?style=for-the-badge&logo=angular&logoColor=white'
      },
      {
        skillName: 'PrimeNG',
        badgeURL: 'https://img.shields.io/badge/PrimeNG-DD0031?style=for-the-badge&logo=angular&logoColor=white'
      },
      {
        skillName: 'AG Grid',
        badgeURL: 'https://img.shields.io/badge/AG_Grid-0B2545?style=for-the-badge&logoColor=white'
      },
      {
        skillName: 'Tailwind CSS',
        badgeURL: 'https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white'
      },
      {
        skillName: 'Chart.js',
        badgeURL: 'https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white'
      },
      {
        skillName: 'Highcharts',
        badgeURL: 'https://img.shields.io/badge/Highcharts-263238?style=for-the-badge&logoColor=white'
      },
      {
        skillName: 'Express.js',
        badgeURL: 'https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white'
      },
      {
        skillName: 'JWT',
        badgeURL: 'https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white'
      },
      {
        skillName: 'Vite',
        badgeURL: 'https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white'
      },
      {
        skillName: 'GitHub',
        badgeURL: 'https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white'
      },
      {
        skillName: 'Postman',
        badgeURL: 'https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white'
      },
      {
        skillName: 'Claude Code',
        badgeURL: 'https://img.shields.io/badge/Claude_Code-D97757?style=for-the-badge&logo=anthropic&logoColor=white'
      }
    ],
    display: true
  };
  
    /* Make Sure to add badge links from https://github.com/alexandresanlim/Badges4-README.md-Profile */
    
  
  //include education, work expericence and others
  const myJourney = {
    display: true,
    experience: [
      {
        role: 'B.Tech, Electronics & Communication Engineering',
        short_note: 'Bharuch, Gujarat',
        type: 'Education',
        tags: ['B.Tech', 'Electronics & Communication', 'Design Engineering'],
        company: 'Government Engineering College - Bharuch',
        companyLogo: "./gec-logo.png",
        date: 'Jun 2018 – Jun 2022',
        desc: '',
        keyNotes: [
          'Favorite Subject: Web Development, VLSI, Electronics, Microprocessor and Microcontroller, Signal & System AI, Machine Learning, etc...',
          'Team - Leader For Design Engineering for 3 Years',
          'Volunteer for Technical Fest Organised by College - Techtonic 2k20'
        ]
      },
      {
        role: 'Intern',
        company: 'Cutting Edge Infotech',
        short_note: 'Vadodara, Gujarat',
        companyLogo: "./cei-logo.png",
        type: 'Internship',
        tags: ['JavaScript', 'AngularJS', 'Bootstrap', 'Tailwind CSS'],
        date: 'Jun 2022 – Sep 2022',
        desc: '',
        keyNotes: [
          'Started my journey as an Frontend Developer',
          'Explored Javascript, Bootstrap, Tailwind, AngularJs',
          'Developed 4-5 Template based web application for clients, ensuring customized solution to meet their needs',
          'Created CRUD Operation for 2 Admin Panel using technology AngularJs'
        ]
      },
      {
        role: 'Frontend Developer',
        company: 'Cutting Edge Infotech',
        short_note: 'Vadodara, Gujarat',
        companyLogo: "./cei-logo.png",
        type: 'Full-time',
        tags: ['Angular 14', 'AngularJS', 'jQuery', 'Bootstrap', 'REST APIs'],
        date: 'Sep 2022 – Nov 2023',
        desc: '',
        keyNotes: [
          'Designed and delivered a Travel Portal in Angular 14 with role-based hotel booking workflows',
          'Built dynamic, mobile-responsive web applications using AngularJS, jQuery, Bootstrap and REST APIs',
          'Conducted various R&D activities to improve performance of existing modules in the project',
          'Mentored and trained two newbies into the project'
        ]
      },
      {
        role: 'Angular Developer',
        company: 'Samcom Technobrains Pvt Ltd',
        short_note: 'Ahmedabad, Gujarat',
        companyLogo: "./samcom-logo.png",
        type: 'Full-time',
        tags: ['Angular', 'i18n', 'JWT', 'Route Guards', 'REST APIs'],
        date: 'Dec 2023 – Sep 2024',
        desc: '',
        keyNotes: [
          'Built an MCP (Model Context Protocol)-based chatbot application with document search via REST APIs and a responsive SCSS UI',
          'Implemented multilingual support (i18n) for 4 languages and role-based authentication using JWT and Route Guards',
          'Delivered an export module generating thousands of flat files for ICEGATE (Indian Customs) compliance',
          'Migrated an application from v10 - v16 in Angular'
        ]
      },
      {
        role: 'Software Engineer',
        company: 'Arbelos Solution',
        short_note: 'Gandhinagar, Gujarat',
        companyLogo: "./arbelos-logo.svg",
        type: 'Full-time',
        tags: ['Angular 18', 'Signals', 'Angular Material', 'SCSS', 'JWT / RBAC', 'Payment gateways'],
        date: 'Nov 2024 – Nov 2025',
        desc: '',
        keyNotes: [
          'Built a product serving 500–1,000 users from scratch, using a fully lazy-loaded Angular 18 architecture with standalone components and reusable services',
          'Developed custom directives (user permissions, image handling, infinite scroll) and reusable UI components with Angular Material and SCSS',
          'Integrated 3 payment gateways and built authentication flows with JWT, refresh tokens and RBAC',
          'Optimized performance with Angular Signals, lazy loading and @for with track; improved UX with Reactive Forms validation and responsive design'
        ]
      },
      {
        role: 'Software Engineer',
        company: 'IndiaNIC',
        short_note: 'Ahmedabad, Gujarat',
        companyLogo: "./indianic-logo.png",
        type: 'Full-time',
        tags: ['Angular', 'TypeScript', 'SCSS', 'RBAC', 'React 19', 'Vite'],
        date: 'Nov 2025 – Present',
        desc: '',
        keyNotes: [
          'Skills Check (EdTech): Core frontend developer for the learner web app and admin panel of a platform built to scale to 50–70 schools',
          'Built 15+ reusable standalone assessment question-type components (MCQ, drag-and-drop, audio, sequence selection, fill-in-the-blank) and integrated an EPUB reader with highlight and bookmark support',
          'Developed admin-side assessment and question-bank management plus reusable data-table features (enable/disable/delete, global sorting, persistent pagination)',
          'CambridgeQR: Implemented RBAC-based authentication, role-gated dashboards, and the QR Generator and publishing module for a platform managing 10,000+ dynamic QR codes',
          'Upgraded a Vite-based React 17 template to React 19, reproducing pixel-accurate UI under a namespaced design system',
          'Action Truck Parts (E-commerce): Fixed product-listing search and sort, similar-products state and routing, and order and cart total calculations'
        ]
      }
    ]
  };
  
  /* Your Open Source Section to View Your GitHub Pinned Projects
  To know how to get GitHub key look at readme.md */
  const openSource = {
    showGithubProfile: 'true', // Set true or false to show Contact profile using GitHub, defaults to true
    display: true // Set false to hide this section, defaults to true
  };
  
  
  // Achievement Section
  // Include certificates, talks etc
  const achievementSection = {
    title: 'Achievements And Certifications 🏆 ',
    subtitle:
      'Achievements, Certifications, Award Letters and Some Cool Stuff that I have done !',
  
    achievementsCards: [
      {
        title: 'Essential Program in Javascript Programming',
        subtitle:
          'Credential: LUJS0521A0078',
        image: "./letup-logo.png",
        imageAlt: 'Javascript Certificate',
        footerLink: [
          {
            name: 'Certificate of Completion',
            url: 'https://verify.letsupgrade.in/#/'
          }
        ]
      },
      {
        title: 'Essential Program in Python Programming',
        subtitle:
          'Credential: LUPY1220A0845',
        image: "./letup-logo.png",
        imageAlt: 'Python Certificate',
        footerLink: [
          {
            name: 'Certificate of Completion',
            url: 'https://verify.letsupgrade.in/#/'
          }
        ]
      },
      {
        title: 'Learn HTML - For Beginners',
        subtitle:
          '',
        image: "./udemy-logo.png",
        imageAlt: 'Udemy Certificate',
        footerLink: [
          {
            name: 'View certificate',
            url: 'https://www.udemy.com/certificate/UC-da5d843a-05a2-4522-844c-44d9d05971a6/'
          }
        ]
      },
      {
        title: 'Learn CSS - For Beginners',
        subtitle:
          '',
        image: "./udemy-logo.png",
        imageAlt: 'Udemy Certificate',
        footerLink: [
          {
            name: 'View certificate',
            url: 'https://www.udemy.com/certificate/UC-0e79815d-20b7-478e-9008-6ba4b11b3c86/'
          }
        ]
      },
  
      {
        title: 'Programming for Everybody',
        subtitle: 'Completed Online course from Michigan in 2020',
        image: "./unv-logo.png",
        imageAlt: 'Michigan Certificate',
        footerLink: [
          {name: 'Certificate of completion', url:'http://coursera.org/verify/4HATD8BJ8788'}
        ]
      },
      {
        title: 'Geo-computation and Geo-web Services',
        subtitle: 'Completed Online course from ISRO in 2020',
        image: "./isro-logo.png",
        imageAlt: 'ISRO Certificate',
        footerLink: [
          {name: 'Certificate of completion', url:'https://certificate.iirs.gov.in/'}
        ]
      }
    ],
    display: true
  };
  
  export {
  introduction,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  myJourney,
  openSource,
  achievementSection, aboutSection
};