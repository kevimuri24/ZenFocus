# ZenFocus App

## Introduction

ZenFocus is a mindfulness and productivity web app designed to help users stay focused, manage their time effectively, and find inspiration. Whether you're studying, working, or simply need a mental break, ZenFocus provides a serene environment to enhance concentration.

## Core Features

### Customizable Timer
- Set precise focus intervals in hours, minutes, or seconds.
- Choose from Pomodoro-style sessions or longer deep work sessions.
- Options for automatic break times and customizable session lengths.

### Motivational Quotes
- Receive inspiring quotes and affirmations during breaks to recharge and stay motivated.
- Customize the type and frequency of quotes based on personal preferences.
- Save favorite quotes and create a personalized motivation library.

### Background Music Integration
- Access calming music from Spotify or other public music APIs.
- Create personalized playlists for different tasks.
- Built-in ambient sounds such as white noise, nature sounds, and instrumental music for enhanced focus.

### Minimalist Design
- Clean, distraction-free interface to maximize productivity.
- Customizable themes and background visuals to create a serene workspace.
- Simple navigation and user-friendly design to ensure a smooth experience.

## Development Note

The music app component of ZenFocus was developed by repurposing the original code provided by [GeeksforGeeks](https://www.geeksforgeeks.org/create-a-music-player-using-javascript/). By utilizing an overlay, the amount of code needed to shrink the app was significantly reduced. This enhancement ensures that the app remains lightweight and efficient.

## Benefits

ZenFocus is designed to help anyone who wants to work effectively using bursts of efficient work followed by successive breaks. The combination of a customizable timer, motivational quotes, and background music aims to enhance productivity and mindfulness.

## API Data and Usage

### Music API
- As most websites require strict security and access or subscriptions, I opted to integrate royalty free lofi music via a json library instead.

### Quote API
- Motivational quotes and affirmations are sourced from a public quote API.
- These snippets appear during breaks to encourage users.

### Weather API (Omitted)
- The integration of the weather API was omitted as it was felt that the app would not significantly benefit from it. Additionally, my current skill level isn't yet there to seamlessly incorporate it.

## Challenges and Solutions

### API Integration
- Ensuring seamless integration with Spotify and other APIs while maintaining a smooth user experience.
- Handling potential API rate limits and data retrieval issues.

### Personalization
- Balancing customization options without overwhelming users with too many settings.
- Ensuring that the app remains intuitive and easy
