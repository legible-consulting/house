# 0.4 Video Indexing and Van Squared!

*The Foundation › Live Lessons · Author: Jake Van Clief (presenting a project by Van Neistat) · Source: YouTube (linked video, transcript on disk; the Skool page carries no text) · Length: 11:48 · Link: https://www.youtube.com/watch?v=mme027WZhgo*

## Summary

A short case study in which Jake frames and cuts down a longer video by Van Neistat, a filmmaker who wanted to search 26 years of footage on his own machine. The trick Jake taught him: do not search the video, search text. Pull a few frames per clip, have a vision model describe each frame once, store the descriptions with the filename, and search that tiny text index forever after. The lesson shows the problem sizing, the token-cost reasoning, the local-model workaround and a first test that exposed a bad label. The learner takes away a general pattern for turning a huge unstructured archive into a searchable text layer.

## Core concepts

- **Convert heavy data to light data once:** the expensive step (describing images) runs one time up front, and every later search touches only words. Nine terabytes of video becomes a text index of about twelve megabytes in his telling.
- **Sample, do not watch:** the first cost saver is extracting only a handful of frames per clip rather than showing the model the whole video: near the start, near the end, and one every 30 seconds in between.
- **Run the vision model locally:** the second saver is a free local model hosted on the user's own computer, trading token fees (estimated at four figures or more on a frontier model) for a few days of machine time.
- **Searchable by filename and description:** each description keeps the source file name, so a text match points straight to the clip.
- **Explain it without jargon:** Van's own role was translating the process into plain terms so he could brief an AI model, a theme Jake highlights as the real skill.
- **Test early and expect misses:** the first query for "dog" returned a clip with no dog, a reminder that labels are model guesses and need spot checks.

## Frameworks and methods

1. Reduce: extract a few frames per clip with a command-line video tool.
2. Describe: pass each frame to a vision model, write a short description plus the filename into a plain text or markdown index.
3. Search: query the text index, not the video; open the matching clips.
4. Spot check: try known queries, look at wrong hits, adjust labels.

## Tools, settings and resources

- **FFmpeg** — frame extraction — used to grab selected timestamps from each video.
- **Ollama** — local model host — recommended by Claude when asked for a free local vision model.
- **Moondream** — small local vision model — labelled the footage; two days of processing on a Mac mini.
- **Claude** — guided the setup after Jake's initial idea — no pricing or version given.
- **Full source video** — linked in the original video description; the captions name Van Neistat and a book recommendation (The Creative Way of Being, Rick Rubin); not on the Skool page.

## Claims and evidence

- 9 TB, 451 hours, 48,000 clips and a text index of about 12 MB (roughly 1/750,000 of the size) — figures from Van's own project, shown in narration only.
- Frontier-model labelling would cost "tens of thousands" or "four figures" of tokens — rough estimate, the two numbers differ within the clip and no pricing basis is given.
- Local model took about two days — anecdote; hardware beyond the Mac mini is not stated.
- First test returned a false "dog" match — honest miss, but no accuracy rate or evaluation is shown.
- The captions are a machine translation with garbled names and terms, so treat spellings and some wording as unreliable.

## Key moments

- [0:01] Setup: Van asked Jake for help searching years of local footage.
- [1:05] Van's non-technical framing of what he needed to learn.
- [2:01] Three requirements: frames, descriptions, link to the video.
- [3:04] Freeze the visual data as text so search is cheap.
- [4:01] Size comparison: a paperclip against a racing car.
- [5:02] AI describes the clips; token cost raised.
- [6:02] Frame sampling rule with FFmpeg.
- [7:01] Local model recommended to avoid token fees.
- [8:01] Ollama and Moondream setup, two days of processing.
- [9:03] First test, the false "dog" hit and what it taught.
- [11:09] Wrap and pointer to the full video.

## Apply to icm-workshop

- **O1 tool and concept research:** a clean example of "reduce, describe, search" for the concept library and for the "could build for a client" catalogue (archive search for media or legal clients); adopt as a short explainer with a verdict of watch, since it is a cut of someone else's project.
- **O4 training and coaching:** useful as a non-technical coaching story; adapt the sample, label, index method into a workshop exercise on text documents rather than video, which avoids local-model setup.
- **Weak relevance** to C1 to C3 and D1 to D4; do not force it into shared core or delivery.

## Open questions

- How was the quality of the labels measured beyond the single "dog" test?
- Does the full source video include the final tracker interface, and is it worth a deeper note?
