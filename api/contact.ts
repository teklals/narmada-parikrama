export default async function handler(req: any, res: any) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Parse body if string or stream
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: 'Invalid JSON payload' });
    }
  }

  const { name, email, phone, message } = body || {};

  // Validation
  const trimmedName = typeof name === 'string' ? name.trim() : '';
  const trimmedEmail = typeof email === 'string' ? email.trim() : '';
  const trimmedPhone = typeof phone === 'string' ? phone.trim() : '';
  const trimmedMessage = typeof message === 'string' ? message.trim() : '';

  if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 100) {
    return res.status(400).json({ error: 'Please enter your name (2 to 100 characters).' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail || !emailRegex.test(trimmedEmail) || trimmedEmail.length > 150) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  if (!trimmedPhone || trimmedPhone.length < 7 || trimmedPhone.length > 30) {
    return res.status(400).json({ error: 'Please enter a valid phone number (at least 7 digits).' });
  }

  if (!trimmedMessage || trimmedMessage.length < 5 || trimmedMessage.length > 3000) {
    return res.status(400).json({ error: 'Please enter your message (at least 5 characters).' });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.error('[Contact API] Missing RESEND_API_KEY environment variable.');
    return res.status(503).json({
      error: 'Email service is not currently configured. Please contact us directly by phone or email.'
    });
  }

  const destinationEmail = process.env.CONTACT_DESTINATION_EMAIL || 'teklal.saw@gmail.com';
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'Narmada Parikrama <onboarding@resend.dev>';
  const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const textContent = [
    'New enquiry received from Narmada Parikrama website',
    '',
    `Name: ${trimmedName}`,
    `Email: ${trimmedEmail}`,
    `Phone: ${trimmedPhone}`,
    '',
    'Message:',
    trimmedMessage,
    '',
    `Date/Time: ${now} IST`,
    'Website: https://narmadaparikrama.co.in',
  ].join('\n');

  const escape = (str: string) =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1F2937; line-height: 1.6;">
      <h2 style="color: #4F7FF7; border-bottom: 2px solid #E5E7EB; padding-bottom: 8px;">New Narmada Parikrama Yatra Enquiry</h2>
      <p>New enquiry received from Narmada Parikrama website:</p>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tr><td style="padding: 8px; font-weight: bold; width: 110px;">Name:</td><td style="padding: 8px;">${escape(trimmedName)}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;"><a href="mailto:${escape(trimmedEmail)}">${escape(trimmedEmail)}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;"><a href="tel:${escape(trimmedPhone)}">${escape(trimmedPhone)}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold; vertical-align: top;">Message:</td><td style="padding: 8px; white-space: pre-wrap;">${escape(trimmedMessage)}</td></tr>
      </table>
      <hr style="border: 0; border-top: 1px solid #E5E7EB; margin: 20px 0;" />
      <p style="font-size: 12px; color: #6B7280;">
        <strong>Date/Time:</strong> ${now} IST<br />
        <strong>Website:</strong> <a href="https://narmadaparikrama.co.in">https://narmadaparikrama.co.in</a>
      </p>
    </div>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [destinationEmail],
        reply_to: trimmedEmail,
        subject: `New Narmada Parikrama Yatra Enquiry - ${trimmedName}`,
        text: textContent,
        html: htmlContent,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error('[Contact API] Resend error:', data);
      return res.status(502).json({
        error: 'Unable to send your enquiry right now. Please try again or contact us directly.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your enquiry has been sent successfully.'
    });
  } catch (err) {
    console.error('[Contact API] Network error:', err);
    return res.status(500).json({
      error: 'Unable to send your enquiry. Please try again or contact us directly.'
    });
  }
}
