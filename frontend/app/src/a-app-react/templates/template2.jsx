import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

// Template 2 - Modern Resume Template
const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontSize: 11,
    fontFamily: "Helvetica",
    lineHeight: 1.4,
    backgroundColor: "#ffffff",
  },
  container: {
    flexDirection: "row",
    height: "100%",
  },
  sidebar: {
    width: "35%",
    padding: 20,
    paddingTop: 25,
  },
  mainContent: {
    width: "65%",
    padding: 20,
    paddingLeft: 25,
    paddingTop: 25,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
    letterSpacing: 0.3,
    lineHeight: 1.2,
    whiteSpace: "nowrap",
  },
  title: {
    fontSize: 11,
    marginBottom: 15,
    opacity: 0.9,
    fontWeight: "normal",
    lineHeight: 1.2,
  },
  sidebarSection: {
    marginBottom: 20,
  },
  sidebarTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    borderBottom: "1pt solid rgba(255,255,255,0.4)",
    paddingBottom: 4,
  },
  contactItem: {
    fontSize: 10,
    marginBottom: 6,
    lineHeight: 1.3,
    wordWrap: "break-word",
  },
  skillItem: {
    fontSize: 9,
    marginBottom: 4,
    paddingLeft: 8,
    lineHeight: 1.2,
  },
  mainSection: {
    marginBottom: 18,
  },
  mainSectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 12,
    color: "#2563eb",
    textTransform: "uppercase",
    letterSpacing: 0.3,
    paddingBottom: 10,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 3,
    color: "#1f2937",
    lineHeight: 1.2,
  },
  jobCompany: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#2563eb",
  },
  jobDuration: {
    fontSize: 9,
    marginBottom: 6,
    color: "#6b7280",
    fontStyle: "italic",
  },
  bulletPoint: {
    fontSize: 9,
    marginBottom: 3,
    marginLeft: 10,
    color: "#374151",
    lineHeight: 1.3,
  },
  professionalSummary: {
    fontSize: 10,
    lineHeight: 1.4,
    color: "#374151",
    textAlign: "justify",
    marginBottom: 4,
  },
  educationItem: {
    marginBottom: 12,
  },
  educationDegree: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
  },
  educationDetails: {
    fontSize: 10,
    color: "#6b7280",
    lineHeight: 1.2,
  },
  projectTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 3,
  },
  projectDescription: {
    fontSize: 10,
    color: "#374151",
    marginBottom: 4,
    lineHeight: 1.3,
  },
  projectTech: {
    fontSize: 9,
    color: "#6b7280",
    fontStyle: "italic",
    marginBottom: 10,
  },
});

const Template2 = ({ userData }) => {
  // Extract data using the proper UserInfo structure
  const personalInfo = userData?.personalInfo || {};
  const {
    firstName = "John",
    lastName = "Doe",
    email = "john.doe@email.com",
    phone = "123-456-7890",
    location = "City, Country",
    professionalLinks = [],
  } = personalInfo;

  const fullName = `${firstName} ${lastName}`.trim() || "John Doe";
  const workExperiences = userData?.workExperiences || [];
  const education = userData?.education || [];
  const skills = userData?.skills || [];
  const projects = userData?.projects || [];
  const professionalSummary = userData?.professionalSummary || "";

  // Get professional title from first work experience
  const professionalTitle = workExperiences[0]?.position || "Professional";

  return (
    <Document title={fullName} pageMode="useNone">
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Sidebar */}
          <View style={styles.sidebar}>
            {/* Header */}
            <View>
              <Text style={styles.name}>{fullName}</Text>
              <Text style={styles.title}>{professionalTitle}</Text>
            </View>

            {/* Contact Info */}
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Contact</Text>
              <Text style={styles.contactItem}>{email}</Text>
              <Text style={styles.contactItem}>{phone}</Text>
              <Text style={styles.contactItem}>{location}</Text>
              {professionalLinks.map((link, index) => (
                <Text key={index} style={styles.contactItem}>
                  {link.label}
                </Text>
              ))}
            </View>

            {/* Skills */}
            {skills && skills.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Skills</Text>
                {skills.map((skill, index) => (
                  <Text key={index} style={styles.skillItem}>
                    • {skill}
                  </Text>
                ))}
              </View>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Education</Text>
                {education.map((edu, index) => (
                  <View key={index} style={{ marginBottom: 12 }}>
                    <Text
                      style={[
                        styles.contactItem,
                        { fontWeight: "bold", marginBottom: 3 },
                      ]}
                    >
                      {edu.degree}
                    </Text>
                    <Text
                      style={[
                        styles.contactItem,
                        { fontSize: 9, marginBottom: 2 },
                      ]}
                    >
                      {edu.school}
                    </Text>
                    <Text style={[styles.contactItem, { fontSize: 9 }]}>
                      {edu.startDate} - {edu.endDate}
                    </Text>
                    {edu.gpa && (
                      <Text style={[styles.contactItem, { fontSize: 9 }]}>
                        GPA: {edu.gpa}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            {/* Professional Summary */}
            {professionalSummary && (
              <View style={styles.mainSection}>
                <Text style={styles.mainSectionTitle}>
                  Professional Summary
                </Text>
                <Text style={styles.professionalSummary}>
                  {professionalSummary}
                </Text>
              </View>
            )}

            {/* Experience */}
            {workExperiences && workExperiences.length > 0 && (
              <View style={styles.mainSection}>
                <Text style={styles.mainSectionTitle}>
                  Professional Experience
                </Text>
                {workExperiences.map((exp, index) => (
                  <View key={index} style={{ marginBottom: 14 }}>
                    <Text style={styles.jobTitle}>{exp.position}</Text>
                    <Text style={styles.jobCompany}>{exp.company}</Text>
                    <Text style={styles.jobDuration}>
                      {exp.location} | {exp.startDate} -{" "}
                      {exp.current ? "Present" : exp.endDate}
                    </Text>
                    {exp.description && (
                      <Text style={styles.bulletPoint}>
                        • {exp.description}
                      </Text>
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

            {/* Projects */}
            {projects && projects.length > 0 && (
              <View style={styles.mainSection}>
                <Text style={styles.mainSectionTitle}>Key Projects</Text>
                {projects.map((project, index) => (
                  <View key={index} style={{ marginBottom: 10 }}>
                    <Text style={styles.projectTitle}>{project.name}</Text>
                    <Text style={styles.projectDescription}>
                      {project.description}
                    </Text>
                    {project.technologies &&
                      project.technologies.length > 0 && (
                        <Text style={styles.projectTech}>
                          Tech: {project.technologies.join(", ")}
                        </Text>
                      )}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Template2;
