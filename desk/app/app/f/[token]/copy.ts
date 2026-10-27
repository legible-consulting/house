import type { FormLanguage } from "@/lib/forms";
import { COPY as START } from "@/app/(auth)/start/copy";

// /f/<token>'s own words, in the three languages of /start: the button, the confirmation and the
// two dead ends. The checks' words, the select's prompt and the optional mark are /start's
// (app/(auth)/start/copy.ts), so both pages say the same thing for the same fault. The questions are
// the link's frozen snapshot.

export interface LinkState {
  status: "idle" | "error" | "done" | "invalid" | "answered";
  message?: string; // the line above the form when it comes back
  errors?: Record<string, string>; // by question key
}

export interface LinkCopy {
  optional: string;
  choose: string;
  yes: string;
  no: string;
  submit: string;
  submitting: string;
  doneTitle: string;
  doneBody: string;
  invalidTitle: string;
  invalidBody: string; // the business email follows it
  answeredTitle: string;
  answeredBody: string;
}

const OWN: Record<FormLanguage, Omit<LinkCopy, "optional" | "choose" | "yes" | "no" | "submitting">> = {
  "en-GB": {
    submit: "Send my answers",
    doneTitle: "Thanks, that's in.",
    doneBody: "Your answers are with Jamie. He'll be in touch.",
    invalidTitle: "This link is not valid.",
    invalidBody: "It may be mistyped, or the form was withdrawn. Write to",
    answeredTitle: "You've sent this one in already.",
    answeredBody: "Your answers are with Jamie. There's nothing more to do here.",
  },
  "fr-BE": {
    submit: "Envoyer mes réponses",
    doneTitle: "Merci, c'est bien reçu.",
    doneBody: "Vos réponses sont chez Jamie. Il revient vers vous.",
    invalidTitle: "Ce lien n'est pas valide.",
    invalidBody: "Il est peut-être mal recopié, ou le formulaire a été retiré. Écrivez à",
    answeredTitle: "Vous avez déjà envoyé ce formulaire.",
    answeredBody: "Vos réponses sont chez Jamie. Il n'y a plus rien à faire ici.",
  },
  "pt-PT": {
    submit: "Enviar as respostas",
    doneTitle: "Obrigado, recebido.",
    doneBody: "As suas respostas estão com o Jamie. Ele entra em contacto.",
    invalidTitle: "Este link não é válido.",
    invalidBody: "Pode estar mal copiado, ou o formulário foi retirado. Escreva para",
    answeredTitle: "Já enviou este formulário.",
    answeredBody: "As suas respostas estão com o Jamie. Não há mais nada a fazer aqui.",
  },
};

export const COPY: Record<FormLanguage, LinkCopy> = Object.fromEntries(
  (Object.keys(OWN) as FormLanguage[]).map((l) => {
    const { optional, choose, yes, no, submitting } = START[l];
    return [l, { optional, choose, yes, no, submitting, ...OWN[l] }];
  }),
) as Record<FormLanguage, LinkCopy>;

export const errorsOf = (l: FormLanguage) => START[l].errors;
