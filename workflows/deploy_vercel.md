---
description: Deploy the application to Vercel
---

# How to Deploy to Vercel

1.  **Install Vercel CLI** (if not already installed):
    ```bash
    npm i -g vercel
    ```

2.  **Login to Vercel**:
    ```bash
    vercel login
    ```

3.  **Deploy**:
    Run the following command in the project root:
    ```bash
    vercel
    ```
    - Follow the prompts (Set up and deploy? [Y/n] -> Y).
    - Select the scope (your account).
    - Link to existing project? [N].
    - Project name? (Press Enter for default).
    - In which directory is your code located? (Press Enter for `./`).
    - Want to modify these settings? [N].

4.  **Production Deployment**:
    Once you are happy with the preview, deploy to production:
    ```bash
    vercel --prod
    ```
