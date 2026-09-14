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
