import { test as setup, expect } from '@playwright/test';
import fs from 'fs-extra'

const authFile = 'playwright/.auth/user.json';


// Function to delete all files within a directory
async function emptyDirectory(directory) {
  try {
    fs.emptyDir(directory);
    console.log(`Successfully emptied directory: ${directory}`);
  } catch (err) {
    console.error(`Error emptying directory: ${directory}`, err);
  }
}

// Call the function to empty the directory before running the tests
emptyDirectory('./screenshots'); // Provide the directory path you want to empty

// Function to generate random string
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Generate random email, username and password 
const desired_email = generateRandomString(8) + "@gmail.com";
const desired_username = "tester" + Math.floor(Math.random() * 1000);
const desired_password = generateRandomString(8) + "@" + Math.floor(Math.random() * 10000) + "!";



setup('Register', async ({ page }) => {

//Navigate to Website
await page.goto('https://zachperry.online/register');
await page.screenshot({ path: 'screenshots/1-register.png' });

//Registed a new account
await page.getByRole('textbox').first().fill(desired_username);
await page.getByRole('textbox').nth(1).fill(desired_email);
await page.getByRole('textbox').nth(2).fill(desired_password);
await page.screenshot({ path: 'screenshots/2-filledin_registration.png' });

await page.getByRole('button').first().click();
console.log('Registered');

console.log("New account created")
console.log("Email: " + desired_email)
console.log("Username: " + desired_username)
console.log("Pasword: " + desired_password)
await page.screenshot({ path: 'screenshots/3-registered.png' });


})




setup('Login', async ({ page }) => {

//Navigate to Website
await page.goto('https://zachperry.online/login');
await page.screenshot({ path: 'screenshots/4-login.png' });
 
//Log Into the new Account
console.log("Attempting to log into the newly created account");
await page.screenshot({ path: 'screenshots/debug.png' });

await page.getByRole('textbox').first().fill(desired_email);
await page.getByRole('textbox').nth(1).fill(desired_password);
//Debug to throw error and get all button id's
await page.getByRole('button').click();
console.log('Clicked');

await page.screenshot({ path: 'screenshots/5-Logged_in.png' });
console.log("Logged into new Account")


//Make Sure you are logged in by accessing the All Videos Page
const all2 = (await page.getByRole('link').all());
console.log(all2)
await page.getByRole('link').first().click();
await page.screenshot({ path: 'screenshots/5-Clicked_all_videos.png' });

const pagetitle = await page.title();
console.log("Page Title: " + pagetitle)

}
);
