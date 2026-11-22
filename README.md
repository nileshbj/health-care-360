Health & Care 360° — shared header component update

Replace these files in the Cloudflare Pages/GitHub project root:
- hc360-header.html (new shared header and quick-links component)
- hc360-common-nav.js
- hc360-common-nav.css
- index.html
- health-insurance.html
- life-insurance.html
- corporate-solutions.html
- ohc.html

The five pages now contain a small mount point and retain their own language selector so existing page translation scripts continue to work. The common component supplies the topbar, main navigation, far-left mobile menu, language-selector placement, WhatsApp CTA and the four service quick links. The shared script initializes the menu and scroll progress after loading the component.

Upload all eight files to the repository root. No assets need replacing. The component is fetched from the same Cloudflare Pages origin, so publish hc360-header.html alongside the JS and CSS files.
