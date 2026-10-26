---
kind: form
title: "Avant de commencer le développement"
intro: "Ces questions préparent le développement : qui décide, quels comptes existent et à qui ils appartiennent, ce que vous avez pour le contenu et l'image, comment l'outil doit fonctionner, et quand il est mis en ligne. Quelques mots par réponse suffisent. Passez ce que vous ne savez pas encore, nous le réglerons ensemble. Ne mettez jamais un mot de passe ou une clé dans ce formulaire. Dites-moi à qui appartient le compte, et nous partagerons l'accès autrement."
language: fr-BE
folder: kickoff
---
## Que fait l'entreprise, et pour qui ?

- key: business
- type: textarea
- hint: Deux ou trois phrases, comme vous l'expliqueriez à un ami.

## Qui décide de ce que le site ou l'application dit et fait ?

- key: decides
- type: textarea
- hint: Le nom et la fonction. Si deux personnes décident ensemble, nommez les deux et dites comment vous décidez.

## Qui teste le travail et donne son accord avant la mise en ligne ?

- key: tests
- type: text
- hint: Un seul nom, c'est plus simple. Ce peut être la même personne.

## Comment voulez-vous envoyer vos retours et vos questions ?

- key: channel
- type: select
- options: Par e-mail | Par WhatsApp | Par Slack | Dans un document partagé | Lors d'un court appel chaque semaine

## Dans quelles langues le site ou l'application doit-il parler ?

- key: site_languages
- type: text
- hint: La langue principale d'abord, puis les autres dans l'ordre.

## Sur quel nom de domaine sera-t-il en ligne, et à qui appartient-il ?

- key: domain
- type: textarea
- hint: L'adresse (exemple.be), le registraire si vous le connaissez, et au nom de qui le domaine est enregistré. Pas de mot de passe.

## Un site ou une application est-il en ligne aujourd'hui ? Où est-il hébergé ?

- key: hosting_today
- type: textarea
- optional: yes
- hint: L'adresse, l'hébergeur, et qui le paie. Laissez vide si rien n'existe encore.

## Quelle messagerie utilisez-vous sur votre domaine ?

- key: email_provider
- type: select
- options: Google Workspace | Microsoft 365 | Une boîte du registraire ou de l'hébergeur | Un autre fournisseur | Pas encore d'e-mail sur le domaine

## De quelle adresse le site doit-il envoyer ses e-mails, et qui lit les réponses ?

- key: email_sends
- type: textarea
- optional: yes
- hint: Par exemple reservations@ pour les confirmations, et la boîte qui lit les réponses.

## Le site prendra-t-il des paiements ?

- key: payments
- type: select
- options: Non | Oui, et nous avons un compte Stripe | Oui, et nous utilisons un autre prestataire de paiement | Oui, mais nous n'avons pas encore de compte de paiement

## À qui appartient le compte de paiement, et au nom de quelle société ?

- key: payments_owner
- type: text
- optional: yes
- hint: Le compte reçoit l'argent, il est donc au nom de votre société. Le nom seulement, pas de mot de passe.

## À quels autres comptes le site doit-il se connecter ?

- key: other_accounts
- type: textarea
- optional: yes
- hint: Un outil de réservation ou un agenda, un CRM, la fiche Google Business, Instagram ou Facebook, des statistiques, un logiciel comptable. Un par ligne, avec à qui il appartient.

## Qu'avez-vous pour votre image de marque ?

- key: brand
- type: textarea
- hint: Un logo et ses formats, les couleurs, les polices, une charte graphique, et qui les a réalisés. Envoyez les fichiers par e-mail ou dans un dossier partagé, pas ici.

## D'où viennent les photos et les vidéos ?

- key: photos
- type: select
- options: Nous avons les nôtres, prêtes à l'emploi | Nous en avons quelques-unes, il en faut d'autres | Il nous faut un photographe | Des images de banque d'images conviennent

## Qui écrit les textes du site ?

- key: words
- type: select
- options: Nous les écrivons | Vous les écrivez à partir de ce que nous vous disons | Notre rédacteur ou notre agence les écrit | Nous reprenons les textes de l'ancien site

## Qui fournit les textes légaux : les conditions générales, la politique de confidentialité, la politique de cookies ?

- key: legal_texts
- type: select
- options: Nous les avons déjà | Notre avocat ou notre comptable les rédige | Nous n'en avons pas encore

## Que doit pouvoir faire un visiteur, du début à la fin ?

- key: visitor_path
- type: textarea
- hint: Décrivez-moi le parcours principal : il arrive, il regarde, il demande, réserve ou achète, et ce qu'il reçoit en retour.

## Que devez-vous y faire chaque jour, vous et votre équipe ?

- key: team_tasks
- type: textarea
- optional: yes
- hint: Répondre aux demandes, changer les prix ou les disponibilités, modifier des pages, lire des rapports. Qui le fait, et sur un téléphone ou un ordinateur.

## Que remplace-t-il ?

- key: replaces
- type: textarea
- optional: yes
- hint: Le tableur, l'ancien outil, les messages que vous envoyez à la main : ce qui s'arrête à la mise en ligne.

## Quand doit-il être en ligne, et pourquoi cette date ?

- key: go_live
- type: textarea
- hint: Une saison, un événement, un lancement. Si aucune date n'est fixée, dites-le.

## Qu'est-ce qui doit être prêt de votre côté avant la mise en ligne ?

- key: before_launch
- type: textarea
- optional: yes
- hint: Les textes, les photos, les textes légaux, un compte à ouvrir, un contrat à signer.

## Autre chose que je devrais savoir avant de commencer ?

- key: anything_else
- type: textarea
- optional: yes
