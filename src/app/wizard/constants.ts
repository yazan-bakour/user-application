import { FormData } from "./types";

export const formData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  mobileNumber: "",
  dateOfBirth: "",
  streetAddress: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  title: null,
  maritalStatus: "",
  developer: "",
  job: "",
  educations: [
    {
      id: "1",
      universityName: "",
      degreeType: "",
      courseName: "",
    }
  ],
  jobExperiences: [
    {
      id: "1",
      jobTitle: "",
      companyName: "",
      startDate: "",
      endDate: "",
      isPresentJob: false,
      description: "",
    }
  ],
  // Skills & Certifications
  skills: [
    {
      id: "1",
      name: "",
      level: "",
      category: "Technical",
    }
  ],
  certifications: [
    {
      id: "1",
      name: "",
      issuer: "",
      dateObtained: "",
      expiryDate: "",
      hasExpiry: false,
    }
  ],
  languages: [
    {
      id: "1",
      name: "",
      proficiency: "",
    }
  ],
  // Portfolio & Projects
  projects: [
    {
      id: "1",
      title: "",
      description: "",
      technologies: "",
      link: "",
      startDate: "",
      endDate: "",
      isOngoing: false,
    }
  ],
  portfolioWebsite: "",
  githubUrl: "",
  linkedinUrl: "",
  references: [
    {
      id: "1",
      name: "",
      position: "",
      company: "",
      email: "",
      phone: "",
    }
  ],
  // Preferences & Goals
  preferredWorkType: "",
  expectedSalary: "",
  preferredLocation: "",
  availabilityDate: "",
  careerGoals: "",
  // Additional Information
  professionalSummary: "",
  hobbies: "",
  volunteerWork: "",
  additionalNotes: "",
};
