import { FormData } from "./app/types";

export const formData: FormData = {
  first_name: "",
  last_name: "",
  email: "",
  mobile_number: "",
  date_of_birth: "",
  street_address: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  title: null,
  marital_status: "",
  developer: "",
  job: "",
  educations: [
    {
      id: "1",
      university_name: "",
      degree_type: "",
      course_name: "",
    }
  ],
  job_experiences: [
    {
      id: "1",
      job_title: "",
      company_name: "",
      start_date: "",
      end_date: "",
      is_present_job: false,
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
      date_obtained: "",
      expiry_date: "",
      has_expiry: false,
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
      start_date: "",
      end_date: "",
      is_ongoing: false,
    }
  ],
  portfolio_website: "",
  github_url: "",
  linkedin_url: "",
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
  preferred_work_type: "",
  expected_salary: "",
  preferred_location: "",
  availability_date: "",
  career_goals: "",
  // Additional Information
  professional_summary: "",
  hobbies: "",
  volunteer_work: "",
  additional_notes: "",
};
