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
