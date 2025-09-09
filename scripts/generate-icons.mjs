import fs from 'fs/promises';

const employees = [
  { id: 'ceo', prompt: 'flat modern icon of a professional female CEO' },
  { id: 'cto', prompt: 'flat modern icon of a male technology executive' },
  { id: 'eng-mgr-1', prompt: 'flat modern icon of an engineering manager' },
  { id: 'dev-1', prompt: 'flat modern icon of a senior developer' },
  { id: 'dev-2', prompt: 'flat modern icon of a frontend developer' },
  { id: 'dev-3', prompt: 'flat modern icon of a backend developer' },
  { id: 'dev-ops', prompt: 'flat modern icon of a devops manager' },
  { id: 'devops-1', prompt: 'flat modern icon of a devops engineer' },
  { id: 'cmo', prompt: 'flat modern icon of a marketing executive' },
  { id: 'marketing-mgr', prompt: 'flat modern icon of a marketing manager' },
  { id: 'content-spec', prompt: 'flat modern icon of a content specialist' },
  { id: 'social-mgr', prompt: 'flat modern icon of a social media manager' },
  { id: 'hr-dir', prompt: 'flat modern icon of a human resources director' },
  { id: 'recruiter', prompt: 'flat modern icon of a recruiter' }
];

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('OPENAI_API_KEY not set');
  process.exit(1);
}

await fs.mkdir('./icons', { recursive: true });

for (const emp of employees) {
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-image-1',
      prompt: emp.prompt,
      size: '128x128'
    })
  });
  if (!res.ok) {
    console.error(`Failed to generate icon for ${emp.id}: ${res.status} ${res.statusText}`);
    const err = await res.text();
    console.error(err);
    continue;
  }
  const data = await res.json();
  const b64 = data.data[0].b64_json;
  const buffer = Buffer.from(b64, 'base64');
  await fs.writeFile(`./icons/${emp.id}.png`, buffer);
  console.log(`Generated icon for ${emp.id}`);
}
