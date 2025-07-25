# Questporter - Quest Schedule Exporter

A modern web app for exporting your University of Waterloo Quest class schedule to an iCalendar (.ics) file, which can be imported into Google Calendar, Apple Calendar, Outlook, and more.

<img width="1582" height="1030" alt="Screenshot of Questporter" src="https://github.com/user-attachments/assets/761396f3-49b9-4fe2-88f3-51f9521befcb" />

## Features
- Paste your Quest schedule page and export to iCal in seconds
- Supports all major calendar applications
- Customizable event summary and description
- Supports multiple date formats
- Modern, responsive UI built with Next.js and Tailwind CSS
- No data leaves your browser (privacy-first!)

## Local Installation

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/rawsab/quest-schedule-exporter.git
   cd quest-schedule-exporter
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Run the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use Questporter
1. Log in to [Quest](https://quest.pecs.uwaterloo.ca/psp/SS/?cmd=login) and navigate to your class schedule (in List View).
2. Copy the entire page (MacOS: ⌘+A, then ⌘+C / Windows: Ctrl+A, then Ctrl+C).
3. Paste into the "Quest Page Content" text box.
4. Select your date format, customize event summary/description if desired.
5. Click **Generate** to download your `.ics` file.
6. Import the file into your calendar app of choice.

## Credits
- Built by Rawsab Said
- Adapted from [Trinovantes/Quest-Schedule-Exporter](https://github.com/Trinovantes/Quest-Schedule-Exporter)
