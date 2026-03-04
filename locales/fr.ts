// locales/fr.ts
export default {
  hello: 'Salut',
  welcome: 'Salut {name}!',

  navbar: {
    home: 'Accueil',
    about: 'À propos',
    projects: 'Projets',
    contact: 'Contact',
  },

  hero: {
    title_prefix: 'Développeur Frontend spécialisé en',
    title_stack: ' NextJs & React & TailwindCSS',
    subtitle:
      "Je crée des applications web modernes, réactives et performantes, avec un accent sur l'expérience utilisateur et la maintenabilité pour les développeurs.",
    cta_hire: 'Engagez-moi',
    cta_projects: 'Voir les projets',
  },

  about: {
    heading: 'À propos de moi',
    bio:
      "Je suis Olivier Kouassi — Ancien ingénieur géotechnicien devenu développeur, j'ai transformé une passion pour le code en un savoir-faire pour construire des solutions web performantes. Prêt à collaborer et à mettre mes compétences en résolution de problèmes au service de votre projet.",
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
    heading: 'Projets',
    intro:
      "Une vitrine de mes travaux récents. Vous voulez en voir plus ? Visitez mon profil GitHub.",
    loading: 'Chargement des projets...',
    error_fetch: "Échec du chargement des projets",
    error_unexpected: 'Erreur inattendue',
    untitled: 'Projet sans titre',
    no_description: 'Aucune description fournie.',
    github: 'GitHub',
    demo: 'Démo',
    video: 'Vidéo',
  },

  contact: {
    heading: 'Contactez-moi',
    intro:
      "Vous avez un projet en tête ou souhaitez discuter de la façon dont je peux aider votre entreprise ? Parlons-en !",
    info_heading: 'Informations de contact',
    email_label: 'Email',
    connect_heading: 'Réseaux',
    form_heading: 'Envoyer un message',
    success_title: 'Message envoyé !',
    success_text:
      "Merci pour votre message. Je vous répondrai dès que possible.",
    fields: {
      name_label: 'Nom',
      name_placeholder: 'Votre nom',
      name_error: 'Nom invalid ! (lettres uniquement)',
      email_label: 'Email',
      email_placeholder: 'votre.email@exemple.com',
      email_error: 'Adresse email invalide !',
      message_label: 'Message',
      message_placeholder: 'Parlez-moi de votre projet...',
      message_error: 'Message trop court ! (min 10 caractères)',
    },
    sending: 'Envoi...',
    send: 'Envoyer le message',
  },

  footer: {
    role: 'Développeur Frontend',
    rights: 'Tous droits réservés.',
  },
} as const