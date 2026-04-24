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
    link?: string;
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
        seeProject: string;
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
            seeProject: "Voir le site web",
            items: [
                {
                    title: "Création de chatbots RAG",
                    theme: "Intégration IA - Alternance",
                    description: "Application permettant l'intégration de chatbots RAG dans des applications tierces via API, pour l'assistance aux premières questions utilisateurs sur des logiciels spécifiques.",
                    tags: ["Projet Professionnel", "LLM", "RAG", "LangChain", "LangGraph", "LangFuse", "VLLM"]
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
                    description: "Application fullstack de recommandation de jeux steams basé sur le projet d'Algorithme de recommandation de jeux steams. Application déployé sur un VPS avec docker. Si vous voulez en voir plus, consultez le projet GitHub : steam_reco_app",
                    tags: ["Projet Académique", "Flutter", "Dart", "TypeScript", "Hono", "Bun", "MariaDB", "Docker", "Déploiement - VPS", "CI/CD"],
                    link: "steam-reco-app.jordy-bacherot.fr"
                },
                {
                    title: "Deep Learning - Application de détection de scènes dangereuses en extèrieur pour personne malvoyante",
                    theme: "Deep Learning - Académique",
                    description: "Application de détection d'éléments dangereux dans des environnements extérieurs pour personnes malvoyantes. Fine-tuning d'un modèle de vision mobile pour la détection d'obstacles. (basé sur les transformers). Si vous voulez en voir plus, consultez mon projet GitHub : DeepLearningProject_SceneHazardDetection",
                    tags: ["Projet Académique", "Python", "Pytorch", "Deep Learning", "CNN", "Transformers"],
                    link: "https://scene-hazard-detection.vercel.app/"
                },
                {
                    title: "Fine-Tuning LLM pour le Storytelling",
                    theme: "LLM - Académique",
                    description: "Pipeline ML end-to-end pour fine-tuner Qwen 2.5 7B sur la génération de scripts YouTube narratifs (EGO, Lemmino, Squeezie…). Projet d'apprentissage centré sur QLoRA 4-bit et Unsloth, de l'extraction jusqu'à l'évaluation LLM-as-Judge.",
                    tags: ["Projet Académique", "Python", "LLM", "QLoRA", "Unsloth", "HuggingFace", "vLLM", "FastAPI"],
                    link: "https://github.com/JordyBacherot/FineTunning_LLM_StoryTelling"
                },
                {
                    title: "Maison Bacherot — Site Vitrine",
                    theme: "Développement Web - Familial",
                    description: "Site vitrine pour la boucherie artisanale Maison Bacherot (Bourgogne).",
                    tags: ["Projet Personnel", "React", "Vite", "Tailwind CSS v4", "Framer Motion", "GSAP"],
                    link: "https://www.boucherie-mercurey.fr/"
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
                    name: "Data Science & AI",
                    skills: ["Machine Learning", "Deep Learning", "Scikit-Learn", "PyTorch", "TensorFlow/Keras"]
                },
                {
                    name: "AI Integration",
                    skills: ["LLMs", "RAG", "LangChain", "LangGraph", "LangFuse", "Ollama", "HuggingFace"]
                },
                {
                    name: "Web & Software Development",
                    skills: ["Python", "Java", "TypeScript", "React", "Flutter", "Hono", "SQL", "Git", "PostgreSQL/MariaDB", "Supabase", "Docker", "CI/CD", "VPS"]
                },
                {
                    name: "Cognitive Science & UX",
                    skills: ["Cognitive Psychology", "Neuroscience", "Statistics", "UX Design", "AI Ethics"]
                },
            ],
        },
        // Projects Section
        projects: {
            title: "Projects",
            details: "Details",
            seeProject: "See Website",
            items: [
                {
                    title: "RAG Chatbot Development",
                    theme: "AI Integration - Apprenticeship",
                    description: "Application enabling RAG chatbot integration into third-party apps via API, handling initial user queries on specific software.",
                    tags: ["Professional Project", "LLM", "RAG", "LangChain", "LangGraph", "LangFuse", "VLLM"]
                },
                {
                    title: "Steam Game Recommendation Algorithm",
                    theme: "Embedding + ANN - Academic",
                    description: "Game recommendation algorithm based on ANN (Approximate Nearest Neighbors) and user embeddings.",
                    tags: ["Academic Project", "Python", "Pytorch", "Embedding", "ANN"]
                },
                {
                    title: "Fullstack Flutter + Hono Recommendation App",
                    theme: "Web Development - Academic",
                    description: "Fullstack Steam game recommendation application based on the recommendation algorithm project. Deployed on a VPS using Docker. If you want to see more, check out the Github project : steam_reco_app",
                    tags: ["Academic Project", "Flutter", "Dart", "TypeScript", "Hono", "Bun", "MariaDB", "Docker", "VPS Deployment", "CI/CD"],
                    link: "https://steam-reco-app.jordy-bacherot.fr"
                },
                {
                    title: "Deep Learning - Outdoor Hazard Detection for the Visually Impaired",
                    theme: "Deep Learning - Academic",
                    description: "Hazard detection application for outdoor environments designed for visually impaired users. Fine-tuning of a mobile vision model for obstacle detection (transformer-based). If you want to see more, check out my Github project : DeepLearningProject_SceneHazardDetection",
                    tags: ["Academic Project", "Python", "Pytorch", "Deep Learning", "CNN", "Transformers"],
                    link: "https://scene-hazard-detection.vercel.app/"
                },
                {
                    title: "LLM Fine-Tuning for Storytelling",
                    theme: "LLM - Academic",
                    description: "End-to-end ML pipeline to fine-tune Qwen 2.5 7B on narrative YouTube script generation (EGO, Lemmino, Squeezie style…). Learning project focused on 4-bit QLoRA and Unsloth, from extraction to LLM-as-Judge evaluation.",
                    tags: ["Academic Project", "Python", "LLM", "QLoRA", "Unsloth", "HuggingFace", "vLLM", "FastAPI"],
                    link: "https://github.com/JordyBacherot/FineTunning_LLM_StoryTelling"
                },
                {
                    title: "Maison Bacherot — Showcase Website",
                    theme: "Web Development - Family",
                    description: "Showcase website for artisanal butcher Maison Bacherot (Burgundy).",
                    tags: ["Personal Project", "React", "Vite", "Tailwind CSS v4", "Framer Motion", "GSAP"],
                    link: "https://www.boucherie-mercurey.fr/"
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
