/**
 * Google Apps Script for Ôn Thượng Vĩ (Wen Shang Weei) Personal Website
 * 
 * Capabilities:
 * 1. Appends every new inquiry to the active Google Sheet (ready to view or export as CSV).
 * 2. Sends an instant notification email to viot.tech@gmail.com with student details.
 * 3. Formats headers automatically on first run.
 * 
 * Setup instructions:
 * 1. Go to https://sheets.new and create a new Google Sheet (e.g. named "Viot Website Inquiries").
 * 2. In Google Sheets menu, click: Extensions > Apps Script.
 * 3. Replace all code in the script editor with this file's contents.
 * 4. Click Deploy > New deployment.
 * 5. Select type: Web app.
 * 6. Configuration:
 *    - Description: "Viot Contact Form Webhook"
 *    - Execute as: "Me (your google account)"
 *    - Who has access: "Anyone" (crucial so your website visitors can submit)
 * 7. Click Deploy, authorize permissions when prompted.
 * 8. Copy the Web App URL (ends with /exec) and paste it into index.html (SCRIPT_URL).
 */

const RECIPIENT_EMAIL = "viot.tech@gmail.com";
const NOTIFICATION_SUBJECT_PREFIX = "🎓 [Viot Website Inquiry]";

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse incoming payload
    let data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e.parameter) {
      data = e.parameter;
    }

    // Sanitize inputs to prevent CSV / Spreadsheet formula injection (CWE-1236)
    const name = sanitizeForSheet(data.name || "N/A");
    const contact = sanitizeForSheet(data.contact || "N/A");
    const program = sanitizeForSheet(data.program || "General Inquiry");
    const message = sanitizeForSheet(data.message || "(No additional message provided)");
    
    // Format timestamp in Vietnam timezone (GMT+7)
    const now = new Date();
    const formattedDate = Utilities.formatDate(now, "Asia/Ho_Chi_Minh", "yyyy-MM-dd HH:mm:ss");

    // Initialize headers if empty sheet
    if (sheet.getLastRow() === 0) {
      const headers = [
        "Submitted At (GMT+7)",
        "Full Name",
        "Phone / Zalo / Email",
        "Interested Program",
        "Current Level & Target Goals"
      ];
      sheet.appendRow(headers);
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#e2e8f0");
      sheet.setFrozenRows(1);
    }

    // Append submission row
    sheet.appendRow([
      formattedDate,
      name,
      contact,
      program,
      message
    ]);

    // Send instant email alert
    sendNotificationEmail({
      name: name,
      contact: contact,
      program: program,
      message: message,
      date: formattedDate
    });

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Inquiry saved and email sent." }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Error in doPost: " + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendNotificationEmail(info) {
  const subject = `${NOTIFICATION_SUBJECT_PREFIX} ${info.name} - ${info.program}`;
  
  const plainTextBody = 
    `You have received a new consultation inquiry from your personal website:\n\n` +
    `• Date & Time (VN): ${info.date}\n` +
    `• Full Name: ${info.name}\n` +
    `• Phone / Zalo / Email: ${info.contact}\n` +
    `• Interested Program: ${info.program}\n` +
    `• Current Level & Goals:\n${info.message}\n\n` +
    `To view all inquiries or download as CSV, open your Google Sheet.\n` +
    `— Automated notification from viot.tech`;

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; color: #1e293b;">
      <div style="background-color: #0f172a; padding: 20px 24px; color: #ffffff;">
        <h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #38bdf8;">New Student Inquiry</h2>
        <p style="margin: 4px 0 0; font-size: 13px; color: #94a3b8;">Website Consultation Request</p>
      </div>
      <div style="padding: 24px; background-color: #ffffff;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; width: 140px; color: #64748b;">Full Name</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 700; font-size: 16px; color: #0f172a;">${escapeHtml(info.name)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #64748b;">Phone / Zalo / Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #0284c7;">
              ${escapeHtml(info.contact)}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #64748b;">Program</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600;">${escapeHtml(info.program)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #64748b;">Submission Time</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #475569;">${escapeHtml(info.date)}</td>
          </tr>
        </table>
        
        <div style="margin-top: 16px;">
          <div style="font-weight: 600; font-size: 13px; text-transform: uppercase; color: #64748b; margin-bottom: 8px;">Current Level &amp; Goals:</div>
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px 16px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #334155;">${escapeHtml(info.message)}</div>
        </div>
      </div>
      <div style="padding: 14px 24px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
        This row has been automatically recorded in your Google Sheet. You can export all responses as CSV anytime via <em>File &gt; Download &gt; CSV</em>.
      </div>
    </div>
  `;

  GmailApp.sendEmail(RECIPIENT_EMAIL, subject, plainTextBody, {
    htmlBody: htmlBody
  });
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function sanitizeForSheet(val) {
  if (val === null || val === undefined) return "";
  const str = String(val).trim();
  // If value begins with formula characters, prefix with single quote to force text rendering in spreadsheets
  if (/^[=+@\-\t\r]/.test(str)) {
    return "'" + str;
  }
  return str;
}

function doGet(e) {
  return ContentService.createTextOutput("Viot Website Inquiry Webhook is running active and ready to receive submissions.")
    .setMimeType(ContentService.MimeType.TEXT);
}
