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
  university_name: string;
  degree_type: DegreeType | "";
  course_name: string;
}

export interface JobExperience {
  id: string;
  job_title: string;
  company_name: string;
  start_date: string;
  end_date: string;
  is_present_job: boolean;
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
  date_obtained: string;
  expiry_date: string;
  has_expiry: boolean;
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
  start_date: string;
  end_date: string;
  is_ongoing: boolean;
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
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  date_of_birth: string;
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  title: Title | null;
  marital_status: MaritalStatus | "";
  developer: string;
  job: string;
  educations: Education[];
  job_experiences: JobExperience[];
  // Skills & Certifications
  skills: Skill[];
  certifications: Certification[];
  languages: Language[];
  // Portfolio & Projects
  projects: Project[];
  portfolio_website: string;
  github_url: string;
  linkedin_url: string;
  references: Reference[];
  // Preferences & Goals
  preferred_work_type: WorkType | "";
  expected_salary: string;
  preferred_location: string;
  availability_date: string;
  career_goals: string;
  // Additional Information
  professional_summary: string;
  hobbies: string;
  volunteer_work: string;
  additional_notes: string;
}

// API response interface for form data with additional fields
export interface APIFormData extends FormData {
  id: string;
  created_at: string;
  updated_at: string;
}
