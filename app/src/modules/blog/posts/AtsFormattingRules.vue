<template>
  <BlogPostLayout
    title="The 7 ATS Formatting Rules Nobody Tells You"
    date="February 21, 2026"
    readTime="5 min"
  >
    <p class="lead text-xl text-gray-700 mb-8">
      Did you know that 75% of resumes are rejected by an Applicant Tracking System (ATS) before a human recruiter even sees them? It's not because you're unqualified. It's often because your resume formatting confused the software.
    </p>

    <h2>1. Avoid Columns and Text Boxes</h2>
    <p>
      Fancy layouts look great to humans but are a nightmare for machines. Many older ATS parsers read left-to-right, top-to-bottom. If you use two columns, the parser might mix up your work history and skills sections, creating gibberish. Stick to a simple, single-column layout.
    </p>

    <h2>2. Stick to Standard Headings</h2>
    <p>
      Don't get creative with section titles. Use "Work Experience," "Education," and "Skills." Avoid things like "Professional Journey" or "What I Bring to the Table." The ATS is programmed to look for specific headers to categorize your information correctly.
    </p>

    <h2>3. Use Standard Fonts</h2>
    <p>
      Serif (Times New Roman, Garamond) or Sans-Serif (Arial, Helvetica, Calibri) are safe. Avoid script fonts or overly stylized typefaces. If the system doesn't have your font installed, it might substitute it with something unreadable or fail to parse the text entirely.
    </p>

    <h2>4. Beware of Headers and Footers</h2>
    <p>
      Some ATS software ignores information placed in the header or footer of a document. If you put your contact information (email, phone, LinkedIn) only in the header, the recruiter might never see how to contact you. Place critical contact info in the main body of the document.
    </p>

    <h2>5. Keywords Must Be in Context</h2>
    <p>
      Old advice said to "hide" keywords in white text or list them at the bottom. Modern ATS algorithms are smarter. They look for keywords <em>in context</em>. Don't just list "Python" at the bottom; describe how you "Developed backend services using Python and Flask."
    </p>

    <h2>6. PDF vs. Word: Check the Application</h2>
    <p>
      Usually, PDF is best to preserve formatting. However, some very old ATS systems struggle with PDFs. Always check the application instructions. if they say "Word document preferred," send a .docx. If not specified, a simple PDF generated from a standard text editor is usually fine.
    </p>

    <h2>7. Graphics and Icons Are Invisible</h2>
    <p>
      The ATS reads text. It cannot "see" your skill bars, logos, or photo. In fact, graphics can cause parsing errors. Use text to describe your proficiency (e.g., "Advanced," "Intermediate") instead of a progress bar graphic.
    </p>

    <h2>Conclusion: Function Over Form</h2>
    <p>
      Your resume's job is to get you an interview, not win a design award. Keep it clean, simple, and machine-readable. Tools like <a href="/" class="text-blue-600 font-bold">GoGoResume</a> are built with these rules in mind, ensuring your resume is always ATS-friendly while helping you tailor content to the job description.
    </p>
  </BlogPostLayout>
</template>

<script setup lang="ts">
import BlogPostLayout from '../BlogPostLayout.vue';
import { onMounted } from 'vue';
import { applySEO } from '@/composables/useSEO';

onMounted(() => {
  applySEO({
    title: "7 ATS Formatting Rules That Get You Rejected | GoGoResume Blog",
    description: "Learn the critical resume formatting mistakes that cause ATS rejection. Stick to these 7 rules to ensure your resume gets seen by recruiters.",
    keywords: "ATS resume formatting, resume rejection reasons, ATS friendly resume, resume fonts, resume layout",
    canonical: "https://gogoresume.com/blog/ats-formatting-rules"
  });
});
</script>
