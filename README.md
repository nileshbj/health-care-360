# Health & Care 360° — motion update

Files at repository root: `index.html` (Sample 1), `sample2.html` (Sample 2), `sample1.css`, `sample2.css`, `typography.css`, and `assets/`.

This update makes the entrance and scroll animations visible after the visitor selects a language. It includes staggered language cards, animated homepage hero content and image, scroll reveals, and restrained hover motion. It respects `prefers-reduced-motion`.

To deploy, replace the existing HTML and CSS files in the GitHub repository and keep/merge the existing `assets` folder. Netlify should deploy automatically after the commit.


## Mobile layout repair
This update fixes the small-screen header and hero layout:
- The brand name stays on one line and the small tagline is hidden on narrow screens.
- The Sample 2 link, language selector and menu are sized to fit the mobile header.
- The hero becomes a true single-column layout on phones.
- The headline and paragraph use the full available width.
- The hero photograph moves below the text instead of sitting beside/behind it.
- Floating information cards stay within the photograph.

Replace `index.html`, `sample2.html`, `sample1.css`, and `sample2.css` in the GitHub repository. Keep `typography.css` and the existing `assets` folder.
