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

## Getting Started

To get your project up and running, follow these steps:

### API Keys

1. **OpenWeather API Key**:
   - Sign up at [OpenWeather](https://openweathermap.org/appid) to obtain your API key.
   - Once you have your API key, go to the relevant component in your Angular project where you will use it.
   - Update the `apiKey` variable in your component widget.component.ts
     ```
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
