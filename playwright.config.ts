import { defineConfig, devices } from '@playwright/test';
import dotenv from "dotenv"
dotenv.config();

export default defineConfig({
  timeout: 30 * 1000,
  retries: 0,
  testDir: './app/tests/',
  reporter: [['html']], 

  use: {
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'UI Tests',
      testDir: './app/tests/ui',
      use: {
        browserName: 'chromium',
        ...devices['Desktop Chrome'],
        baseURL: `${process.env.BASE_URL}`, 
        headless: true,
      },
    },
    {
      name: 'API Tests',
      testDir: './app/tests/api',
      use: {
        baseURL: `${process.env.BASE_API_URL}`, 
        trace: "off"
      },

    },
  ],
});

