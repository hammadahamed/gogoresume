export interface EmailTemplate {
  subject: string;
  body: string;
}

export const links = {
  masterProfile: 'https://gogoresume.com/master-profile',
  createResume: 'https://gogoresume.com/resume-builder',
  chromeExtension:
    'https://chromewebstore.google.com/detail/gogoresume-chrome-extens/hchajclhdlmcdimmlfjkfplhncmikkoa',
  resumeTweaker: 'https://gogoresume.com/resume-tweaker',
  support: 'mailto:support@gogoresume.com',
};

export const WelcomeEmail = (name: string): EmailTemplate => ({
  subject: 'Welcome to GoGoResume 👋',
  body: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; font-size: 16px;">
        <h3 style="color: #2c3e50;">${
          'Hello ' + (name?.split(' ')[0] || 'Hunter')
        } — let’s get you started! 🚀</h3>
    
        <p>Oh man, the pain of having to <strong>Keep Tweaking</strong> the resume to match <strong>Each & Every JD</strong> to crack the ATS...🤯 it’s real.</p>
    
        <p>Been there. That’s exactly why I built this tool — so you can tweak your resume on the fly.</p>
    
        <p><strong>Your Next Steps 🚀</strong></p>
        <ul style="margin-top: -10px;">
          <li>Set up your <a href="${links.masterProfile}" target="_blank">Master Profile</a> → smart, tailored suggestions</li>
          <li>Create your first <a href="${links.createResume}" target="_blank">resume</a> → professional templates, customized instantly</li>
          <li>Install the <a href="${links.chromeExtension}" target="_blank">Chrome Extension</a> → tweak and apply directly from job sites</li>
        </ul>
    
        <p style="margin-top: 20px;">Now it’s time to hunt those jobs down 🎯</p>
    
        <p style="margin-top: 24px;">
          Best of luck,<br/>
          <strong>Hammad</strong><br/>
          Founder, GoGoResume
        </p>
  
        <p style="font-size:14px; margin-top: 20px;">
          Need help? <a href="${links.support}">Contact Support</a>
        </p>
      </div>
    `,
});

export const ThankYouEmail = (name: string): EmailTemplate => ({
  subject: '🎉 Thank you for subscribing to GoGoResume!',
  body: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; font-size: 16px;">
        <h3 style="color: #2c3e50;">${
          'Hey ' + (name?.split(' ')[0] || 'Hunter')
        } — you’re officially in! 🙌</h3>
    
        <p>First off, <strong>thank you</strong> for supporting GoGoResume.  
        Your subscription means the world to me — and it means <strong>you just unlocked the smartest way to land your next job</strong>. 🚀</p>
    
        <p>Here’s to <strong>less tweaking</strong> and <strong>more winning</strong>:</p>
    
        <p><strong>Next Steps 👉</strong></p>
        <ul style="margin-top: -10px;">
          <li>Set up your <a href="${links.masterProfile}" target="_blank">Master Profile</a> → power your smart suggestions</li>
          <li>Install the <a href="${links.chromeExtension}" target="_blank">Chrome Extension</a> to update & apply directly on job sites</li>
          <li>Try the <a href="${links.resumeTweaker}" target="_blank">Resume Tweaker</a> → optimize for every JD instantly</li>
        </ul>
    
        <p style="margin-top: 20px;">I can’t wait to see the opportunities you’ll unlock with GoGoResume.  
        Go crush those applications — you’ve got this! 💪</p>
    
        <p style="margin-top: 24px;">
          With gratitude,<br/>
          <strong>Hammad</strong><br/>
          Founder, GoGoResume
        </p>
  
        <p style="font-size:14px; margin-top: 20px;">
          Need help? <a href="${links.support}">Contact Support</a>
        </p>
      </div>
    `,
});
