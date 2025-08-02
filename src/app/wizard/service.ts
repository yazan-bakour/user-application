export enum Title {
  Mr = "Mr",
  Mrs = "Mrs",
  Miss = "Miss",
  Dr = "Dr",
}

export enum MaritalStatus {
  Single = "Single",
  Married = "Married",
  Divorced = "Divorced",
  Widowed = "Widowed",
  Separated = "Separated",
}

export enum DegreeType {
  Bachelor = "Bachelor's Degree",
  Master = "Master's Degree",
  PhD = "PhD",
  Diploma = "Diploma",
  Certificate = "Certificate",
  Associate = "Associate Degree",
}

export enum SkillLevel {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced",
  Expert = "Expert",
}

export enum ProficiencyLevel {
  Basic = "Basic",
  Conversational = "Conversational",
  Fluent = "Fluent",
  Native = "Native",
}

export enum WorkType {
  Remote = "Remote",
  Onsite = "On-site",
  Hybrid = "Hybrid",
  Any = "Any",
}

export interface Education {
  id: string;
  universityName: string;
  degreeType: DegreeType | "";
  courseName: string;
}

export interface JobExperience {
  id: string;
  jobTitle: string;
  companyName: string;
  startDate: string;
  endDate: string;
  isPresentJob: boolean;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: SkillLevel | "";
  category: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  dateObtained: string;
  expiryDate: string;
  hasExpiry: boolean;
}

export interface Language {
  id: string;
  name: string;
  proficiency: ProficiencyLevel | "";
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string;
  link: string;
  startDate: string;
  endDate: string;
  isOngoing: boolean;
}

export interface Reference {
  id: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  title: Title | null;
  maritalStatus: MaritalStatus | "";
  developer: string;
  job: string;
  educations: Education[];
  jobExperiences: JobExperience[];
  // Skills & Certifications
  skills: Skill[];
  certifications: Certification[];
  languages: Language[];
  // Portfolio & Projects
  projects: Project[];
  portfolioWebsite: string;
  githubUrl: string;
  linkedinUrl: string;
  references: Reference[];
  // Preferences & Goals
  preferredWorkType: WorkType | "";
  expectedSalary: string;
  preferredLocation: string;
  availabilityDate: string;
  careerGoals: string;
  // Additional Information
  professionalSummary: string;
  hobbies: string;
  volunteerWork: string;
  additionalNotes: string;
}
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
}

export const fetchFormData = async (): Promise<FormData> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return new Promise((resolve) => {
    resolve(formData);
  });
};

export const submitFormData = async (data: FormData): Promise<{ success: boolean; message: string }> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Log the submitted data for debugging
  console.log("Submitting form data:", data);
  
  return new Promise((resolve) => {
    resolve({
      success: true,
      message: "Form submitted successfully!"
    });
  });
};