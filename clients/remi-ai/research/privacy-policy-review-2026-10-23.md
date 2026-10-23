---
title: "Remi AI: privacy-policy review, the answers to Morgane's flags"
kind: review
client: remi-ai
date: 2026-10-23
private: true
---
# Politique de confidentialité REMI AI — réponses aux espaces « PAR JAMIE »

Internal. Paths without a repo name are in the client repo `k0d0minio/remi-ai`, branch
`user-stories-2026-10`. The French blocks are the texts to paste into Morgane's document. Jamie
decided on the same day that REMI's recipes start from a verified base of template recipes, more
than twenty (D-34 there), and that the two policy promises below get a stub each.

Source : `01_Politique_de_confidentialite_REMI_AI_Pilote.docx` (Drive, version du 1er novembre 2026),
lu le 2026-10-23. Chaque bloc donne la phrase marquée, un texte à coller dans le document, et une
note pour Jamie (en anglais) qui dit ce qui est vrai aujourd'hui dans le code et ce qui est prévu.

Facts come from the repo on 2026-10-23 (`.icm/docs/ENV.md`, `.icm/docs/RETENTION.md`,
`packages/services/src/ai/context.ts`, the open stubs), from the Neon API and from the Vercel API.
Three things to settle before you answer her. They are at the top because they change the text.

## Three things to settle first

1. **The Blob store is public.** Store `document-storage` (team `remi21`, region `fra1`) reads
   `access: public` in the Vercel API. D-18, `ENV.md` and `RETENTION.md` promise a private store,
   and the adapter writes with `access: "private"` and reads through presigned URLs. The store
   holds 0 files today, so a private store can replace it with nothing to migrate. Triage stub:
   `.icm/intake/triage/blob-store-is-public.md`.
2. **No function region is pinned.** The decision of 2026-08-06 pins Vercel functions to the EU.
   The API returns no `serverlessFunctionRegion` for any of the six projects, so they run in the
   default region, Washington D.C. (`iad1`). The database is in Frankfurt. The policy's « Nous ne
   garantissons pas un hébergement exclusivement dans l'UE » is true for that reason too, not only
   for the AI. Pinning is one line per `vercel.json`. Triage stub:
   `.icm/intake/triage/vercel-function-regions-not-pinned.md`.
3. **Two promises the policy makes now have a stub each** (your decision, 2026-10-23). In-app
   consent withdrawal: `consent-and-data/consent-withdrawal-in-app`, P0, one section in the
   account settings. Deletion after 12 months of inactivity:
   `consent-and-data/inactive-account-deletion`, P1, a daily route with a notice at eleven months.
   The first deletion can fire twelve months after the first account at the earliest, so P1 keeps
   the promise. The texts below promise both.

The policy is dated 1 November 2026. Phase 1 (accounts, consent, questionnaire) lands by
14 November. On 1 November the app it describes does not exist yet. Say so to Morgane, or date
the version at the FunMedDev test.

---

## Section 2 — Données génétiques

**Marqué :** « Cette fonctionnalité peut ne pas être activée au début du pilote À CONFIRMER PAR JAMIE. »

**Texte proposé :**

> La saisie du génotype est prévue dès la première version du pilote, dans le questionnaire
> préparatoire, et uniquement après un consentement distinct. Son utilisation dans les calculs
> nutritionnels n'est activée qu'après validation par REMI AI de la table de correspondance avec
> les résultats des laboratoires. Tant que cette validation n'a pas eu lieu, le génotype est
> conservé mais n'influence aucune recommandation.

**Note:** `preparatory-questionnaire/genotype-section` is P0 in phase 1 and sits behind the
genetic consent (`consent-and-data/genetic-consent-and-optional-data`). `macroProfile()` returns
DEFAULT 45/30/25 until Morgane validates the A/H/M mapping (her question 3 of that breakdown).
So: collected from day one, used only after validation. If you prefer not to collect before the
mapping is validated, say so and the stub changes.

## Section 4 — Retrait du consentement

**Marqué :** « option de retrait dans votre espace personnel À COMPLÉTER PAR JAMIE. »

**Texte proposé :**

> Pour l'exercer : dans votre espace personnel, rubrique « Mes consentements », chaque
> consentement peut être retiré d'un geste, ou par e-mail à morgane@remiai.be. Le retrait prend
> effet immédiatement et est inscrit au journal d'audit. Le retrait du consentement génétique
> efface les trois génotypes enregistrés. Le retrait du consentement relatif aux données de santé
> arrête immédiatement toute génération de recommandations, de recettes et de suggestions ; votre
> praticien en est informé.

**Note:** stub `consent-and-data/consent-withdrawal-in-app` (P0) builds « Mes consentements »
inside `patient-home-navigation/profile-tab`. What withdrawing the mandatory `care` consent does
is Morgane's question 5 in the breakdown. The text above states the default: generation stops,
the space stays readable, the practitioner is informed, deletion stays a request. Self-service
deletion and export stay out of scope.

## Section 5 — Qui reçoit vos données ?

**Marqué :** « Jamie Nisbet et Lisbeth À COMPLÉTER : identité complète et fonction exacte. »

**Texte proposé (ta ligne) :** « Jamie Nisbet, directeur technique (CTO), responsable du
développement et de l'hébergement de l'application. » Lisbeth is Morgane's to fill.

**Marqué :** « L'accès est limité aux personnes qui en ont besoin pour leurs fonctions, et journalisé À COMPLÉTER PAR JAMIE. »

**Texte proposé :**

> L'accès est limité aux personnes qui en ont besoin pour leurs fonctions. Toute modification
> d'un dossier par l'équipe REMI est inscrite dans un journal d'audit (qui, quand, quoi), y
> compris la suppression d'un dossier. À partir de la version du pilote, chaque ouverture d'un
> dossier par un membre de l'équipe REMI qui n'est pas le praticien du patient est également
> journalisée, avec le motif de l'accès.

**Note:** today `audit_events` logs every write (operator and patient), the deletion included, and
survives the deletion with the pseudonym and no health data (`RETENTION.md`). Reads are not
logged today, and every operator sees every patient. `consent-and-data/data-access-scoping`
(phase 1, P0) adds practitioner scoping and logs each admin open with a one-line reason. The
second sentence of the text is only true once that stub ships.

**Marqué :** « hébergement de l'application (Vercel À CONFIRMER PAR JAMIE), base de données et sauvegardes À COMPLÉTER PAR JAMIE, fournisseurs de modèles d'intelligence artificielle À COMPLÉTER PAR JAMIE, outils de mesure d'audience et statistiques À COMPLÉTER PAR JAMIE. »

**Texte proposé :**

> Nos prestataires techniques, qui agissent sur nos instructions :
> – hébergement et exécution de l'application : Vercel Inc. (États-Unis) ;
> – base de données : Neon Inc., base PostgreSQL hébergée à Francfort (Allemagne, Union
>   européenne), avec un historique de restauration de six heures ;
> – stockage des fichiers (documents, photos) : Vercel Blob, espace privé hébergé à Francfort
>   (Allemagne) ;
> – envoi des e-mails (invitations, lien d'accès, e-mails de compte) : Resend Inc. (États-Unis) ;
> – modèles d'intelligence artificielle : via la passerelle Vercel AI Gateway, modèles Claude
>   d'Anthropic PBC (États-Unis) ; d'autres fournisseurs peuvent être testés pendant le pilote et
>   seront nommés dans cette politique avant leur utilisation ;
> – mesure d'audience : Vercel Web Analytics, sans cookie et sans suivi entre sites.
> Le code source est hébergé chez GitHub Inc. et ne contient aucune donnée personnelle.

**Note:** Vercel: team `remi21`, six projects. Neon: project `remi-ai`, PostgreSQL 17,
`aws-eu-central-1`, `history_retention_seconds: 21600`, provisioned through the Vercel
Marketplace. Blob: `document-storage`, `fra1`, public today (point 1 above). Resend: registered
mailer, used by marketing (contact form) and admin (invitations, patient link). AI: no adapter is
registered today, REMI calls no model. D-16 routes through the Vercel AI Gateway, cheapest
capable model first. `ai/index.ts` names Anthropic ids (haiku 4.5, sonnet 5, opus 5). Resend's
region (US or EU) is not in the repo. Check it in the Resend dashboard before you confirm the
country. No error tracker (Sentry rows stay unwired, decisions page 2026-08-06).

## Section 6 — Intelligence artificielle

**Marqué :** « Liste exacte des fournisseurs : À COMPLÉTER PAR JAMIE. »

**Texte proposé :**

> Fournisseurs utilisés pendant le pilote : Anthropic PBC (modèles Claude), appelés au travers de
> la passerelle Vercel AI Gateway. Tout autre fournisseur testé pendant le pilote sera ajouté ici
> avant son utilisation sur des données réelles.

**Marqué :** « La méthode technique de pseudonymisation doit encore être confirmée À COMPLÉTER PAR JAMIE. »

**Texte proposé :**

> Méthode : les données envoyées aux modèles sont assemblées par une fonction dont la structure ne
> contient aucun champ nom, prénom, adresse e-mail ni identifiant de connexion. Le patient y est
> désigné par un pseudonyme interne. La date de naissance n'est jamais transmise, seul l'âge en
> années l'est. Chaque appel à un modèle est inscrit dans un journal interne (date, patient
> pseudonymisé, blocs de données transmis).

**Note:** `context.ts`: `PatientContextInput` has no `fullName`, `email` or `shareToken` field,
the guarantee is the type. Age is computed, the birth date never enters. Every generation lands
in `ai_generations` once `recipe-space/ai-gateway-adapter` ships (D-16). Today the only export is
« Copier le contexte », logged as `context.exported`, pasted by Morgane into a model of her own.

**Marqué :** « la liste exacte des données transmises aux modèles est À COMPLÉTER PAR JAMIE. »

**Texte proposé :**

> Données transmises aux modèles : pseudonyme, âge, sexe utilisé pour le calcul, taille, poids,
> motif de consultation et objectifs, régime alimentaire, allergies, intolérances, aliments évités
> et préférences, goût pour la cuisine, temps disponible et budget, médicaments et compléments
> déclarés, les recommandations validées par le praticien (aliments à favoriser, à limiter, en
> éviction totale, organisation des repas, jeûne, besoins énergétiques et protéiques, répartition
> des macronutriments), la saison, les recettes des semaines précédentes, et, pour la fonction
> « Suggestion d'amélioration » et « Je suis au restaurant », la photo ou la description du repas
> ou du menu que vous envoyez. Le génotype lui-même n'est pas transmis ; seule la répartition des
> macronutriments qui en découle l'est.

**Note:** today's block (`context.ts`): pseudonym, age, sex, objective, diet, allergies,
intolerances, constraints, preferences, likes cooking, cooking time, budget, medications,
supplements, goals, the instruction, the active recommendations, the supplement protocol, the
essentials, and the summary (off by default). Phase 4 adds what `weekly-plan-generation` lists:
energy and protein targets, the macro split (DEFAULT or genotype-derived, not the genotype),
meal structure, fasting, directives, season, the previous two weeks. Stories 28 and 29 add
photos (D-29). Height and weight are in the profile but not in today's block. Decide whether they
go in. The text above assumes yes, because energy needs rest on them.

**Marqué :** « Conservation par les fournisseurs, transferts internationaux et utilisation éventuelle des données pour entraîner des modèles : À COMPLÉTER PAR JAMIE. »

**Texte proposé :**

> Les modèles sont exécutés aux États-Unis. Le transfert est encadré par les clauses contractuelles
> types de la Commission européenne, intégrées aux conditions commerciales des fournisseurs. Selon
> les conditions commerciales d'Anthropic, les données envoyées par l'interface de programmation ne
> servent pas à entraîner ses modèles et sont conservées au plus trente jours à des fins de
> sécurité, puis supprimées. REMI AI vise une exécution des modèles dans l'Union européenne après
> le pilote. En l'absence de confirmation écrite d'un fournisseur, aucune garantie n'est donnée.

**Note:** the two claims about Anthropic match its published commercial terms as I know them (no
training on API inputs and outputs, retention up to 30 days, zero-retention on request). Confirm
them against the current Anthropic DPA and the Vercel AI Gateway terms before Morgane publishes.
Whether the gateway stores request bodies is not in the repo. D-16 says EU-hosted inference later.

## Section 7 — Hébergement et conservation

**Marqué :** « l'application est hébergée chez Vercel À CONFIRMER PAR JAMIE. Localisation de la base de données, pays de stockage et emplacement des sauvegardes : À COMPLÉTER PAR JAMIE. »

**Texte proposé :**

> Hébergement : l'application est hébergée chez Vercel. La base de données est hébergée à
> Francfort (Allemagne). Les fichiers sont stockés à Francfort (Allemagne). La base de données
> conserve un historique de restauration de six heures ; REMI AI ne tient aucune autre copie de
> sauvegarde. Le code applicatif peut être exécuté sur des serveurs situés hors de l'Union
> européenne ; les modèles d'intelligence artificielle le sont (voir point 6).

**Note:** the last sentence is true today because no function region is pinned (point 2). Pin
`fra1` and the sentence becomes « est exécuté dans l'Union européenne ». Neon backups: the six
hours of point-in-time history are the only copy. A deleted row leaves Neon after six hours.

**Marqué :** « Cette suppression est À CONFIRMER PAR JAMIE sur le plan technique »

**Texte proposé :**

> Suppression après 12 mois d'inactivité : un compte sans connexion ni activité pendant onze mois
> reçoit un e-mail qui annonce la date de suppression, avec copie au praticien. Une connexion
> avant cette date annule la suppression. Sans connexion, le compte et toutes ses données sont
> supprimés au douzième mois, selon les modalités du paragraphe suivant. Il s'agit d'un choix de
> fonctionnement de REMI, et non d'une obligation légale. Une obligation légale de conservation
> peut suspendre cette suppression ; vous en êtes alors informé(e).

**Note:** stub `consent-and-data/inactive-account-deletion` (P1): a daily cron route on
`apps/web`, a notice at eleven months, the deletion at twelve through the console's cascade, an
admin hold that blocks it. Inactivity counts from the later of the last sign-in and the last
patient write (your question 2 in the breakdown, default yes). Which legal rules may block it is
Morgane's question 6, default none during the pilot. The text replaces her « À CONFIRMER PAR
JAMIE » sentence and the one after it.

**Marqué :** « Suppression des photos de repas, des historiques, des données génétiques et des sauvegardes : modalités À COMPLÉTER PAR JAMIE. »

**Texte proposé :**

> La suppression d'un dossier retire en une opération, sans copie de secours ni corbeille : le
> profil, le questionnaire, les génotypes, les recommandations, les recettes et suggestions
> générées, les photos et descriptions de repas, les documents et les fichiers associés, et les
> messages. Les fichiers sont supprimés du stockage avant le dossier. Les copies présentes dans
> l'historique de restauration de la base de données disparaissent dans les six heures. Le
> journal d'audit conserve la trace des actions (qui, quand, quoi) sous le pseudonyme, sans
> aucune donnée de santé. Les données déjà transmises à un fournisseur de modèles suivent la
> durée de conservation de ce fournisseur (point 6).

**Note:** `RETENTION.md` describes the cascade and the file sweep. Photos (D-29) and generated
recipes (`recipe-structure`) are new tables; their stubs carry « deleted with the patient » as a
criterion, and `recipe-structure` must update `RETENTION.md`. The six hours come from Neon's
`history_retention_seconds`.

## Section 8 — Sécurité

**Marqué :** « sauvegardes et procédure de gestion des incidents À COMPLÉTER PAR JAMIE. »

**Texte proposé :**

> Mesures en place : authentification par mot de passe (haché, jamais stocké en clair) et session
> signée ; chiffrement des échanges (TLS) et chiffrement au repos par nos hébergeurs ; droits
> d'accès par rôle (praticien, équipe REMI), chaque praticien ne voyant que ses patients ; journal
> d'audit de toute modification et de tout accès de l'équipe REMI ; historique de restauration de
> la base de données ; secrets et clés d'accès hors du code source. Une procédure écrite de
> gestion des incidents, avec notification à l'Autorité de protection des données dans les 72
> heures lorsque requis, est établie avant le lancement du pilote.

**Note:** true today: admin auth is an scrypt hash and an HMAC-signed cookie
(`packages/services/src/auth/`), TLS everywhere, `audit_events`, secrets in Vercel and GitHub
only, Neon history. Planned by phase 1: patient accounts through the auth seam (D-26, D-28,
default Neon Auth), roles `admin` and `practitioner` (D-27), access scoping and logged admin
opens. At-rest encryption is Neon's and Vercel's, not ours: confirm in their documentation. **No
incident procedure exists anywhere.** The last sentence commits you to writing one page before
1 December. It is owner work, not a stub.

## Section 9 — Cookies

**Marqué :** « Outils et modalités exactes : À COMPLÉTER PAR JAMIE. »

**Texte proposé :**

> Cookies strictement nécessaires : le cookie de session qui vous maintient connecté(e), et un
> cookie technique d'une heure utilisé pour l'affichage d'un aperçu. Aucun cookie publicitaire.
> La mesure d'audience (Vercel Web Analytics) fonctionne sans cookie et sans suivi entre sites.
> Pendant le pilote, aucun cookie non essentiel n'est déposé, et aucun bandeau de consentement
> n'est donc affiché. Si un outil déposant des cookies non essentiels est ajouté, un bandeau de
> consentement sera mis en place avant son activation.

**Note:** cookies today: `remi-admin-session` (httpOnly, signed), `remi-link-preview` (one hour),
`remi-role` (development only). `@vercel/analytics` is mounted on all six apps and sets no cookie
per Vercel's documentation. No consent banner exists in the code. The policy's section 9 as
written assumes a banner. Either the text above (no banner, no non-essential cookies) or a banner
stub. Morgane's lawyer should confirm that cookieless analytics needs no banner in Belgium.

---

## Marqués pour d'autres que toi

Not yours, listed so nothing is lost: the company number and the date of constitution (section 1
and the legal notice), the processor-versus-joint-controller qualification « À VALIDER » (a
lawyer), Lisbeth's identity and role (Morgane), the end-of-pilot fate of the data « À COMPLÉTER »
(Morgane), « contact à confirmer » in section 10 (Morgane).
