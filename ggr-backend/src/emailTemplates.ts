export interface EmailTemplate {
  subject: string;
  body: string;
}

export const WelcomeEmail = (name: string): EmailTemplate => ({
  subject: 'Welcome to GoGoResume 👋',
  body: `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; font-size: 16px;">
      <h3 style="color: #2c3e50;">${'Hello ' + (name?.split(' ')[0] || 'Hunter')} — let’s get you started! 🚀</h3>
  
      <p>Oh man, the pain of having to <strong>Keep Tweaking</strong> the resume to match <strong>Each & Every JD</strong> to crack the ATS...🤯 it’s real.</p>
  
      <p>Been there. That’s exactly why I built this tool — so you can tweak your resume on the fly.</p>
  
      <p><strong>Your Next Steps 🚀</strong></p>
      <p style="margin-top: -10px;">• Set up your Master Profile → smart, tailored suggestions<br/>
         • Create your first resume → professional templates, customized instantly<br/>
         • Install the Chrome Extension → tweak and apply directly from job sites</p>
  
      <p style="margin-top: 20px;">Now it’s time to hunt those jobs down 🎯</p>
  
      <p style="margin-top: 24px;">
        Best of luck,<br/>
        <strong>Hammad</strong><br/>
        Founder, GoGoResume
      </p>
    </div>
    `,
});
