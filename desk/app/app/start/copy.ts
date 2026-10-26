import { FORM_LANGUAGES, type FormLanguage } from "@/lib/forms";
import { LOCALES } from "@/lib/lead";

// /start's own words, in the three languages of the free look: the three identity labels, the
// button, the errors and the confirmation. The questions are the form's own file
// (01-prospecting/forms/free-look.<language>.md). Ported from the portfolio's messages at
// k0d0minio/jamienisbet 9d5db8c, without the dashes and with the voice's rules (core/voice.md).

// `?lang` to the form's language: en, fr or pt. Anything else is en (decision 9). The form posts
// the language itself (fr-BE), and that is kept.
export function languageOf(lang: unknown): FormLanguage {
  if (typeof lang !== "string") return "en-GB";
  return LOCALES[lang] ?? ((FORM_LANGUAGES as readonly string[]).includes(lang) ? (lang as FormLanguage) : "en-GB");
}

export interface StartState {
  status: "idle" | "error" | "done";
  message?: string; // the line above the form when it comes back
  errors?: Record<string, string>; // by field: name, email, phone, or a question's key
}

export interface Copy {
  identity: string;
  name: string;
  email: string;
  phone: string;
  phoneHint: string;
  questions: string;
  optional: string;
  choose: string;
  yes: string;
  no: string;
  submit: string;
  submitting: string;
  doneTitle: string;
  doneBody: string;
  errors: {
    name: string;
    email: string;
    emailInvalid: string;
    required: string;
    option: string;
    long: (max: number) => string;
    fix: string;
    failed: string;
  };
}

export const COPY: Record<FormLanguage, Copy> = {
  "en-GB": {
    identity: "How to reach you",
    name: "Your name",
    email: "Email",
    phone: "Phone or WhatsApp",
    phoneHint: "If you'd rather I call.",
    questions: "About the business",
    optional: "Optional",
    choose: "Choose one",
    yes: "Yes",
    no: "No",
    submit: "Send, and book the call",
    submitting: "Sending…",
    doneTitle: "Thanks, that's in.",
    doneBody:
      "I'll read it properly and reply within a day or two with a couple of times for the call. The page comes after that, and it's free.",
    errors: {
      name: "Please tell me your name.",
      email: "An email so I can reply.",
      emailInvalid: "That email doesn't look right.",
      required: "This one needs an answer.",
      option: "Choose one of the options.",
      long: (max) => `That's a lot. Keep it under ${max} characters.`,
      fix: "A couple of answers need a look.",
      failed: "Something went wrong sending this. Please try again, or email me directly.",
    },
  },
  "fr-BE": {
    identity: "Comment vous joindre",
    name: "Votre nom",
    email: "E-mail",
    phone: "Téléphone ou WhatsApp",
    phoneHint: "Si vous préférez que j'appelle.",
    questions: "À propos de l'activité",
    optional: "Facultatif",
    choose: "Choisissez",
    yes: "Oui",
    no: "Non",
    submit: "Envoyer, et réserver l'appel",
    submitting: "Envoi…",
    doneTitle: "Merci, c'est bien reçu.",
    doneBody:
      "Je le lis attentivement et je réponds sous un jour ou deux avec quelques créneaux pour l'appel. La page vient ensuite, et elle est gratuite.",
    errors: {
      name: "Dites-moi votre nom, s'il vous plaît.",
      email: "Un e-mail pour que je puisse répondre.",
      emailInvalid: "Cet e-mail ne semble pas correct.",
      required: "Cette question attend une réponse.",
      option: "Choisissez une des options.",
      long: (max) => `C'est beaucoup. Restez sous ${max} caractères.`,
      fix: "Quelques réponses méritent un coup d'œil.",
      failed: "Un problème est survenu à l'envoi. Réessayez, ou écrivez-moi directement.",
    },
  },
  "pt-PT": {
    identity: "Como o contactar",
    name: "O seu nome",
    email: "E-mail",
    phone: "Telefone ou WhatsApp",
    phoneHint: "Se preferir que lhe ligue.",
    questions: "Sobre o negócio",
    optional: "Opcional",
    choose: "Escolha",
    yes: "Sim",
    no: "Não",
    submit: "Enviar, e marcar a chamada",
    submitting: "A enviar…",
    doneTitle: "Obrigado, recebido.",
    doneBody:
      "Vou ler com atenção e respondo num dia ou dois com algumas horas para a chamada. A página vem depois, e é gratuita.",
    errors: {
      name: "Diga-me o seu nome, por favor.",
      email: "Um e-mail para eu poder responder.",
      emailInvalid: "Esse e-mail não parece correto.",
      required: "Esta pergunta precisa de uma resposta.",
      option: "Escolha uma das opções.",
      long: (max) => `É bastante. Fique abaixo de ${max} caracteres.`,
      fix: "Algumas respostas precisam de um olhar.",
      failed: "Algo correu mal no envio. Tente outra vez, ou escreva-me diretamente.",
    },
  },
};
