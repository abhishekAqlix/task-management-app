const puppeteer = require('puppeteer');


const generatePDF= async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // Open the frontend page where the notifications are displayed
    await page.goto('http://localhost:3000/task', {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    // Extract notification messages from the frontend
    const notifications = await page.evaluate(() => {
      const notificationElements = document.querySelectorAll('.dropdown-menu .dropdown-item');
      return Array.from(notificationElements).map((el) => el.innerText);
    });

    //If no notifications, log error
    if (!notifications || notifications.length === 0) {
      console.log('No notifications available.');
      await browser.close();
      return;
    }
    console.log('Extracted Notifications:', notifications);

    // Prepare the HTML content for the PDF   
    const htmlContent = `
      <html>
        <body>
          <h1>Notifications</h1>
          <ul>
           ${notifications.map(notification => `<li>${notification}</li>`).join('')}
          </ul>
        </body>
      </html>
    `;

    // Set the content and generate the PDF
    await page.setContent(htmlContent, { waitUntil: 'networkidle2' });
    const pdfPath = `output/notifications-${Date.now()}.pdf`;
    await page.pdf({ path: pdfPath, format: 'A4' });
    console.log(`PDF generated: ${pdfPath}`);

    await browser.close();
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};

module.exports = {generatePDF};