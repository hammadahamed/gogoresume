import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

// Template 1 - Professional Resume Template
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    fontFamily: "Helvetica",
    lineHeight: 1.5,
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottom: "2pt solid #333",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 18,
    color: "#333",
  },
  contactInfo: {
    fontSize: 12,
    color: "#666",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    borderBottom: "1pt solid #333",
    paddingBottom: 3,
  },
  jobTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 3,
    color: "#333",
  },
  jobCompany: {
    fontSize: 11,
    fontStyle: "italic",
    marginBottom: 8,
    color: "#666",
  },
  bulletPoint: {
    fontSize: 10,
    marginBottom: 3,
    marginLeft: 15,
    color: "#555",
  },
  skillsText: {
    fontSize: 11,
    lineHeight: 1.4,
    color: "#555",
  },
  educationItem: {
    marginBottom: 8,
  },
  educationDegree: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  educationDetails: {
    fontSize: 10,
    color: "#666",
  },
  professionalSummary: {
    fontSize: 11,
    lineHeight: 1.4,
    color: "#555",
    textAlign: "justify",
  },
});

const Template1 = ({ userData }) => {
  // Extract data using the proper UserInfo structure
  const personalInfo = userData?.personalInfo || {};
  const {
    firstName = "John",
    lastName = "Doe",
    email = "john.doe@email.com",
    phone = "123-456-7890",
    professionalLinks = [],
  } = personalInfo;

  // Extract LinkedIn from professional links for backward compatibility
  const linkedin =
    professionalLinks.find(
      (link) =>
        link.label?.toLowerCase().includes("linkedin") ||
        link.url?.toLowerCase().includes("linkedin")
    )?.url || "linkedin.com/in/johndoe";

  const fullName = `${firstName} ${lastName}`.trim() || "John Doe";
  const workExperiences = userData?.workExperiences || [];
  const education = userData?.education || [];
  const skills = userData?.skills || [];
  const projects = userData?.projects || [];
  const professionalSummary = userData?.professionalSummary || "";
  return (
    <Document title={fullName} pageMode="useNone">
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.contactInfo}>
            {email} | {phone} | {linkedin}
          </Text>
        </View>

        {/* Summary Section */}
        {professionalSummary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.professionalSummary}>
              {professionalSummary}
            </Text>
          </View>
        )}

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text style={styles.skillsText}>
              {Array.isArray(skills) ? skills.join(", ") : skills}
            </Text>
          </View>
        )}

        {/* Experience Section */}
        {workExperiences && workExperiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {workExperiences.map((exp, index) => (
              <View key={index} style={{ marginBottom: 15 }}>
                <Text style={styles.jobTitle}>{exp.position}</Text>
                <Text style={styles.jobCompany}>
                  {exp.company} | {exp.location} | {exp.startDate} -{" "}
                  {exp.current ? "Present" : exp.endDate}
                </Text>
                {exp.description && (
                  <Text style={styles.bulletPoint}>• {exp.description}</Text>
                )}
                {exp.achievements &&
                  exp.achievements.map((achievement, idx) => (
                    <Text key={idx} style={styles.bulletPoint}>
                      • {achievement}
                    </Text>
                  ))}
              </View>
            ))}
          </View>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((project, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.jobTitle}>{project.name}</Text>
                <Text style={styles.skillsText}>{project.description}</Text>
                {project.technologies && project.technologies.length > 0 && (
                  <Text style={styles.bulletPoint}>
                    Technologies: {project.technologies.join(", ")}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education Section */}
        {education && education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.educationDegree}>
                  {edu.degree} in {edu.fieldOfStudy}
                </Text>
                <Text style={styles.educationDetails}>
                  {edu.school} | {edu.startDate} - {edu.endDate}
                  {edu.gpa && ` | GPA: ${edu.gpa}`}
                </Text>
                {edu.honors && edu.honors.length > 0 && (
                  <Text style={styles.bulletPoint}>
                    Honors: {edu.honors.join(", ")}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default Template1;
