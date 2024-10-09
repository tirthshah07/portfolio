//todo: Splash Screen
const splashScreen = {
    enabled: true,
    duration: 2000
  };
  
  const introduction = {
    username: 'Tirth Shah',
    title: 'I\'m Tirth.',
    welcomeAvatar: "./laptop-wave.png",
    subTitle:
      `I\'m a passionate software developer 👨🏻‍💻 from Gandhinagar, Gujarat, a vibrant city in the western part of India.
      Getting to be creative 🛠️ and trying something new is why I ❤️ what I do.
      \nLets connect to discuss a project or just want to say hi? My Inbox is open for all.`
    ,
    resumeLink:
      'https://drive.google.com/drive/folders/19JNLiUbS0il8xBUWUeYssUTEg9CDMHYw?usp=sharing',
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
      '⚡ Fixing bugs, solving tough hard problems, watching actual users using something I built are a few reasons why i love being a developer.',
      '⚡ I have a bachelors degree in Electroics and Communications.',
      '⚡ When I"m not working, I enjoy spending time in nature, exploring spirituality, playing both indoor and outdoor games and engaging in volunteer work.'
    ],
    display: true
  }

  const skillsSection = {

    softwareSkillsHeader:'Technologies I\'ve dipped my toes in...',
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
        role: 'Student',
        short_note: 'ECE Engineer',
        company: 'Government Engineering College - Bhaurch',
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
        short_note: '',
        companyLogo: "./cei-logo.png",
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
        short_note: '',
        companyLogo: "./cei-logo.png",
        date: 'Sep 2022 – Nov 2023',
        desc: '',
        keyNotes: [
          'Developed dynamic web applications using AngularJS and jQuery, effectively integrating REST APIs to enhance application features and performance',
          'Conducted various R&D activities to improve performance of existing modules in the project',
          'Explored Angular, Node and React as a part of R&d Activities',
          'Created one project for client using Angular 14',
          'Mentored and trained two newbies into the project'
        ]
      },
      {
        role: 'Angular Developer',
        company: 'Samcom Technobrains Pvt Ltd',
        short_note: '',
        companyLogo: "./samcom-logo.png",
        date: 'Dec 2023 – Current',
        desc: '',
        keyNotes: [
          'Worked on various 4-5 different web application using Angular',
          'Explored Angular 17, Python, Django, SQLite, Gitlab as a part of R&d Activities',
          'Migrated an application from v10 - v16 in Angular'
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
        image: "./unv-logo.png",
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