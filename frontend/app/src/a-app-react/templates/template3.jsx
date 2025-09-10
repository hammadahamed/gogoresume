import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

const primaryColor = "#1c4ed8";
// Template 3 - Hybrid Resume Template (Based on the provided resume image)
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Helvetica",
    lineHeight: 1.4,
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 5,
  },
  name: {
    fontSize: 24,
    color: primaryColor,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 10,
    color: "#1F2937",
    fontWeight: "bold",
    marginTop: 10,
  },
  contactInfo: {
    fontSize: 10,
    color: "#374151",
  },
  contactItem: {
    marginRight: 20,
    marginBottom: 3,
  },
  container: {
    flexDirection: "row",
    gap: 20,
  },
  leftColumn: {
    width: "62%",
  },
  rightColumn: {
    width: "35%",
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: primaryColor,
    marginBottom: 8,
  },
  rightSectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: primaryColor,
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  professionalSummary: {
    fontSize: 10,
    lineHeight: 1.4,
    color: "#374151",
    textAlign: "justify",
    marginBottom: 5,
  },
  experienceItem: {
    marginBottom: 18,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 5,
    marginTop: 5,
  },
  jobTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 2,
    marginTop: 5,
  },
  jobCompany: {
    fontSize: 12,
    fontWeight: "bold",
    color: primaryColor,
    marginBottom: 2,
  },
  jobDuration: {
    fontSize: 10,
    color: "#6B7280",
    fontStyle: "italic",
    textAlign: "right",
    minWidth: 120,
    marginTop: 7,
  },
  jobLocation: {
    fontSize: 10,
    color: "#6B7280",
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 10,
    marginBottom: 3,
    marginLeft: 2,
    color: "#374151",
    lineHeight: 1.3,
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 2,
  },
  skillCategory: {
    marginBottom: 12,
  },
  skillCategoryTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: primaryColor,
    marginBottom: 6,
  },
  skillItem: {
    fontSize: 10,
    color: "#374151",
    marginBottom: 3,
    lineHeight: 1.4,
  },
  educationItem: {
    marginBottom: 15,
  },
  educationDegree: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 2,
  },
  educationSchool: {
    fontSize: 10,
    color: primaryColor,
    fontWeight: "bold",
    marginBottom: 2,
  },
  educationDetails: {
    fontSize: 10,
    color: "#6B7280",
    lineHeight: 1.2,
  },
  projectItem: {
    marginBottom: 5,
  },
  projectTitle: {
    fontSize: 11,
    color: "#1F2937",
    marginBottom: 3,
  },
  projectDescription: {
    fontSize: 10,
    color: "#374151",
    marginBottom: 4,
    lineHeight: 1.3,
  },
  projectLink: {
    fontSize: 9,
    color: "#6B7280",
    fontStyle: "italic",
    lineHeight: 1.2,
  },
  highlight: {
    backgroundColor: "#FEF3C7",
    padding: 2,
    borderRadius: 2,
  },
});

const Template3 = ({ userData }) => {
  // Extract data using the proper UserInfo structure
  const personalInfo = userData?.personalInfo || {};
  const {
    firstName = "John",
    lastName = "Doe",
    email = "john.doe@email.com",
    phone = "123-456-7890",
    location = "City, Country",
    professionalLinks = [],
    title = "Software Engineer",
  } = personalInfo;

  const fullName = `${firstName} ${lastName}`.trim() || "John Doe";
  const workExperiences = userData?.workExperiences || [];
  const education = userData?.education || [];
  const skills = userData?.skills || [];
  const projects = userData?.projects || [];
  const professionalSummary = userData?.professionalSummary || "";

  return (
    <Document title={fullName} pageMode="useNone">
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.name}>{fullName}</Text>
              <Text style={styles.subtitle}>{title}</Text>
            </View>

            {/* Professional Summary */}
            {professionalSummary && (
              <View style={styles.section}>
                <Text style={styles.professionalSummary}>
                  {professionalSummary}
                </Text>
              </View>
            )}

            {/* Experience */}
            {workExperiences &&
              workExperiences.length > 0 &&
              workExperiences.map((exp, index) => (
                <React.Fragment>
                  <Text style={{ ...styles.sectionTitle, marginBottom: 0 }}>
                    Professional Experience
                  </Text>
                  <View style={styles.jobHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.jobTitle}>{exp.position}</Text>
                      <Text style={styles.jobCompany}>{exp.company}</Text>
                    </View>
                    <Text style={styles.jobDuration}>
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </Text>
                  </View>

                  {exp.description &&
                    exp.description.map((desc, idx) => (
                      <Text key={idx} style={styles.bulletPoint}>
                        • {desc}
                      </Text>
                    ))}
                </React.Fragment>
              ))}
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            <View
              style={{ ...styles.contactInfo, marginBottom: 10, marginTop: 10 }}
            >
              <Text style={styles.contactItem}>{email}</Text>
              <Text style={styles.contactItem}>
                {phone}, {location}
              </Text>
              {professionalLinks.map((link, index) => (
                <Text key={index} style={styles.contactItem}>
                  {link.url}
                </Text>
              ))}
            </View>

            {/* Skills */}
            {skills && skills.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.rightSectionTitle}>Skills</Text>
                <Text style={styles.skillItem}>{skills.join(", ")}</Text>
              </View>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
              <>
                <Text style={styles.rightSectionTitle}>Selected Projects</Text>
                {projects.map((project, index) => (
                  <View key={index} style={styles.projectItem}>
                    <Text style={styles.projectTitle}>{project.name}</Text>
                    <Text style={styles.projectDescription}>
                      {project.description}
                    </Text>
                    {project.projectLink && (
                      <Text style={styles.projectLink}>
                        Link: {project.projectLink}
                      </Text>
                    )}
                    {project.sourceCode && (
                      <Text style={styles.projectLink}>
                        Source Code: {project.sourceCode}
                      </Text>
                    )}
                  </View>
                ))}
              </>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <View style={styles.section}>
                <Text style={{ ...styles.rightSectionTitle, marginTop: 10 }}>
                  Education
                </Text>
                {education.map((edu, index) => (
                  <View key={index} style={styles.educationItem}>
                    <Text style={styles.educationSchool}>{edu.school}</Text>
                    <Text style={styles.educationDegree}>{edu.degree}</Text>
                    <Text style={styles.educationDetails}>
                      {edu.startDate} - {edu.endDate}
                      {edu.gpa && ` | GPA: ${edu.gpa}`}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Interests */}
            {/* <View style={styles.section}>
              <Text style={styles.rightSectionTitle}>Interests</Text>
              <Text style={styles.skillItem}>
                Designing and Building Products at Low to No cost.
              </Text>
            </View> */}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Template3;
