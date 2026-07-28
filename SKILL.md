---
name: nelitomorphism-design
description: Use this skill to generate well-branded interfaces and assets for Nelitomorphism, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the readme.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Non-negotiables when designing in Nelitomorphism:
- Dark only. Never invent a light theme.
- No skeletons or spinners — use Resolve / ResolveBlock / Chart's loading morph; structure always renders final.
- Compact density (30px controls, 13.5px base), mono for all numbers/labels/ids, sentence case, no emoji.
- One glowing element per view region; cyan is primary, violet is secondary/data.
