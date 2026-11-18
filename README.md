# nicholasegner.com

Nicholas Egner’s personal portfolio, case-study library, video portfolio, and digital playground.

## Architecture

- Next.js App Router
- Content supplied by the shared [Egner Content Hub](https://github.com/egnica/egner-content-hub)
- Framer Motion and Lottie for focused interactive experiences
- AWS Amplify hosting and deployment
- Amazon S3 for media assets

The public portfolio routes are server-rendered where possible. Client components are limited to interactions such as navigation state, carousels, filters, animation, and video playback.

Set `CONTENT_API_BASE_URL` to override the production content-hub URL. Amplify writes configured server environment variables to `.env.production` during the build.

The `/support` page uses Stripe Elements. Configure `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY` for the same Stripe mode (test keys for testing, live keys to accept contributions). Set both in Amplify environment variables before sharing the page. The secret key is server-only and is copied into the server build environment by `scripts/write-server-env.mjs`.
