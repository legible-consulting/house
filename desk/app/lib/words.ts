import type { Language } from "./language";
import { NO_CONTACT, type Missing } from "./pool";

// The words of the salesman's pages in the three languages (salesman-pages-in-their-language of
// .icm/intake/salesman-desk): the shell's labels for the salesman, /pool, /pool/<id>, /sell,
// /sell/<key> and /preferences, and the flashes their actions return. One typed object per
// language, as /start's copy is (app/(auth)/start/copy.ts): a key missing in one language fails
// the build by the type. en-GB is written first; fr-BE and pt-PT are its translation, in the
// kit's register (tu), and Jamie reviews them on the pull request. No i18n library (the
// breakdown, Do not).
//
// A model word stays the model's in every language: a pool status, a channel, a country, a
// language code, a field key, a stage. A string marks one with backticks, outside the sentence's
// translation, and components/desk/phrase.tsx draws it in mono (why: one word for one thing
// across three languages, and the kit names them · 2026-10-28). A date stays ISO.
//
// A page only Jamie sees has no entry here. Jamie reads the desk's words in en-GB
// (lib/user.ts wordsLanguage): what he read before this file.

export interface Words {
  shell: { pool: string; sell: string; more: string; signOut: string; skip: string };
  back: (to: string) => string; // the back link, for a reader
  of: string; // "3 of 6", for a reader of a track
  status: string; // a reader's word for a row's place on the pool's track, and the filter's name
  due: { overdue: string; today: string; inDays: (n: number) => string };
  copy: { copied: string; byHand: string };
  save: string;
  fields: {
    company: string;
    slug: string;
    website: string;
    country: string;
    language: string;
    contact: string;
    role: string;
    email: string;
    phone: string;
    whatsapp: string;
    instagram: string;
    line: string;
    size: string;
    service: string;
    dealSize: string;
    source: string;
    ask: string;
    notes: string;
    nextAction: string;
    date: string;
    time: string;
    with: string;
    where: string;
    channel: string;
    note: string;
    name: string;
  };
  placeholders: { source: string; handle: string; ask: string; note: string };
  pool: {
    title: string;
    count: (n: number) => string;
    countOf: (shown: number, n: number) => string;
    search: string;
    filters: { all: string; open: string; mine: string; "handed-off": string; lost: string };
    dueNow: string;
    columns: { company: string; deal: string; sourced: string; touches: string; contact: string; updated: string };
    by: string; // before the sourcer on the phone's card
    empty: string;
    noMatch: (filter: string) => string;
    searchAll: string;
    beforeAdd: string;
    noFilterMatch: string;
    foot: string;
  };
  add: { title: string; short: string; what: string; submit: string };
  row: {
    meta: (by: string, added: string, updated: string) => string;
    handedOff: string;
    readOnly: (sourcer: string) => string;
    next: string;
    meeting: string;
    handoffPr: string;
    record: string;
    lost: string;
    lisbon: string;
    with: (who: string) => string;
    sourcer: (handle: string) => string; // the sourcer's option in With
    facts: string;
    touches: string;
    legends: { company: string; contact: string; fit: string; ask: string; meeting: string };
    slugHint: { handoff: string; link: string; free: string };
    lisbonTime: string;
    whereHint: string;
    whenMeeting: string; // after a meeting field's label in the Move card
    touchesWhat: string;
    noTouchYet: string;
    noTouch: string;
    logTouch: string;
    move: { title: string; needsTouch: string; to: string; reason: string; submit: string };
    ready: { title: string; before: string; after: string };
    fillFirst: (missing: string[]) => string;
    missing: Record<Missing, string>;
    handoff: { title: string; what: (previous: string) => string; check: string };
    noContact: { title: string; what: string; submit: string };
  };
  touch: {
    eyebrow: (n: number) => string;
    angles: { opener: string; "follow-up": string; "last note": string; "due for lost": string };
    lesson: (title: string) => string; // after the eyebrow, for a reader
    title: string;
    what: string;
    setLanguage: string;
    noDraft: (n: number, language: string) => string;
    copyDraft: string;
    openMail: string;
    openWhatsApp: string;
  };
  sell: {
    title: string;
    meta: (language: string, n: number) => string;
    readIn: string;
    parts: { jamie: string; system: string; reference: string };
    lessonMeta: (part: string, n: number, of: number) => string;
    lesson: string; // a reader's word for a lesson's place on its part's track
    booking: string;
    copyLink: string;
    lessons: string;
    previous: string;
    next: string;
  };
  preferences: { title: string; fromBrowser: string };
  errors: {
    signIn: string;
    noProspect: string;
    notWriter: string;
    noContact: (values: string[]) => string;
    slug: string;
    slugTaken: (slug: string) => string;
    slugSent: (slug: string) => string;
    nextAction: string;
    meetingNeeded: string; // the Move to `meeting` without its meeting
    meetingParts: string; // a meeting filled in part
    meetingAt: (status: string) => string; // a Save that clears the meeting where it must stay
    meetingDate: string;
    meetingTime: string;
    meetingWith: string;
    touchClosed: string;
    touchDate: string;
    channel: string;
    notAMove: string;
    lostReason: string;
    closedAlready: string;
    noContactNote: (values: string[]) => string;
    noContactBare: string;
    readyFrom: string;
    noHandle: (email: string) => string;
    exists: (slug: string) => string;
    noPr: string;
    merged: string;
    closed: string;
    stillOpen: string;
    oneOf: (key: string, list: readonly string[]) => string;
    companyRequired: string;
    sourceRequired: string;
    country: string;
    instagram: string;
    prefsOnly: string;
    chooseLanguage: string;
    noUserRow: string;
    notSaved: (why: string) => string;
    saved: (language: string) => string;
  };
}

// A model word in a sentence: `contacted`.
const k = (word: string) => `\`${word}\``;
const keys = (list: readonly string[]) => list.map(k).join(", ");

const EN: Words = {
  shell: { pool: "Pool", sell: "Sell", more: "More", signOut: "Sign out", skip: "Skip to content" },
  back: (to) => `Back to ${to}`,
  of: "of",
  status: "Status",
  due: { overdue: "overdue", today: "today", inDays: (n) => `in ${n} ${n === 1 ? "day" : "days"}` },
  copy: { copied: "Copied", byHand: "Copy by hand" },
  save: "Save",
  fields: {
    company: "Company",
    slug: "Slug",
    website: "Website",
    country: "Country",
    language: "Language",
    contact: "Contact",
    role: "Role",
    email: "Email",
    phone: "Phone",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    line: "Line",
    size: "Size",
    service: "Service",
    dealSize: "Deal size",
    source: "Source",
    ask: "Ask",
    notes: "Notes",
    nextAction: "Next action",
    date: "Date",
    time: "Time",
    with: "With",
    where: "Where",
    channel: "Channel",
    note: "Note",
    name: "Name",
  },
  placeholders: {
    source: "who referred, which event, which list",
    handle: "@handle",
    ask: "what they asked for, in your words",
    note: "what was said",
  },
  pool: {
    title: "Pool",
    count: (n) => `${n} prospects`,
    countOf: (shown, n) => `${shown} of ${n} prospects`,
    search: "Search the pool",
    filters: { all: "All", open: "Open", mine: "Mine", "handed-off": "Handed off", lost: "Lost" },
    dueNow: "Due now",
    columns: {
      company: "Company",
      deal: "Deal",
      sourced: "Sourced by",
      touches: "Touches",
      contact: "Contact",
      updated: "Updated",
    },
    by: "by",
    empty:
      "No prospect in the pool yet. Add one with Add a prospect; the site's contact form and the free look add theirs.",
    noMatch: (filter) => `No row matches in ${filter}.`,
    searchAll: "Search All",
    beforeAdd: "before you add a row.",
    noFilterMatch: "No prospect matches this filter.",
    foot: "An amber next action is due inside seven days; a red one is overdue. You write the rows you sourced; the others are read-only.",
  },
  add: {
    title: "Add a prospect",
    short: "Add",
    what: "Company and source now; the rest on the row's page.",
    submit: "Add",
  },
  row: {
    meta: (by, added, updated) => `sourced by ${by} · added ${added} · updated ${updated}`,
    handedOff: "Handed off: the client folder is the record now, so this row is read-only.",
    readOnly: (s) => `Read-only: only the sourcer, ${s}, and Jamie write this row.`,
    next: "Next:",
    meeting: "Meeting",
    handoffPr: "Handoff PR",
    record: "Record",
    lost: "Lost",
    lisbon: "Lisbon",
    with: (who) => `with ${who}`,
    sourcer: (h) => `${h}, the sourcer`,
    facts: "Facts",
    touches: "Touches",
    legends: { company: "Company", contact: "Contact", fit: "Fit", ask: "Ask", meeting: "Meeting" },
    slugHint: {
      handoff: "Fixed: the handoff names it.",
      link: "Fixed: a sent link names it.",
      free: "Lowercase words joined by hyphens.",
    },
    lisbonTime: "Lisbon time.",
    whereHint: "A place, a phone number or a link.",
    whenMeeting: `, when ${k("meeting")}`,
    touchesWhat: "Three touches over three weeks; a reply stops the cadence.",
    noTouchYet: "No touch logged yet. Log each one below when you send it.",
    noTouch: "No touch logged.",
    logTouch: "Log a touch",
    move: {
      title: "Move",
      needsTouch: `${k("contacted")} needs one logged touch.`,
      to: "To",
      reason: `Reason, when ${k("lost")}`,
      submit: "Move",
    },
    ready: {
      title: "Ready for Jamie",
      before: "Opens one PR on legible-consulting/house that creates",
      after: `at stage ${k("prospect")} from this row. Jamie merges; "Check the PR" then moves the row to ${k("handed off")}.`,
    },
    fillFirst: (missing) => `Fill first: ${missing.join(", ")}.`,
    missing: {
      contact: "contact",
      reach: "email or phone",
      country: "country",
      language: "language",
      ask: "ask",
      touch: "one logged touch",
      meeting: "the meeting's date, time and with whom",
    },
    handoff: {
      title: "Handoff",
      what: (previous) =>
        `Merged: the row moves to ${k("handed off")} and names its record. Closed without a merge: the row returns to ${k(previous)}.`,
      check: "Check the PR",
    },
    noContact: {
      title: "No contact",
      what: `When they say no, on any channel. The row goes to ${k("lost")} with the reason ${k(NO_CONTACT)}, the next action is cleared, and the row's email, phone and WhatsApp number go on the no-contact list for good: the pool takes no new row for them, from any salesman or from the site.`,
      submit: "They asked not to be contacted",
    },
  },
  touch: {
    eyebrow: (n) => `Touch ${n} of 3`,
    angles: {
      opener: "the opener",
      "follow-up": "the follow-up",
      "last note": "the last note",
      "due for lost": "due for lost",
    },
    lesson: (title) => `: the lesson ${title}`,
    title: "Next touch",
    what: "The draft for this touch in the prospect's language, from 01-prospecting/pitch/. Adapt it in your own words, send it from your own account, then log the touch above.",
    setLanguage: "Set the language in Facts to get the draft.",
    noDraft: (n, language) => `No draft for touch ${n} in ${k(language)} in 01-prospecting/pitch/.`,
    copyDraft: "Copy the draft",
    openMail: "Open in mail",
    openWhatsApp: "Open in WhatsApp",
  },
  sell: {
    title: "Sell",
    meta: (language, n) => `${language} · ${n} lessons`,
    readIn: "Read in",
    parts: { jamie: "Jamie and what he sells", system: "The system", reference: "The reference" },
    lessonMeta: (part, n, of) => `${part} · lesson ${n} of ${of}`,
    lesson: "Lesson",
    booking: "Booking link",
    copyLink: "Copy the link",
    lessons: "Lessons",
    previous: "Previous",
    next: "Next",
  },
  preferences: { title: "Preferences", fromBrowser: "From your browser. Save to keep it." },
  errors: {
    signIn: "Sign in first.",
    noProspect: "No such prospect.",
    notWriter: "Only the sourcer and Jamie write this row.",
    noContact: (values) =>
      `${values.join(" and ")}: they asked not to be contacted. The pool takes no row for it, on any channel (cadence.md, Channels).`,
    slug: "The slug is lower-case words joined by dashes, at most 40 characters.",
    slugTaken: (slug) => `${k(slug)} is taken by another prospect or by ${k(`clients/${slug}/`)}.`,
    slugSent: (slug) => `A form was sent to ${k(slug)}: the slug stays.`,
    nextAction: "Next action is a date, YYYY-MM-DD.",
    meetingNeeded: `${k("meeting")} needs its date, its time and with whom.`,
    meetingParts: "The meeting needs its date, its time and with whom.",
    meetingAt: (status) => `At ${k(status)} the meeting needs its date, its time and with whom.`,
    meetingDate: "The meeting's date is YYYY-MM-DD.",
    meetingTime: "The meeting's time is HH:MM, in Lisbon time.",
    meetingWith: "The meeting is with the sourcer or with Jamie.",
    touchClosed: `A touch is logged before the handoff, and not on a ${k("lost")} row.`,
    touchDate: "The touch's date is YYYY-MM-DD.",
    channel: `The channel is ${k("email")}, ${k("phone")}, ${k("whatsapp")} or ${k("in person")}.`,
    notAMove: "Not a move from here.",
    lostReason: `${k("lost")} needs its reason.`,
    closedAlready: "This row is closed already: they asked not to be contacted.",
    noContactNote: (values) => `Lost: ${k(NO_CONTACT)}. ${values.join(" and ")} get no new row, on any channel.`,
    noContactBare: `Lost: ${k(NO_CONTACT)}. The row has no email, phone or WhatsApp number, so search the pool for the company before each add.`,
    readyFrom: `${k("ready for Jamie")} goes from ${k("replied")} or ${k("meeting")}, once.`,
    noHandle: (email) => `${email} has no handle. Jamie sets it in the Neon console (db/schema.sql), then hand off again.`,
    exists: (slug) => `${k(`clients/${slug}/`)} already exists.`,
    noPr: "No handoff PR is open for this row.",
    merged: `Merged: ${k("handed off")}.`,
    closed: "Closed without a merge: the row is back where it was. Jamie's reason goes in notes.",
    stillOpen: "The PR is still open.",
    oneOf: (key, list) => `${k(key)} is one of ${keys(list)}.`,
    companyRequired: "Company is required.",
    sourceRequired: "Source is required: who referred, which event, which list.",
    country: "Country is a two-letter code: PT, BE, GB.",
    instagram: "Instagram is a handle: letters, digits, dots and underscores, at most 30.",
    prefsOnly: "Jamie and the salesmen only.",
    chooseLanguage: "Choose English, Français or Português.",
    noUserRow: "No user row has your id.",
    notSaved: (why) => `The language is not saved: ${why}`,
    saved: (language) => `Saved. The desk reads in ${language}.`,
  },
};

const FR: Words = {
  shell: { pool: "Pool", sell: "Vendre", more: "Plus", signOut: "Se déconnecter", skip: "Aller au contenu" },
  back: (to) => `Retour à ${to}`,
  of: "sur",
  status: "Statut",
  due: { overdue: "en retard", today: "aujourd'hui", inDays: (n) => `dans ${n} ${n === 1 ? "jour" : "jours"}` },
  copy: { copied: "Copié", byHand: "Copie à la main" },
  save: "Enregistrer",
  fields: {
    company: "Entreprise",
    slug: "Slug",
    website: "Site web",
    country: "Pays",
    language: "Langue",
    contact: "Contact",
    role: "Fonction",
    email: "E-mail",
    phone: "Téléphone",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    line: "Segment",
    size: "Taille",
    service: "Service",
    dealSize: "Taille de l'affaire",
    source: "Source",
    ask: "Demande",
    notes: "Notes",
    nextAction: "Prochaine action",
    date: "Date",
    time: "Heure",
    with: "Avec",
    where: "Où",
    channel: "Canal",
    note: "Note",
    name: "Nom",
  },
  placeholders: {
    source: "qui les a recommandés, quel événement, quelle liste",
    handle: "@compte",
    ask: "ce qu'ils ont demandé, avec tes mots",
    note: "ce qui a été dit",
  },
  pool: {
    title: "Pool",
    count: (n) => `${n} prospects`,
    countOf: (shown, n) => `${shown} sur ${n} prospects`,
    search: "Chercher dans le pool",
    filters: { all: "Tous", open: "Ouverts", mine: "Les miens", "handed-off": "Passés", lost: "Perdus" },
    dueNow: "À faire maintenant",
    columns: {
      company: "Entreprise",
      deal: "Affaire",
      sourced: "Apporté par",
      touches: "Prises de contact",
      contact: "Contact",
      updated: "Mis à jour",
    },
    by: "par",
    empty:
      "Aucun prospect dans le pool pour l'instant. Ajoutes-en un avec Ajouter un prospect ; le formulaire de contact du site et le free look ajoutent les leurs.",
    noMatch: (filter) => `Aucune ligne ne correspond dans ${filter}.`,
    searchAll: "Chercher dans Tous",
    beforeAdd: "avant d'ajouter une ligne.",
    noFilterMatch: "Aucun prospect ne correspond à ce filtre.",
    foot: "Une prochaine action en ambre est due dans les sept jours ; une en rouge est en retard. Tu modifies les lignes que tu as apportées ; les autres sont en lecture seule.",
  },
  add: {
    title: "Ajouter un prospect",
    short: "Ajouter",
    what: "L'entreprise et la source maintenant ; le reste sur la page de la ligne.",
    submit: "Ajouter",
  },
  row: {
    meta: (by, added, updated) => `apporté par ${by} · ajouté ${added} · mis à jour ${updated}`,
    handedOff: "Passé : le dossier du client fait foi maintenant, donc cette ligne est en lecture seule.",
    readOnly: (s) => `Lecture seule : seuls le vendeur qui l'a apportée, ${s}, et Jamie modifient cette ligne.`,
    next: "Ensuite :",
    meeting: "Rendez-vous",
    handoffPr: "PR de passation",
    record: "Fiche",
    lost: "Perdu",
    lisbon: "Lisbonne",
    with: (who) => `avec ${who}`,
    sourcer: (h) => `${h}, qui l'a apporté`,
    facts: "Faits",
    touches: "Prises de contact",
    legends: { company: "Entreprise", contact: "Contact", fit: "Adéquation", ask: "Demande", meeting: "Rendez-vous" },
    slugHint: {
      handoff: "Fixé : la passation le nomme.",
      link: "Fixé : un lien envoyé le nomme.",
      free: "Des mots en minuscules reliés par des tirets.",
    },
    lisbonTime: "Heure de Lisbonne.",
    whereHint: "Un lieu, un numéro de téléphone ou un lien.",
    whenMeeting: `, si ${k("meeting")}`,
    touchesWhat: "Trois prises de contact sur trois semaines ; une réponse arrête la cadence.",
    noTouchYet: "Aucune prise de contact enregistrée pour l'instant. Enregistre chacune ci-dessous quand tu l'envoies.",
    noTouch: "Aucune prise de contact enregistrée.",
    logTouch: "Enregistrer une prise de contact",
    move: {
      title: "Déplacer",
      needsTouch: `${k("contacted")} demande une prise de contact enregistrée.`,
      to: "Vers",
      reason: `Raison, si ${k("lost")}`,
      submit: "Déplacer",
    },
    ready: {
      title: "Prêt pour Jamie",
      before: "Ouvre une PR sur legible-consulting/house qui crée",
      after: `à l'étape ${k("prospect")} à partir de cette ligne. Jamie l'accepte ; « Vérifier la PR » passe ensuite la ligne à ${k("handed off")}.`,
    },
    fillFirst: (missing) => `Remplis d'abord : ${missing.join(", ")}.`,
    missing: {
      contact: "contact",
      reach: "e-mail ou téléphone",
      country: "pays",
      language: "langue",
      ask: "demande",
      touch: "une prise de contact enregistrée",
      meeting: "la date et l'heure du rendez-vous, et avec qui",
    },
    handoff: {
      title: "Passation",
      what: (previous) =>
        `Acceptée : la ligne passe à ${k("handed off")} et nomme sa fiche. Fermée sans être acceptée : la ligne revient à ${k(previous)}.`,
      check: "Vérifier la PR",
    },
    noContact: {
      title: "Pas de contact",
      what: `Quand ils disent non, sur n'importe quel canal. La ligne passe à ${k("lost")} avec la raison ${k(NO_CONTACT)}, la prochaine action est effacée, et l'e-mail, le téléphone et le numéro WhatsApp de la ligne vont sur la liste de non-contact pour toujours : le pool ne prend plus de nouvelle ligne pour eux, d'aucun vendeur ni du site.`,
      submit: "Ils ont demandé à ne pas être contactés",
    },
  },
  touch: {
    eyebrow: (n) => `Prise de contact ${n} sur 3`,
    angles: {
      opener: "l'ouverture",
      "follow-up": "la relance",
      "last note": "la dernière note",
      "due for lost": "due pour lost",
    },
    lesson: (title) => ` : la leçon ${title}`,
    title: "Prochaine prise de contact",
    what: "Le brouillon de cette prise de contact dans la langue du prospect, tiré de 01-prospecting/pitch/. Adapte-le avec tes propres mots, envoie-le depuis ton propre compte, puis enregistre la prise de contact plus haut.",
    setLanguage: "Indique la langue dans Faits pour obtenir le brouillon.",
    noDraft: (n, language) =>
      `Pas de brouillon pour la prise de contact ${n} en ${k(language)} dans 01-prospecting/pitch/.`,
    copyDraft: "Copier le brouillon",
    openMail: "Ouvrir dans l'e-mail",
    openWhatsApp: "Ouvrir dans WhatsApp",
  },
  sell: {
    title: "Vendre",
    meta: (language, n) => `${language} · ${n} leçons`,
    readIn: "Lire en",
    parts: { jamie: "Jamie et ce qu'il vend", system: "Le système", reference: "La référence" },
    lessonMeta: (part, n, of) => `${part} · leçon ${n} sur ${of}`,
    lesson: "Leçon",
    booking: "Lien de réservation",
    copyLink: "Copier le lien",
    lessons: "Leçons",
    previous: "Précédente",
    next: "Suivante",
  },
  preferences: { title: "Préférences", fromBrowser: "Tirée de ton navigateur. Enregistre pour la garder." },
  errors: {
    signIn: "Connecte-toi d'abord.",
    noProspect: "Ce prospect n'existe pas.",
    notWriter: "Seuls le vendeur qui l'a apportée et Jamie modifient cette ligne.",
    noContact: (values) =>
      `${values.join(" et ")} : ils ont demandé à ne pas être contactés. Le pool ne prend aucune ligne pour ça, sur aucun canal (cadence.md, Channels).`,
    slug: "Le slug, ce sont des mots en minuscules reliés par des tirets, 40 caractères au plus.",
    slugTaken: (slug) => `${k(slug)} est déjà pris par un autre prospect ou par ${k(`clients/${slug}/`)}.`,
    slugSent: (slug) => `Un formulaire a été envoyé à ${k(slug)} : le slug reste.`,
    nextAction: "La prochaine action est une date, YYYY-MM-DD.",
    meetingNeeded: `${k("meeting")} demande la date, l'heure et avec qui.`,
    meetingParts: "Le rendez-vous demande la date, l'heure et avec qui.",
    meetingAt: (status) => `À ${k(status)}, le rendez-vous demande la date, l'heure et avec qui.`,
    meetingDate: "La date du rendez-vous est YYYY-MM-DD.",
    meetingTime: "L'heure du rendez-vous est HH:MM, à l'heure de Lisbonne.",
    meetingWith: "Le rendez-vous est avec le vendeur qui l'a apporté ou avec Jamie.",
    touchClosed: `Une prise de contact s'enregistre avant la passation, et pas sur une ligne ${k("lost")}.`,
    touchDate: "La date de la prise de contact est YYYY-MM-DD.",
    channel: `Le canal est ${k("email")}, ${k("phone")}, ${k("whatsapp")} ou ${k("in person")}.`,
    notAMove: "Ce déplacement n'est pas possible d'ici.",
    lostReason: `${k("lost")} demande sa raison.`,
    closedAlready: "Cette ligne est déjà fermée : ils ont demandé à ne pas être contactés.",
    noContactNote: (values) =>
      `Perdu : ${k(NO_CONTACT)}. ${values.join(" et ")} n'auront plus de nouvelle ligne, sur aucun canal.`,
    noContactBare: `Perdu : ${k(NO_CONTACT)}. La ligne n'a ni e-mail, ni téléphone, ni numéro WhatsApp, donc cherche l'entreprise dans le pool avant chaque ajout.`,
    readyFrom: `${k("ready for Jamie")} se fait depuis ${k("replied")} ou ${k("meeting")}, une seule fois.`,
    noHandle: (email) =>
      `${email} n'a pas d'identifiant. Jamie le définit dans la console Neon (db/schema.sql), puis refais la passation.`,
    exists: (slug) => `${k(`clients/${slug}/`)} existe déjà.`,
    noPr: "Aucune PR de passation n'est ouverte pour cette ligne.",
    merged: `Acceptée : ${k("handed off")}.`,
    closed: "Fermée sans être acceptée : la ligne est revenue là où elle était. La raison de Jamie va dans les notes.",
    stillOpen: "La PR est toujours ouverte.",
    oneOf: (key, list) => `${k(key)} est l'une de ces valeurs : ${keys(list)}.`,
    companyRequired: "L'entreprise est obligatoire.",
    sourceRequired: "La source est obligatoire : qui les a recommandés, quel événement, quelle liste.",
    country: "Le pays est un code de deux lettres : PT, BE, GB.",
    instagram: "Instagram est un nom de compte : lettres, chiffres, points et tirets bas, 30 au plus.",
    prefsOnly: "Réservé à Jamie et aux vendeurs.",
    chooseLanguage: "Choisis English, Français ou Português.",
    noUserRow: "Aucune ligne d'utilisateur n'a ton id.",
    notSaved: (why) => `La langue n'est pas enregistrée : ${why}`,
    saved: (language) => `Enregistré. Le desk se lit en ${language}.`,
  },
};

const PT: Words = {
  shell: { pool: "Pool", sell: "Vender", more: "Mais", signOut: "Terminar sessão", skip: "Saltar para o conteúdo" },
  back: (to) => `Voltar a ${to}`,
  of: "de",
  status: "Estado",
  due: { overdue: "em atraso", today: "hoje", inDays: (n) => `em ${n} ${n === 1 ? "dia" : "dias"}` },
  copy: { copied: "Copiado", byHand: "Copia à mão" },
  save: "Guardar",
  fields: {
    company: "Empresa",
    slug: "Slug",
    website: "Site",
    country: "País",
    language: "Língua",
    contact: "Contacto",
    role: "Cargo",
    email: "Email",
    phone: "Telefone",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    line: "Segmento",
    size: "Dimensão",
    service: "Serviço",
    dealSize: "Dimensão do negócio",
    source: "Origem",
    ask: "Pedido",
    notes: "Notas",
    nextAction: "Próxima ação",
    date: "Data",
    time: "Hora",
    with: "Com",
    where: "Onde",
    channel: "Canal",
    note: "Nota",
    name: "Nome",
  },
  placeholders: {
    source: "quem os indicou, que evento, que lista",
    handle: "@conta",
    ask: "o que pediram, nas tuas palavras",
    note: "o que foi dito",
  },
  pool: {
    title: "Pool",
    count: (n) => `${n} contactos`,
    countOf: (shown, n) => `${shown} de ${n} contactos`,
    search: "Procurar no pool",
    filters: { all: "Todos", open: "Abertos", mine: "Os meus", "handed-off": "Passados", lost: "Perdidos" },
    dueNow: "Para fazer agora",
    columns: {
      company: "Empresa",
      deal: "Negócio",
      sourced: "Trazido por",
      touches: "Toques",
      contact: "Contacto",
      updated: "Atualizado",
    },
    by: "por",
    empty:
      "Ainda não há contactos no pool. Adiciona um com Adicionar um contacto; o formulário de contacto do site e o free look adicionam os seus.",
    noMatch: (filter) => `Nenhuma linha corresponde em ${filter}.`,
    searchAll: "Procurar em Todos",
    beforeAdd: "antes de adicionares uma linha.",
    noFilterMatch: "Nenhum contacto corresponde a este filtro.",
    foot: "Uma próxima ação a âmbar vence dentro de sete dias; uma a vermelho está em atraso. Escreves nas linhas que trouxeste; as outras são só de leitura.",
  },
  add: {
    title: "Adicionar um contacto",
    short: "Adicionar",
    what: "A empresa e a origem agora; o resto na página da linha.",
    submit: "Adicionar",
  },
  row: {
    meta: (by, added, updated) => `trazido por ${by} · adicionado ${added} · atualizado ${updated}`,
    handedOff: "Passado: a pasta do cliente é o registo agora, por isso esta linha é só de leitura.",
    readOnly: (s) => `Só de leitura: só quem a trouxe, ${s}, e o Jamie escrevem nesta linha.`,
    next: "A seguir:",
    meeting: "Reunião",
    handoffPr: "PR de passagem",
    record: "Registo",
    lost: "Perdido",
    lisbon: "Lisboa",
    with: (who) => `com ${who}`,
    sourcer: (h) => `${h}, quem o trouxe`,
    facts: "Factos",
    touches: "Toques",
    legends: { company: "Empresa", contact: "Contacto", fit: "Encaixe", ask: "Pedido", meeting: "Reunião" },
    slugHint: {
      handoff: "Fixo: a passagem usa-o.",
      link: "Fixo: um link enviado usa-o.",
      free: "Palavras em minúsculas ligadas por hífenes.",
    },
    lisbonTime: "Hora de Lisboa.",
    whereHint: "Um local, um número de telefone ou um link.",
    whenMeeting: `, se ${k("meeting")}`,
    touchesWhat: "Três toques em três semanas; uma resposta para a cadência.",
    noTouchYet: "Ainda nenhum toque registado. Regista cada um aqui em baixo quando o enviares.",
    noTouch: "Nenhum toque registado.",
    logTouch: "Registar um toque",
    move: {
      title: "Mover",
      needsTouch: `${k("contacted")} precisa de um toque registado.`,
      to: "Para",
      reason: `Motivo, se ${k("lost")}`,
      submit: "Mover",
    },
    ready: {
      title: "Pronto para o Jamie",
      before: "Abre um PR em legible-consulting/house que cria",
      after: `na etapa ${k("prospect")} a partir desta linha. O Jamie aceita-o; "Verificar o PR" passa depois a linha a ${k("handed off")}.`,
    },
    fillFirst: (missing) => `Preenche primeiro: ${missing.join(", ")}.`,
    missing: {
      contact: "contacto",
      reach: "email ou telefone",
      country: "país",
      language: "língua",
      ask: "pedido",
      touch: "um toque registado",
      meeting: "a data e a hora da reunião, e com quem",
    },
    handoff: {
      title: "Passagem",
      what: (previous) =>
        `Aceite: a linha passa a ${k("handed off")} e indica o registo. Fechado sem ser aceite: a linha volta a ${k(previous)}.`,
      check: "Verificar o PR",
    },
    noContact: {
      title: "Sem contacto",
      what: `Quando dizem que não, por qualquer canal. A linha passa a ${k("lost")} com o motivo ${k(NO_CONTACT)}, a próxima ação é apagada, e o email, o telefone e o número de WhatsApp da linha vão para a lista de não contacto para sempre: o pool não aceita nenhuma linha nova para eles, de nenhum vendedor nem do site.`,
      submit: "Pediram para não ser contactados",
    },
  },
  touch: {
    eyebrow: (n) => `Toque ${n} de 3`,
    angles: {
      opener: "a abertura",
      "follow-up": "o seguimento",
      "last note": "a última nota",
      "due for lost": "a prazo para lost",
    },
    lesson: (title) => `: a lição ${title}`,
    title: "Próximo toque",
    what: "O rascunho deste toque na língua do contacto, de 01-prospecting/pitch/. Adapta-o com as tuas palavras, envia-o da tua própria conta, e depois regista o toque acima.",
    setLanguage: "Define a língua em Factos para teres o rascunho.",
    noDraft: (n, language) => `Nenhum rascunho para o toque ${n} em ${k(language)} em 01-prospecting/pitch/.`,
    copyDraft: "Copiar o rascunho",
    openMail: "Abrir no email",
    openWhatsApp: "Abrir no WhatsApp",
  },
  sell: {
    title: "Vender",
    meta: (language, n) => `${language} · ${n} lições`,
    readIn: "Ler em",
    parts: { jamie: "O Jamie e o que vende", system: "O sistema", reference: "A referência" },
    lessonMeta: (part, n, of) => `${part} · lição ${n} de ${of}`,
    lesson: "Lição",
    booking: "Link de marcação",
    copyLink: "Copiar o link",
    lessons: "Lições",
    previous: "Anterior",
    next: "Seguinte",
  },
  preferences: { title: "Preferências", fromBrowser: "Do teu navegador. Guarda para a manter." },
  errors: {
    signIn: "Inicia sessão primeiro.",
    noProspect: "Este contacto não existe.",
    notWriter: "Só quem a trouxe e o Jamie escrevem nesta linha.",
    noContact: (values) =>
      `${values.join(" e ")}: pediram para não ser contactados. O pool não aceita nenhuma linha para isso, por nenhum canal (cadence.md, Channels).`,
    slug: "O slug são palavras em minúsculas ligadas por hífenes, no máximo 40 caracteres.",
    slugTaken: (slug) => `${k(slug)} já está ocupado por outro contacto ou por ${k(`clients/${slug}/`)}.`,
    slugSent: (slug) => `Foi enviado um formulário para ${k(slug)}: o slug fica.`,
    nextAction: "A próxima ação é uma data, YYYY-MM-DD.",
    meetingNeeded: `${k("meeting")} precisa da data, da hora e com quem.`,
    meetingParts: "A reunião precisa da data, da hora e com quem.",
    meetingAt: (status) => `Em ${k(status)}, a reunião precisa da data, da hora e com quem.`,
    meetingDate: "A data da reunião é YYYY-MM-DD.",
    meetingTime: "A hora da reunião é HH:MM, hora de Lisboa.",
    meetingWith: "A reunião é com quem trouxe o contacto ou com o Jamie.",
    touchClosed: `Um toque regista-se antes da passagem, e não numa linha ${k("lost")}.`,
    touchDate: "A data do toque é YYYY-MM-DD.",
    channel: `O canal é ${k("email")}, ${k("phone")}, ${k("whatsapp")} ou ${k("in person")}.`,
    notAMove: "Não é um movimento possível daqui.",
    lostReason: `${k("lost")} precisa do motivo.`,
    closedAlready: "Esta linha já está fechada: pediram para não ser contactados.",
    noContactNote: (values) =>
      `Perdido: ${k(NO_CONTACT)}. ${values.join(" e ")} não voltam a ter linha nova, por nenhum canal.`,
    noContactBare: `Perdido: ${k(NO_CONTACT)}. A linha não tem email, telefone nem número de WhatsApp, por isso procura a empresa no pool antes de cada adição.`,
    readyFrom: `${k("ready for Jamie")} faz-se a partir de ${k("replied")} ou ${k("meeting")}, uma só vez.`,
    noHandle: (email) =>
      `${email} não tem identificador. O Jamie define-o na consola Neon (db/schema.sql), e depois volta a passar o contacto.`,
    exists: (slug) => `${k(`clients/${slug}/`)} já existe.`,
    noPr: "Não há nenhum PR de passagem aberto para esta linha.",
    merged: `Aceite: ${k("handed off")}.`,
    closed: "Fechado sem ser aceite: a linha voltou para onde estava. O motivo do Jamie fica nas notas.",
    stillOpen: "O PR continua aberto.",
    oneOf: (key, list) => `${k(key)} é um destes valores: ${keys(list)}.`,
    companyRequired: "A empresa é obrigatória.",
    sourceRequired: "A origem é obrigatória: quem os indicou, que evento, que lista.",
    country: "O país é um código de duas letras: PT, BE, GB.",
    instagram: "O Instagram é um nome de conta: letras, algarismos, pontos e sublinhados, no máximo 30.",
    prefsOnly: "Só para o Jamie e os vendedores.",
    chooseLanguage: "Escolhe English, Français ou Português.",
    noUserRow: "Nenhuma linha de utilizador tem o teu id.",
    notSaved: (why) => `A língua não ficou guardada: ${why}`,
    saved: (language) => `Guardado. O desk lê-se em ${language}.`,
  },
};

export const WORDS: Record<Language, Words> = { "en-GB": EN, "fr-BE": FR, "pt-PT": PT };

export const words = (language: Language): Words => WORDS[language];
