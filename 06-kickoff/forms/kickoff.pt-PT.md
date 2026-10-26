---
kind: form
title: "Antes de começarmos a construir"
intro: "Estas perguntas preparam a construção: quem decide, que contas existem e quem as detém, o que tem para conteúdos e imagem, como deve funcionar, e quando entra no ar. Bastam poucas palavras por resposta. Salte o que ainda não sabe, e decidimos juntos. Nunca escreva uma palavra-passe ou uma chave neste formulário. Diga-me quem detém a conta, e partilhamos o acesso de outra forma."
language: pt-PT
folder: kickoff
---
## O que faz a empresa, e para quem?

- key: business
- type: textarea
- hint: Duas ou três frases, como explicaria a um amigo.

## Quem decide o que o site ou a aplicação diz e faz?

- key: decides
- type: textarea
- hint: Nome e função. Se duas pessoas decidem juntas, indique as duas e diga como decidem.

## Quem testa o trabalho e dá o sim antes de entrar no ar?

- key: tests
- type: text
- hint: Um só nome é mais simples. Pode ser a mesma pessoa.

## Como quer enviar o seu feedback e as suas perguntas?

- key: channel
- type: select
- options: Por e-mail | Por WhatsApp | Por Slack | Num documento partilhado | Numa chamada curta todas as semanas

## Em que línguas deve falar o site ou a aplicação?

- key: site_languages
- type: text
- hint: A principal primeiro, depois as outras por ordem.

## Em que domínio vai ficar, e quem o detém?

- key: domain
- type: textarea
- hint: O endereço (exemplo.pt), o registador se o souber, e em nome de quem está o domínio. Sem palavras-passe.

## Existe hoje um site ou uma aplicação online? Onde está alojado?

- key: hosting_today
- type: textarea
- optional: yes
- hint: O endereço, o alojamento, e quem o paga. Deixe vazio se ainda não existir nada.

## Que e-mail usa no seu domínio?

- key: email_provider
- type: select
- options: Google Workspace | Microsoft 365 | Uma caixa do registador ou do alojamento | Outro fornecedor | Ainda não há e-mail no domínio

## De que endereço deve o site enviar os e-mails, e quem lê as respostas?

- key: email_sends
- type: textarea
- optional: yes
- hint: Por exemplo reservas@ para as confirmações, e a caixa que lê as respostas.

## O site vai receber pagamentos?

- key: payments
- type: select
- options: Não | Sim, e temos uma conta Stripe | Sim, e usamos outro fornecedor de pagamentos | Sim, mas ainda não temos conta de pagamentos

## Quem detém a conta de pagamentos, e em nome de que empresa?

- key: payments_owner
- type: text
- optional: yes
- hint: A conta recebe o dinheiro, por isso está em nome da sua empresa. Só o nome, sem palavra-passe.

## A que outras contas deve o site ligar-se?

- key: other_accounts
- type: textarea
- optional: yes
- hint: Uma ferramenta de reservas ou uma agenda, um CRM, o Perfil da Empresa no Google, Instagram ou Facebook, estatísticas, um programa de faturação. Uma por linha, com quem a detém.

## O que tem para a imagem da marca?

- key: brand
- type: textarea
- hint: Um logótipo e os seus formatos, cores, tipos de letra, um manual de marca, e quem os fez. Envie os ficheiros por e-mail ou numa pasta partilhada, não aqui.

## De onde vêm as fotografias e os vídeos?

- key: photos
- type: select
- options: Temos as nossas, prontas a usar | Temos algumas, e precisamos de mais | Precisamos de um fotógrafo | Imagens de banco de imagens servem

## Quem escreve os textos do site?

- key: words
- type: select
- options: Escrevemos nós | Escreve o Jamie a partir do que lhe dissermos | O nosso redator ou agência escreve | Reaproveitamos os textos do site antigo

## Quem fornece os textos legais: os termos e condições, a política de privacidade, a política de cookies?

- key: legal_texts
- type: select
- options: Já os temos | O nosso advogado ou contabilista escreve-os | Ainda não temos nenhum

## O que deve um visitante conseguir fazer, do início ao fim?

- key: visitor_path
- type: textarea
- hint: Descreva-me o caminho principal: chega, vê, pede, reserva ou compra, e o que recebe de volta.

## O que precisa de fazer nele todos os dias, com a sua equipa?

- key: team_tasks
- type: textarea
- optional: yes
- hint: Responder a pedidos, mudar preços ou disponibilidade, editar páginas, ler relatórios. Quem o faz, e no telemóvel ou no computador.

## O que é que vai substituir?

- key: replaces
- type: textarea
- optional: yes
- hint: A folha de cálculo, a ferramenta antiga, as mensagens que envia à mão: o que deixa de existir quando entrar no ar.

## Quando deve estar no ar, e porquê essa data?

- key: go_live
- type: textarea
- hint: Uma época, um evento, um lançamento. Se não houver data fixa, diga-o.

## O que deve estar pronto do seu lado antes de entrar no ar?

- key: before_launch
- type: textarea
- optional: yes
- hint: Os textos, as fotografias, os textos legais, uma conta a abrir, um contrato a assinar.

## Há mais alguma coisa que eu deva saber antes de começarmos?

- key: anything_else
- type: textarea
- optional: yes
