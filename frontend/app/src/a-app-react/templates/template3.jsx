import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

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
    marginBottom: 25,
    paddingBottom: 20,
    borderBottom: "3pt solid #4F46E5",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4F46E5",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 15,
    fontWeight: "normal",
  },
  contactInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
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
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4F46E5",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    borderBottom: "1.5pt solid #4F46E5",
    paddingBottom: 4,
  },
  rightSectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4F46E5",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  professionalSummary: {
    fontSize: 11,
    lineHeight: 1.5,
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
  },
  jobTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 2,
  },
  jobCompany: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#4F46E5",
    marginBottom: 2,
  },
  jobDuration: {
    fontSize: 10,
    color: "#6B7280",
    fontStyle: "italic",
    textAlign: "right",
    minWidth: 120,
  },
  jobLocation: {
    fontSize: 10,
    color: "#6B7280",
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 10,
    marginBottom: 3,
    marginLeft: 12,
    color: "#374151",
    lineHeight: 1.4,
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
    color: "#4F46E5",
    marginBottom: 6,
  },
  skillItem: {
    fontSize: 10,
    color: "#374151",
    marginBottom: 3,
    paddingLeft: 8,
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
    color: "#4F46E5",
    fontWeight: "bold",
    marginBottom: 2,
  },
  educationDetails: {
    fontSize: 10,
    color: "#6B7280",
    lineHeight: 1.2,
  },
  projectItem: {
    marginBottom: 12,
  },
  projectTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1F2937",
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
    color: "#6B7280",
    fontStyle: "italic",
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
  } = personalInfo;

  const fullName = `${firstName} ${lastName}`.trim() || "John Doe";
  const workExperiences = userData?.workExperiences || [];
  const education = userData?.education || [];
  const skills = userData?.skills || [];
  const projects = userData?.projects || [];
  const professionalSummary = userData?.professionalSummary || "";

  // Get professional title and experience
  const currentRole =
    workExperiences.find((exp) => exp.current)?.position ||
    workExperiences[0]?.position ||
    "Software Engineer";
  const totalExperience =
    workExperiences.length > 0
      ? `${Math.max(1, workExperiences.length)} Years of Experience`
      : "";

  // Categorize skills
  const skillCategories = {
    "Programming Languages": skills.filter((skill) =>
      [
        "Javascript",
        "Typescript",
        "Python",
        "Dart",
        "Java",
        "C++",
        "C#",
      ].includes(skill)
    ),
    Frontend: skills.filter((skill) =>
      [
        "Flutter",
        "Vue.js",
        "Vue3",
        "React",
        "Angular.js",
        "HTML",
        "CSS",
        "SCSS",
        "Tailwind",
      ].includes(skill)
    ),
    Backend: skills.filter((skill) =>
      [
        "Node.js",
        "Nest.js",
        "Express.js",
        "Fastify",
        "Spring Boot",
        "Django",
        "Flask",
      ].includes(skill)
    ),
    "Database & Cloud": skills.filter((skill) =>
      [
        "Mongo Db",
        "Postgres",
        "Firebase",
        "AWS",
        "Docker",
        "Redis",
        "Google cloud",
        "Kubernetes",
      ].includes(skill)
    ),
  };

  return (
    <Document title={fullName} pageMode="useNone">
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.subtitle}>
            {currentRole} {totalExperience && `| ${totalExperience}`}
          </Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactItem}>{email}</Text>
            <Text style={styles.contactItem}>{phone}</Text>
            <Text style={styles.contactItem}>{location}</Text>
            {professionalLinks.map((link, index) => (
              <Text key={index} style={styles.contactItem}>
                {link.url}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.container}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Professional Summary */}
            {professionalSummary && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Relevant Experience</Text>
                <Text style={styles.professionalSummary}>
                  {professionalSummary}
                </Text>
              </View>
            )}

            {/* Experience */}
            {workExperiences && workExperiences.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Professional Experience</Text>
                {workExperiences.map((exp, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <View style={styles.jobHeader}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.jobTitle}>
                          {index + 1}. {exp.position}
                        </Text>
                        <Text style={styles.jobCompany}>{exp.company}</Text>
                        <Text style={styles.jobLocation}>{exp.location}</Text>
                      </View>
                      <Text style={styles.jobDuration}>
                        {exp.startDate} -{" "}
                        {exp.current ? "Present" : exp.endDate}
                      </Text>
                    </View>

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
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Selected Projects (Personal)
                </Text>
                {projects.map((project, index) => (
                  <View key={index} style={styles.projectItem}>
                    <Text style={styles.projectTitle}>
                      {project.name} •{" "}
                      {project.technologies
                        ? project.technologies.slice(0, 2).join(" • ")
                        : ""}
                    </Text>
                    <Text style={styles.projectDescription}>
                      {project.description}
                    </Text>
                    {project.technologies &&
                      project.technologies.length > 2 && (
                        <Text style={styles.projectTech}>
                          Additional tech:{" "}
                          {project.technologies.slice(2).join(", ")}
                        </Text>
                      )}
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Skills */}
            {skills && skills.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.rightSectionTitle}>Skills</Text>
                {Object.entries(skillCategories).map(
                  ([category, categorySkills]) =>
                    categorySkills.length > 0 && (
                      <View key={category} style={styles.skillCategory}>
                        <Text style={styles.skillCategoryTitle}>
                          {category}
                        </Text>
                        {categorySkills.map((skill, index) => (
                          <Text key={index} style={styles.skillItem}>
                            {skill}
                          </Text>
                        ))}
                      </View>
                    )
                )}

                {/* Uncategorized skills */}
                {skills.filter(
                  (skill) =>
                    !Object.values(skillCategories).flat().includes(skill)
                ).length > 0 && (
                  <View style={styles.skillCategory}>
                    <Text style={styles.skillCategoryTitle}>Other</Text>
                    {skills
                      .filter(
                        (skill) =>
                          !Object.values(skillCategories).flat().includes(skill)
                      )
                      .map((skill, index) => (
                        <Text key={index} style={styles.skillItem}>
                          {skill}
                        </Text>
                      ))}
                  </View>
                )}
              </View>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.rightSectionTitle}>Education</Text>
                {education.map((edu, index) => (
                  <View key={index} style={styles.educationItem}>
                    <Text style={styles.educationSchool}>{edu.school}</Text>
                    <Text style={styles.educationDegree}>{edu.degree}</Text>
                    <Text style={styles.educationDetails}>
                      {edu.fieldOfStudy}
                    </Text>
                    <Text style={styles.educationDetails}>
                      {edu.startDate} - {edu.endDate}
                      {edu.gpa && ` | GPA: ${edu.gpa}`}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Interests */}
            <View style={styles.section}>
              <Text style={styles.rightSectionTitle}>Interests</Text>
              <Text style={styles.skillItem}>
                Designing and Building Products at Low to No cost.
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Template3;
