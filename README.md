<h1 align="center">Hi 👋, I'm Aleks Burdeinyi</h1>
<h3 align="center">Frontend developer from Ukraine</h3>


# WebTech

**WebTech** is a website that provides users with information about cryptocurrencies, nodes, testnets, and integration with ChatGPT. It is designed for those who want to learn more about the world of cryptocurrencies and stay updated with the latest news and guides.

## Features

The website offers the following sections:

- **Home**: Overview of the project and latest news.
- **Dashboard**: Here you can find weather information and cryptocurrency data. To display weather information, you need to obtain an API key from OpenWeather.
- **About Us**: Information about the team and the project's goals.
- **Blog**: Latest news and articles on cryptocurrencies.
- **Contact Support**: A form for contacting the support team.
- **ChatGPT**: An interactive chat for answering questions. You need to provide an API key for ChatGPT to get responses.

## Project Components

### 1. **Switch Component**
- Allows users to toggle between themes (light and dark mode).

### 2. **About Us Component**
- Provides information about the team and the project's goals.

### 3. **Banner Component**
- Displays cryptocurrency prices, refreshing automatically whenever the page is reloaded.

### 4. **Blog Component**
- Users can read and update information regarding the site.

### 5. **Footer Component**
- A footer displayed at the bottom of every page for additional information and links.

### 6. **Chat Component**
- An interactive ChatGPT component where users can ask questions and receive answers.

### 7. **Main Page Component**
- The homepage of the website, providing an overview of features and news.

### 8. **Loader Component**
- Displays a loading icon whenever content is being fetched or the application is processing.

### 9. **Navbar Component**
- A navigation menu that allows users to move between different sections of the site.

### 10. **NFT Node Component**
- Two components that provide information about NFTs (Non-Fungible Tokens) and various cryptocurrency nodes.

### 11. **Page Not Found Component**
- A 404 error page that is shown when a user navigates to a non-existent route.

### 12. **Support Component**
- A section where users can submit questions, which are sent automatically through GmailJS.

### 13. **Update Component**
- Displays a message indicating that work is in progress and informs users on the main page.

### 14. **Widget/MP3 Component**
- A component that combines cryptocurrency information with weather updates and music playback.

## Getting Started

To get your project up and running, follow these steps:

### API Keys

1. **OpenWeather API Key**:
   - Sign up at [OpenWeather](https://openweathermap.org/appid) to obtain your API key.
   - Once you have your API key, go to the relevant component in your Angular project where you will use it.
   - Update the `apiKey` variable in your component:
     ```typescript
     apiKey: string = "YOUR_API_KEY"; // Replace with your OpenWeather API key
     ```

2. **ChatGPT API Key**:
   - Sign up at [OpenAI](https://platform.openai.com/signup) to obtain your ChatGPT API key.
   - In the `chatgpt.service.ts` file, insert your API key as follows:
     ```typescript
     private apiKey: string = "YOUR_API_KEY"; // Replace with your ChatGPT API key
     ```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AleksBurdeinyi/WebTech.git
   cd WebTech

- 📫 How to reach me **olexandrovich20@gmail.com**

<h3 align="center">Connect with me:</h3>
<p align="center">
<a href="https://instagram.com/burdeinyi.1" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/instagram.svg" alt="burdeinyi.1" height="30" width="40" /></a>
  <a href="https://t.me/Riched1" target="blank">
  <img align="center" src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/svgs/brands/telegram.svg" alt="Riched1" height="30" width="40" />
</a>
</p>
