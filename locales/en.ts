// locales/en.ts
export default {
  hello: 'Hello',
  welcome: 'Hello {name}!',

  navbar: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    contact: 'Contact',
  },

  hero: {
    title_prefix: 'Frontend Developer specializing in',
    title_stack: ' NextJs & React & TailwindCSS',
    subtitle:
      "I craft modern, responsive, and performant web applications with a focus on user experience and developer maintainability.",
    cta_hire: 'Hire Me',
    cta_projects: 'View Projects',
  },

  about: {
    heading: 'About Me',
    bio:
      "I'm Olivier Kouassi — A former geotechnical engineer who transformed a passion for code into a craft for building performant web solutions. Eager to collaborate and fully invest my unique problem-solving skills in your next project.",
    skills: {
      next: 'Next',
      react: 'React',
      typescript: 'TypeScript',
      tailwind: 'TailwindCSS',
      sass: 'Sass',
      auth: 'JWT/OAuth',
    },
  },

  projects: {
    heading: 'Projects',
    intro:
      'A showcase of my recent works. Want to see more? Visit my GitHub profile.',
    loading: 'Loading projects...',
    error_fetch: 'Failed to fetch projects',
    error_unexpected: 'Unexpected error',
    untitled: 'Untitled Project',
    no_description: 'No description provided.',
    github: 'GitHub',
    demo: 'Demo',
    video: 'Video',
  },

  contact: {
    heading: 'Get In Touch',
    intro:
      "Have a project in mind or want to discuss how I can help your business? Let's talk!",
    info_heading: 'Contact Information',
    email_label: 'Email',
    connect_heading: 'Connect with me',
    form_heading: 'Send a Message',
    success_title: 'Message Sent!',
    success_text:
      "Thank you for reaching out. I'll get back to you as soon as possible.",
    fields: {
      name_label: 'Name',
      name_placeholder: 'Your name',
      name_error: 'Invalid name! (letters only)',
      email_label: 'Email',
      email_placeholder: 'your.email@example.com',
      email_error: 'Invalid email address!',
      message_label: 'Message',
      message_placeholder: 'Tell me about your project...',
      message_error: 'Message too short! (min 10 characters)',
    },
    sending: 'Sending...',
    send: 'Send Message',
  },

  footer: {
    role: 'Frontend Developer',
    rights: 'All rights reserved.',
  },
} as const