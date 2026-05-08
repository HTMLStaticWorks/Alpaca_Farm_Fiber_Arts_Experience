# Alpaca Farm & Fiber Arts Experience
## Premium Website Template — v1.0.0

---

## Quick Start
1. Unzip the downloaded file
2. Open `index.html` in your browser to preview
3. Deploy by uploading all files to your web host

## Pages Included
| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Main landing — hero, offerings, gallery, products, adoption teaser, calculator, testimonials |
| Home 2 | `pages/home2.html` | Alternate hero with split-screen layout, seasonal experiences, dark features band |
| About | `pages/about.html` | Family story, team profiles with photos, values, stats |
| Services | `pages/services.html` | Tours, workshops (with schedule table), adoption program, farm shop |
| Blog/Journal | `pages/blog.html` | Post grid with featured article, sidebar, filters |
| Contact | `pages/contact.html` | Tabbed forms (message/booking/workshop), map placeholder, FAQ accordion |
| Login | `pages/login.html` | No-header auth card with farm background image |
| Register | `pages/register.html` | Account creation with password strength meter, terms checkbox |
| 404 | `pages/404.html` | Split-screen layout with farm image + error content |
| Coming Soon | `pages/coming-soon.html` | Countdown timer + waitlist form over full-bleed farm photo |

## Color System
```css
--color-primary: #3A5A40;   /* Deep Sage Green */
--color-secondary: #F5ECD7; /* Warm Cream */
--color-accent: #C4622D;    /* Terracotta */
--color-earth: #8B6F47;     /* Warm Brown */
--color-gold: #D4A853;      /* Wheat Gold */
```

## Changing Colors
Edit CSS variables in `assets/css/style.css` `:root { }` block.

## Connecting Forms
**Formspree:** Add `action="https://formspree.io/f/YOUR_ID" method="POST"` to the contact form tag in `contact.html`.

**Netlify Forms:** Add `netlify` attribute to the form and `<input type="hidden" name="form-name" value="contact">`.

## Connecting Newsletter
Replace `.newsletter-form` action with your Mailchimp or ConvertKit embed URL.

## Google Maps
Replace the map placeholder div in `contact.html` with:
```html
<iframe src="https://www.google.com/maps/embed?pb=YOUR_URL" width="100%" height="200" style="border:0;border-radius:12px" allowfullscreen loading="lazy"></iframe>
```

## Calendar Booking
Replace the calendar placeholder in `contact.html` with your Calendly widget:
```html
<div class="calendly-inline-widget" data-url="https://calendly.com/YOUR_NAME/farm-tour" style="min-width:320px;height:380px;"></div>
<script src="https://assets.calendly.com/assets/external/widget.js" async></script>
```

## Stripe / PayPal
Replace the disabled payment buttons in `services.html` with your actual payment links:
```html
<a href="https://buy.stripe.com/YOUR_LINK" class="btn btn-primary">Pay with Stripe</a>
```

## Image Credits
All photos sourced from Unsplash (free to use):
- Alpaca portraits: unsplash.com/photos/558618666-fcd25c85cd64
- Farm landscapes: unsplash.com/photos/574323347407-f5e1ad6d020b
- Fiber/yarn: unsplash.com/photos/1607349913338-fca6f7fc42d0
- Workshops: unsplash.com/photos/1550159930-40066082a4fc

## Key Features
- ✅ Real Unsplash images in hero + all page sections
- ✅ Dark/Light mode (system preference auto-detected)
- ✅ RTL layout support
- ✅ Tour cost calculator (JS)
- ✅ Workshop schedule table with status badges
- ✅ Alpaca adoption cards with status (available/adopted)
- ✅ Product shop with wishlist toggle
- ✅ Tabbed contact forms (message / booking / workshop)
- ✅ FAQ accordion
- ✅ Countdown timer (coming-soon page)
- ✅ Password strength meter
- ✅ File upload with drag & drop
- ✅ Form validation with live error messages
- ✅ Scroll animations + counter animations
- ✅ Fully responsive 360px → 1440px
- ✅ JSON-LD structured data
- ✅ sitemap.xml + robots.txt
- ✅ WCAG 2.1 AA accessible

## Credits
- Google Fonts: Playfair Display, DM Sans, Lato (Open Font License)
- Remix Icons v3.5 (Apache 2.0)
- Unsplash Images (Unsplash License — free for commercial use)

## Support
Review this README for setup guidance. For third-party integrations, refer to the official documentation of Formspree, Calendly, Stripe, Mailchimp etc.

---
© 2024 Alpaca Farm & Fiber Arts Experience Template
