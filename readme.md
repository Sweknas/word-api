# Word REST API

# Contents

- [Overview](#overview)
- [Installation](#installation)
- [Running](#running-in-development-mode)
- [Testing](#testing)
- [Building](#building)
- [API documentation](#api-documentation)
  - [Health check](#health-check)
  - [Count word frequency](#count-word-frequency)
  - [Errors](#errors)
- [Environment variables](#environment-variables)
- [Areas of improvement](#areas-of-improvement)

<br></br>

# Overview

This is word REST API that count frequency of words in a text.

If there is multiple words with same frequency, the words will be sorted on first occurrence.

The API is built using Node.js, Express and TypeScript. Testing is done using Jest and Supertest.

The project is currently only tested on Linux and with node version v22.11.0 LTS but should work on other versions as well.

<br></br>

# Installation

Requirements:

- Node.js (preferably latest LTS version)
- NPM

```bash
npm install
```

<br></br>

# Running in development mode

```bash
npm run start
```

<br></br>

# Testing

```bash
npm run test
```

<br></br>

# Building

The build command will build the typeScript code into a JavaScript and place it in the `/build` directory. It will also run the node server from the `/build` directory.

```bash
npm run build
```

<br></br>

# API documentation

## Health check

`GET http://localhost:5000`

### response body:

```json
{
  "status": "ok",
  "message": "Service is healthy"
}
```

<br></br>

## Count word frequency

`POST http://localhost:5000/word/frequency`

### request body:

```json
{
  "text": string, // required
  "count": number, // Optional, Default is 10
  "caseSensitive": boolean // Optional, Default is false
}
```

### response body:

```json
{
  "topWords": {
    "word": number
  }, // sorted from highest to lowest, incase the count is the same, the word will be sorted on first occurrence
  "totalWords": number
}
```

## Errors

In case of errors, the API returns a JSON object with an error property.
The response will also have a status code corresponding to the error.

### Status codes

| Status code | Description           |
| ----------- | --------------------- |
| 400         | Bad request           |
| 404         | Not found             |
| 500         | Internal server error |

### response:

```json
{
  "error": "Error message"
}
```

<br></br>

# Environment variables

| Variable       | Description                             | Default value |
| -------------- | --------------------------------------- | ------------- |
| `PORT`         | Port number                             | 5000          |
| `CORS_ORIGINS` | Comma separated list of allowed origins | `*`           |

<br></br>

# Areas of improvement

- Containerize the app (ex with docker)
- Logging
