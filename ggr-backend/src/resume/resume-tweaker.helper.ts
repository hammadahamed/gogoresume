import { UserProfileData } from 'src/resume/resume.types';

export const getTweakPrompt = (
  jobDescription: string,
  userPrompt: string,
  data: UserProfileData,
) => {
  const prompt = `
      Job Description: ${jobDescription}
      
      User Request: ${userPrompt}
      
      Current Resume Data:
      ${JSON.stringify(data, null, 2)}
      
      Please enhance this resume data to better align with the job description while following the user's request.
      
      Requirements:
      1. Maintain the EXACT same JSON structure
      2. Only enhance the content, don't add or remove fields
      3. DO NOT change the facts like name, email, phone, location, companies, positions, etc.
      4. Make it more relevant to the job description
      5. Keep it truthful and professional
      6. Optimize for ATS systems
      7. Keep the length for the tweaks text of same length as the original text (try maximum to match/preserve the original text length)
      8. If the original text is too short, then consider adding more text to the tweaks text
      9. If the original text is too long, requirements 6 will still apply
      10. Each section's data structure should be maintained as it is
      11. MOST IMPORTANT: please preserve the original text length as much as possible. try replacing content with similar words/phrases that rank high in the job description. This is very important to not mess up the original layout in pdf.
      
      Focus more on the user's request.
      
      Additionally, provide a match score for the optimized resume on a scale of 0-100:
      - Calculate how well the enhanced resume matches the job description
      
      Return response in this JSON format:
      {
        "data": { ...enhanced resume data... },
        "matchScore": number (0-100)
      }
    `;

  return prompt;
};
