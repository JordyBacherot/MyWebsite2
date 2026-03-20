export interface ExperienceItem {
    title: string;
    organization: string;
    period: string;
    description: string;
    descriptionPlus?: string;
    type: string;
}

export interface SkillCategory {
    name: string;
    skills: string[];
}

export interface ProjectItem {
    title: string;
    theme: string;
    description: string;
    tags: string[];
}

export interface TranslationStructure {
    nav: {
        profile: string;
        journey: string;
        skills: string;
        projects: string;
        contact: string;
    };
    hero: {
        name: string;
        description: string;
        viewProjects: string;
        contactMe: string;
    };
    experience: {
        title: string;
        academic: string;
        professional: string;
        experiences: ExperienceItem[];
    };
    skills: {
        title: string;
        categories: SkillCategory[];
    };
    projects: {
        title: string;
        details: string;
        items: ProjectItem[];
    };
    contact: {
        title: string;
        subtitle: string;
        directMessage: string;
        networks: string;
        quote: string;
        quoteAuthor: string;
        formLabels: {
            identity: string;
            coordinates: string;
            transmission: string;
        };
        placeholders: {
            name: string;
            email: string;
            message: string;
        };
        submit: string;
        footerNote: string;
    };
    footer: {
        copyright: string;
    };
}

export const translations: Record<Language, TranslationStructure> = {
    fr: {
        // Navigation
        nav: {
            profile: "Profil",
            journey: "Parcours",
            skills: "Competences",
            projects: "Projets",
            contact: "Contact",
        },
        // Hero Section
        hero: {
            name: "Jordy Bacherot",
            description: "Etudiant en Master en Sciences Cognitives et Alternant Ingénieur en Intelligence Artificielle.",
            viewProjects: "Voir mes projets",
            contactMe: "Me contacter",
        },
        // Experience Section
        experience: {
            title: "Parcours & Formations",
            academic: "Formations Académiques",
            professional: "Expériences Professionnelles",
            experiences: [
                {
                    title: "Master Sciences Cognitives",
                    organization: "IDMC",
                    period: "2024 - Présent",
                    description: "Parcours IACH : Intelligence Artificielle Centrée Humain.",
                    descriptionPlus: "Major de M1",
                    type: "Académique"
                },
                {
                    title: "Alternance Ingénieur IA",
                    organization: "Direction du Numérique - Université de Lorraine",
                    period: "2024 - Présent",
                    description: "Intégration de solutions d'IA générative (LLM/RAG).",
                    type: "Professionnel"
                },
                {
                    title: "Licence MIASHS",
                    organization: "Université de Lorraine",
                    period: "2021 - 2024",
                    description: "Mathématiques et Informatique Appliquées aux Sciences Humaines et Sociales. Parcours Sciences Cognitives",
                    descriptionPlus: "Major de Promotion - Parcours Sciences Cognitives",
                    type: "Académique"
                }
            ],
        },
        // Skills Section
        skills: {
            title: "Competences",
            categories: [
                {
                    name: "Data Science & IA",
                    skills: ["Machine Learning", "Deep Learning", "Scikit-Learn", "PyTorch", "TensorFlow/Keras"]
                },
                {
                    name: "Intégration IA",
                    skills: ["LLMs", "RAG", "LangChain", "LangGraph", "LangFuse", "Ollama", "HuggingFace"]
                },
                {
                    name: "Développement Web & Logiciel",
                    skills: ["Python", "Java", "TypeScript", "React", "Flutter", "Hono", "SQL", "Git", "PostgreSQL/MariaDB", "Supabase", "Docker", "CI/CD", "VPS"]
                },
                {
                    name: "Sciences Cognitives & UX",
                    skills: ["Psychologie Cognitive", "Neurosciences", "Statistiques", "UX Design", "Éthique de l'IA"]
                },
            ],
        },
        // Projects Section
        projects: {
            title: "Projets",
            details: "Détails",
            items: [
                {
                    title: "Création de chatbots RAG",
                    theme: "Intégration IA - Alternance",
                    description: "Création de chatbots RAG pour l'assistance aux premières questions utilisateurs sur des logiciels spécifiques.",
                    tags: ["Projet Professionnel", "LLM", "RAG", "LangChain", "LangGraph", "LangFuse", "VLLM"]
                },
                {
                    title: "Ce site web",
                    theme: "Développement Web - Personnel",
                    description: "Site web personnel conçu pour présenter mes compétences et projets.",
                    tags: ["Projet Personnel", "React", "TypeScript", "Tailwind", "Bun"]
                },
                {
                    title: "Algorithme de recommandation de jeux steams",
                    theme: "Embedding + ANN - Académique",
                    description: "Algorithme de recommandation de jeux steams basé sur un ANN (approximate nearest neighbors) et sur les embeddings des utilisateurs.",
                    tags: ["Projet Académique", "Python", "Pytorch", "Embedding", "ANN"]
                },
                {
                    title: "Application fullstack Flutter + Hono de recommandation de jeux",
                    theme: "Développement Web - Académique",
                    description: "Application fullstack de recommandation de jeux steams basé sur le projet d'Algorithme de recommandation de jeux steams. Application déployé sur un VPS avec docker.",
                    tags: ["Projet Académique", "Flutter", "Dart", "TypeScript", "Hono", "Bun", "MariaDB", "Docker", "Déploiement - VPS", "CI/CD"]
                },
                {
                    title: "Logiciel de gestion de commandes de restaurant",
                    theme: "Développement Web - Familial",
                    description: "Logiciel de gestion de commandes de restaurant conçu pour faciliter et accélérer la communication entre service et cuisine.",
                    tags: ["Projet Personnel", "React", "TypeScript", "Tailwind", "Bun", "Supabase"]
                },
                {
                    title: "Création d'un chatbot (patient) d'entrainement aux examens de médecine ECOS",
                    theme: "Intégration IA - Alternance",
                    description: "Création d'un chatbot d'entrainement aux examens de médecine ECOS. Chatbot jouant le rôle d'un patient et répondant aux questions de l'étudiant/médecin. Evaluation automatique de la discussion.",
                    tags: ["Projet Professionnel", "LLM", "LangChain", "LangFuse", "VLLM"]
                },

            ],
        },
        // Contact Section
        contact: {
            title: "Contact",
            subtitle: "N'hésitez pas à me contacter pour toute question. Même si c'est pour parler de Dune ...",
            directMessage: "Message",
            networks: "Mes Réseaux",
            quote: "La vie est un jeu dont les règles s'apprennent en y sautant à pieds joints pour être immergé jusqu'au cou, sous peine d'être toujours pris au dépourvu...",
            quoteAuthor: "Dune : La Maison des Mères - Darwi Odrade",
            formLabels: {
                identity: "Identité",
                coordinates: "Coordonnées",
                transmission: "Votre message",
            },
            placeholders: {
                name: "Votre nom",
                email: "votre@email.com",
                message: "Écrivez votre message...",
            },
            submit: "Envoyer",
            footerNote: "Plus qu'à appuyer sur envoyer !",
        },
        // Footer
        footer: {
            copyright: "Jordy - AI & Cognition",
        },
    },

    en: {
        // Navigation
        nav: {
            profile: "Profile",
            journey: "Journey",
            skills: "Skills",
            projects: "Projects",
            contact: "Contact",
        },
        // Hero Section
        hero: {
            name: "Jordy Bacherot",
            description: "Student in Cognitive Sciences and Artificial Intelligence and Apprenticeship in Artificial Intelligence Engineering.",
            viewProjects: "View my projects",
            contactMe: "Contact me",
        },
        // Experience Section
        experience: {
            title: "Journey",
            academic: "Academic",
            professional: "Professional",
            experiences: [
                {
                    title: "Master in Cognitive Sciences",
                    organization: "IDMC",
                    period: "2024 - Present",
                    description: "IACH Track: Human-Centered Artificial Intelligence.",
                    descriptionPlus: "M1 Valedictorian",
                    type: "Academic"
                },
                {
                    title: "AI Engineer Apprenticeship",
                    organization: "Digital Directorate - University of Lorraine",
                    period: "2024 - Present",
                    description: "Integration of generative AI solutions (LLM/RAG).",
                    type: "Professional"
                },
                {
                    title: "Bachelor's in MIASHS",
                    organization: "University of Lorraine",
                    period: "2021 - 2024",
                    description: "Mathematics and Computer Science Applied to Human and Social Sciences.",
                    descriptionPlus: "Valedictorian",
                    type: "Academic"
                }
            ],
        },
        // Skills Section
        skills: {
            title: "Skills",
            categories: [
                {
                    name: "Data Science",
                    skills: ["Machine Learning", "Deep Learning", "Scikit-Learn", "PyTorch", "TensorFlow/Keras"]
                },
                {
                    name: "AI Integration",
                    skills: ["LLMs", "RAG", "LangChain", "LangGraph", "LangFuse", "Ollama", "HuggingFace"]
                },
                {
                    name: "Development",
                    skills: ["Python", "Java", "TypeScript", "React", "SQL", "Git", "Docker", "PostgreSQL", "Supabase"]
                },
                {
                    name: "Cognitive Sciences",
                    skills: ["Cognitive Psychology", "Neuroscience", "Statistics", "UX", "AI Challenges"]
                },
            ],
        },
        // Projects Section
        projects: {
            title: "Projects",
            details: "Details",
            items: [
                {
                    title: "Creation of RAG Chatbots",
                    theme: "AI Integration - Apprenticeship",
                    description: "Creation of RAG chatbots to assist with initial user questions on specific software.",
                    tags: ["Professional Project", "LLM", "RAG", "LangChain", "LangGraph", "LangFuse", "VLLM"]
                },
                {
                    title: "This Website",
                    theme: "Web Development - Personal",
                    description: "Personal website designed to showcase my skills and projects.",
                    tags: ["Personal Project", "React", "TypeScript", "Tailwind", "Bun"]
                },
                {
                    title: "Order Management Software",
                    theme: "Web Development - Family",
                    description: "Internal order management software between two butcher shops owned by the same person. Site not used.",
                    tags: ["Personal Project", "React", "TypeScript", "Tailwind", "Bun", "Supabase"]
                },
                {
                    title: "Steam Game Recommendation Algorithm",
                    theme: "Embedding + ANN - Academic",
                    description: "Steam game recommendation algorithm based on an ANN (approximate nearest neighbors) and user embeddings.",
                    tags: ["Academic Project", "Python", "Pytorch", "Embedding", "ANN"]
                },
                {
                    title: "Restaurant Order Management Software",
                    theme: "Web Development - Family",
                    description: "Restaurant order management software designed to facilitate and speed up communication between service and kitchen.",
                    tags: ["Personal Project", "React", "TypeScript", "Tailwind", "Bun", "Neon", "PostgreSQL"]
                },
                {
                    title: "Creation of a (Patient) Chatbot for ECOS Medical Exam Training",
                    theme: "AI Integration - Apprenticeship",
                    description: "Creation of a training chatbot for ECOS medical exams. Chatbot playing the role of a patient and answering the student/doctor's questions. Automatic evaluation of the discussion. Project Abandoned",
                    tags: ["Professional Project", "LLM", "LangChain", "LangFuse", "VLLM"]
                },

            ],
        },
        // Contact Section
        contact: {
            title: "Contact",
            subtitle: "Feel free to contact me for any questions. Even if it's to talk about Dune...",
            directMessage: "Message",
            networks: "My Networks",
            quote: "Life is a game whose rules you learn if you leap into it and play it to the hilt.",
            quoteAuthor: "Dune : The House of Mères - Darwi Odrade",
            formLabels: {
                identity: "Identity",
                coordinates: "Coordinates",
                transmission: "Your message",
            },
            placeholders: {
                name: "Your name",
                email: "your@email.com",
                message: "Write your message...",
            },
            submit: "Send",
            footerNote: "Just have to press send!",
        },
        // Footer
        footer: {
            copyright: "Jordy - AI & Cognition",
        },
    },
};

export type Language = 'fr' | 'en';
export type Translations = TranslationStructure;
