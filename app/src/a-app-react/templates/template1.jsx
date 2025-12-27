import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

// Highlight style for changed content
const highlightStyle = {
  backgroundColor: "#bbf7d0", // Light green highlight
};

// Helper functions for checking changes
const isBulletChanged = (changes, experienceIndex, bulletIndex) => {
  if (!changes) return false;
  const expChange = changes.workExperiences?.find(
    (exp) => exp.index === experienceIndex
  );
  return expChange?.changedBullets?.includes(bulletIndex) || false;
};

const isProjectChanged = (changes, projectIndex) => {
  if (!changes) return false;
  return changes.projects?.some(
    (proj) => proj.index === projectIndex && proj.descriptionChanged
  );
};

const isSkillAdded = (changes, skill) => {
  if (!changes) return false;
  return changes.skills?.added?.includes(skill) || false;
};

// Template 1 - Professional Resume Template
const styles = StyleSheet.create({
  page: {
    padding: "20 30",
    fontSize: 11,
    fontFamily: "Helvetica",
    lineHeight: 1.5,
  },
  header: {
    textAlign: "center",
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: "2pt solid #333",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 18,
    color: "#333",
  },
  contactInfo: {
    fontSize: 10,
    color: "#666",
    whiteSpace: "nowrap",
  },
  section: {
    marginBottom: 13,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#333",
    paddingBottom: 0,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: "550",
    marginLeft: 8,
    color: "#333",
  },
  jobCompany: {
    fontSize: 11,
    fontStyle: "italic",
    color: "#666",
    marginTop: 4,
  },
  bulletPoint: {
    fontSize: 10,
    marginBottom: 3,
    marginLeft: 12,
    lineHeight: 1.3,
    color: "#555",
  },
  skillsText: {
    fontSize: 10,
    lineHeight: 1.4,
    color: "#555",
  },
  educationItem: {
    marginBottom: 8,
    marginTop: 8,
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
    fontSize: 10,
    lineHeight: 1.4,
    color: "#555",
    textAlign: "justify",
    wordBreak: "keep-all",
  },
  flexRow: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    marginBottom: 5,
    marginTop: 5,
  },
  projectLink: {
    fontSize: 9,
    color: "#6B7280",
    fontStyle: "italic",
  },
});

const Template1 = ({ userData, highlightMode = false, changes = null }) => {
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
  const linkedin = personalInfo.linkedin;
  const portfolio = personalInfo.portfolio;

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
            {email} {phone && ` | ${phone}`} {linkedin && ` | ${linkedin}`}{" "}
          </Text>
          {portfolio && <Text style={styles.contactInfo}>{portfolio}</Text>}
        </View>

        {/* Summary Section */}
        {professionalSummary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text
              style={[
                styles.professionalSummary,
                highlightMode && changes?.professionalSummary && highlightStyle,
              ]}
            >
              {professionalSummary}
            </Text>
          </View>
        )}

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text style={styles.skillsText}>
              {Array.isArray(skills)
                ? skills.map((skill, idx) => (
                    <Text
                      key={idx}
                      style={
                        highlightMode && isSkillAdded(changes, skill)
                          ? highlightStyle
                          : {}
                      }
                    >
                      {skill}
                      {idx < skills.length - 1 ? ", " : ""}
                    </Text>
                  ))
                : skills}
            </Text>
          </View>
        )}

        {/* Experience Section */}
        {workExperiences && workExperiences.length > 0 && (
          <React.Fragment>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {workExperiences.map((exp, expIndex) => (
              <View key={expIndex} style={{ marginBottom: 5 }}>
                <View style={styles.flexRow}>
                  <Text style={styles.jobTitle}>{exp.position}</Text>
                  <Text style={styles.jobCompany}>
                    {exp.company} | {exp.startDate} -{" "}
                    {exp.current ? "Present" : exp.endDate}
                  </Text>
                </View>
                {exp.description &&
                  exp.description.map((desc, bulletIdx) => (
                    <Text
                      key={bulletIdx}
                      style={[
                        styles.bulletPoint,
                        highlightMode &&
                          isBulletChanged(changes, expIndex, bulletIdx) &&
                          highlightStyle,
                      ]}
                    >
                      • {desc}
                    </Text>
                  ))}
              </View>
            ))}
          </React.Fragment>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <View style={styles.section}>
            <Text style={{ ...styles.sectionTitle }}>Projects</Text>
            {projects.map((project, projIndex) => (
              <React.Fragment key={projIndex}>
                <Text style={{ ...styles.jobTitle, marginTop: 10 }}>
                  {project.name}
                </Text>
                <Text
                  style={[
                    { ...styles.skillsText, marginLeft: 8.5 },
                    highlightMode &&
                      isProjectChanged(changes, projIndex) &&
                      highlightStyle,
                  ]}
                >
                  {project.description}
                </Text>
                {project.projectLink && (
                  <Text style={{ ...styles.projectLink, marginLeft: 8.5 }}>
                    Link: {project.projectLink}
                  </Text>
                )}
                {project.sourceCode && (
                  <Text
                    style={{
                      ...styles.projectLink,
                      marginTop: -5,
                      marginLeft: 8.5,
                    }}
                  >
                    Source Code: {project.sourceCode}
                  </Text>
                )}
              </React.Fragment>
            ))}
          </View>
        )}

        {/* Education Section */}
        {education && education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            <View style={{ marginLeft: 8 }}>
              {education.map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.educationDegree}>{edu.degree}</Text>
                  <Text style={styles.educationDetails}>
                    {edu.school} | {edu.startDate} - {edu.endDate}
                    {edu.gpa && ` | GPA: ${edu.gpa}`}
                  </Text>
                  {edu.honors && edu.honors.length > 0 && (
                    <Text style={{ ...styles.bulletPoint, marginLeft: 0 }}>
                      Honors: {edu.honors.join(", ")}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default Template1;
