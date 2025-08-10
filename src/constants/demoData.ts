import { APIFormData, Title, MaritalStatus, DegreeType, SkillLevel, ProficiencyLevel, WorkType } from "../app/types";

export const demoFormData: APIFormData = {
  id: "demo-form-id",
  created_at: "2024-01-15T10:30:00Z",
  updated_at: "2024-01-20T14:45:00Z",
  first_name: "John",
  last_name: "Doe",
  email: "john.doe@example.com",
  mobile_number: "+1-555-123-4567",
  date_of_birth: "1990-05-15",
  street_address: "123 Main Street",
  city: "San Francisco",
  state: "California",
  postal_code: "94102",
  country: "United States",
  title: Title.Mr,
  marital_status: MaritalStatus.Single,
  developer: "Full Stack Developer",
  job: "Senior Software Engineer",
  educations: [
    {
      id: "edu-1",
      university_name: "Stanford University",
      degree_type: DegreeType.Bachelor,
      course_name: "Computer Science",
    },
    {
      id: "edu-2", 
      university_name: "MIT",
      degree_type: DegreeType.Master,
      course_name: "Software Engineering",
    }
  ],
  job_experiences: [
    {
      id: "job-1",
      job_title: "Senior Software Engineer",
      company_name: "Tech Corp Inc.",
      start_date: "2022-03-01",
      end_date: "",
      is_present_job: true,
      description: "Leading development of scalable web applications using React, Node.js, and cloud services. Mentoring junior developers and architecting solutions for complex business requirements.",
    },
    {
      id: "job-2",
      job_title: "Full Stack Developer",
      company_name: "StartupXYZ",
      start_date: "2020-01-15",
      end_date: "2022-02-28",
      is_present_job: false,
      description: "Developed and maintained full-stack applications using React, Express.js, and MongoDB. Implemented CI/CD pipelines and improved application performance by 40%.",
    }
  ],
  skills: [
    {
      id: "skill-1",
      name: "JavaScript",
      level: SkillLevel.Expert,
      category: "Technical",
    },
    {
      id: "skill-2",
      name: "React",
      level: SkillLevel.Expert,
      category: "Technical",
    },
    {
      id: "skill-3",
      name: "Node.js",
      level: SkillLevel.Advanced,
      category: "Technical",
    },
    {
      id: "skill-4",
      name: "Leadership",
      level: SkillLevel.Intermediate,
      category: "Soft Skills",
    }
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date_obtained: "2023-06-15",
      expiry_date: "2026-06-15",
      has_expiry: true,
    },
    {
      id: "cert-2",
      name: "Certified Scrum Master",
      issuer: "Scrum Alliance",
      date_obtained: "2022-09-20",
      expiry_date: "",
      has_expiry: false,
    }
  ],
  languages: [
    {
      id: "lang-1",
      name: "English",
      proficiency: ProficiencyLevel.Native,
    },
    {
      id: "lang-2",
      name: "Spanish",
      proficiency: ProficiencyLevel.Conversational,
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "E-commerce Platform",
      description: "Built a full-featured e-commerce platform with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, inventory management, and admin dashboard.",
      technologies: "React, Node.js, PostgreSQL, Stripe API, AWS",
      link: "https://github.com/johndoe/ecommerce-platform",
      start_date: "2023-01-01",
      end_date: "2023-08-15",
      is_ongoing: false,
    },
    {
      id: "proj-2",
      title: "Task Management App",
      description: "Developed a collaborative task management application with real-time updates using WebSocket technology. Includes team collaboration features and project analytics.",
      technologies: "Next.js, Socket.io, MongoDB, Tailwind CSS",
      link: "https://github.com/johndoe/task-manager",
      start_date: "2023-09-01",
      end_date: "",
      is_ongoing: true,
    }
  ],
  portfolio_website: "https://johndoe.dev",
  github_url: "https://github.com/johndoe",
  linkedin_url: "https://linkedin.com/in/johndoe",
  references: [
    {
      id: "ref-1",
      name: "Sarah Johnson",
      position: "Engineering Manager",
      company: "Tech Corp Inc.",
      email: "sarah.johnson@techcorp.com",
      phone: "+1-555-987-6543",
    },
    {
      id: "ref-2",
      name: "Michael Chen",
      position: "Senior Developer",
      company: "StartupXYZ",
      email: "michael.chen@startupxyz.com", 
      phone: "+1-555-456-7890",
    }
  ],
  preferred_work_type: WorkType.Hybrid,
  expected_salary: "$120,000 - $150,000",
  preferred_location: "San Francisco Bay Area",
  availability_date: "2024-03-01",
  career_goals: "Looking to take on more leadership responsibilities while continuing to contribute to technical architecture decisions. Interested in mentoring junior developers and driving innovation in software development practices.",
  professional_summary: "Experienced Full Stack Developer with 5+ years of expertise in building scalable web applications. Proficient in React, Node.js, and cloud technologies with a strong background in agile development methodologies. Passionate about clean code, performance optimization, and team collaboration.",
  hobbies: "Photography, hiking, playing guitar, contributing to open source projects",
  volunteer_work: "Mentor at local coding bootcamp, volunteer web developer for non-profit organizations",
  additional_notes: "Available for immediate start. Open to remote work opportunities and willing to travel occasionally for team meetings."
};

export const demoFormsData: APIFormData[] = [
  demoFormData,
  {
    ...demoFormData,
    id: "demo-form-2",
    first_name: "Jane",
    last_name: "Smith", 
    email: "jane.smith@example.com",
    mobile_number: "+1-555-234-5678",
    date_of_birth: "1988-08-22",
    title: Title.Mrs,
    marital_status: MaritalStatus.Married,
    developer: "Frontend Developer",
    job: "UI/UX Developer",
    preferred_work_type: WorkType.Remote,
    job_experiences: [
      {
        id: "job-1",
        job_title: "UI/UX Developer",
        company_name: "Design Studio Ltd.",
        start_date: "2023-01-01",
        end_date: "",
        is_present_job: true,
        description: "Creating user-friendly interfaces and improving user experience across web applications.",
      }
    ],
    created_at: "2024-02-01T08:15:00Z",
    updated_at: "2024-02-10T16:30:00Z",
  },
  {
    ...demoFormData,
    id: "demo-form-3",
    first_name: "Michael",
    last_name: "Johnson",
    email: "michael.johnson@example.com",
    mobile_number: "+1-555-345-6789",
    date_of_birth: "1985-12-10",
    title: Title.Mr,
    marital_status: MaritalStatus.Single,
    developer: "Backend Developer",
    job: "Senior Backend Engineer",
    preferred_work_type: WorkType.Onsite,
    job_experiences: [
      {
        id: "job-1",
        job_title: "Senior Backend Engineer",
        company_name: "Enterprise Solutions Inc.",
        start_date: "2021-06-15",
        end_date: "",
        is_present_job: true,
        description: "Designing and implementing scalable backend systems and APIs.",
      }
    ],
    created_at: "2024-01-20T12:45:00Z",
    updated_at: "2024-01-25T09:20:00Z",
  }
];
