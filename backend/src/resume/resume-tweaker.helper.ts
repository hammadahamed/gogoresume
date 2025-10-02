import { UserInfo } from 'src/resume/resume.types';

export const getTweakPrompt = (
  jobDescription: string,
  userPrompt: string,
  data: UserInfo,
) => {
  const prompt = `
  You are an assistant that enhances resume content without fabricating details.
  
  Context:
  - The goal is to slightly improve the resume's alignment with the given job description, while preserving truth, structure, and overall length.
  - The user may provide a custom request that should be prioritized, but honesty and preservation of data always come first.
  
  Job Description:
  ${jobDescription}
  
  User Request:
  ${userPrompt}
  
  Current Resume Data:
  ${JSON.stringify(data, null, 2)}
  
  Instructions:
  1. Keep the EXACT same JSON structure. Do not add or remove fields.
  2. Do not change factual data (name, email, phone, locations, companies, positions, dates, etc).
  3. Only enhance wording of existing text:
     - Replace weaker phrasing with stronger action verbs.
     - Insert relevant keywords from the job description **only if they naturally fit**.
     - Optimize phrasing for ATS systems without exaggerating.
  4. Preserve original text length as much as possible:
     - If a field is very short, you may expand slightly with truthful detail.
     - If a field is long, keep it close in length but refine for clarity and relevance.
  5. Focus on **improving readability, keyword alignment, and professionalism** rather than rewriting everything.
  6. Never fabricate responsibilities, achievements, or skills unless explicitly requested by the user.
  7. Always respect the user's instructions in "User Request," but keep alignment truthful.
  8. At the end, provide a numeric match score (0-100) showing how well the updated resume matches the job description.
  
  Return the result in this JSON format:
  {
    "data": { ...enhanced resume data... },
    "matchScore": number
  }
    `;

  return prompt;
};
