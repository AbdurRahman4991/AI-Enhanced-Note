### Deployment Instructions

1. Clone this repo
2. Run: `composer install` and `npm install`
3. Set up `.env` with the following:
   - DB info
   - Google OAuth info
   - OPENAI_API_KEY
4. Run migrations: `php artisan migrate`
5. Run frontend: `npm run dev`
6. Access app at: http://localhost:8000

### Raw PHP Integration
- File: `public/raw_ai_summary.php`
- Laravel calls this via HTTP POST
