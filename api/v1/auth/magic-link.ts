export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email } = req.body || {};

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email is required and must be a string.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  const domain = email.split('@')[1].toLowerCase();

  const FREEMAIL_DOMAINS = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 
    'aol.com', 'icloud.com', 'protonmail.com', 'zoho.com', 'mail.com', 'me.com', 'msn.com'
  ];

  if (FREEMAIL_DOMAINS.includes(domain)) {
    return res.status(403).json({ 
      error: 'Personal email addresses are not allowed. Please use your work email.' 
    });
  }

  for (const freemail of FREEMAIL_DOMAINS) {
    if (domain.endsWith('.' + freemail)) {
      return res.status(403).json({ 
        error: 'Personal email subdomains are not allowed. Please use your work email.' 
      });
    }
  }

  return res.status(200).json({ 
    success: true, 
    message: 'Magic link sent successfully. Please check your inbox.',
    _dev: {
      email,
      magicLink: `http://localhost:5173/auth/verify?token=mock_token_for_${encodeURIComponent(email)}`,
      note: 'This is a mock response for dev/staging.'
    }
  });
}
