"use client";

import { Divider } from "@heroui/react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { APIFormData } from "../../types";
import InfoCard from "../../../components/InfoCard";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import ErrorPage from "@/components/ErrorPage";
import { EmptyPage } from "@/components/EmptyPage";
import BottomNavigation from "../../../components/BottomNavigation";
import { useFormData } from "../../../hooks/useFormData";

export default function ViewFormPage() {
  const [formData, setFormData] = useState<APIFormData | null>(null);
  const params = useParams();
  const formId = params.id as string;

  const { fetchFormData, isLoading, error } = useFormData();

  useEffect(() => {
    if (formId) {
      const loadData = async () => {
        const data = await fetchFormData(formId);
        if (data) {
          setFormData(data);
        }
      };
      loadData();
    }
  }, [formId, fetchFormData]);

  const handleRetry = async () => {
    if (formId) {
      const data = await fetchFormData(formId);
      if (data) {
        setFormData(data);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!formData || isLoading) {
    return <LoadingSkeleton variant="form" />;
  }

  if (error) {
    return <ErrorPage error={error} reset={handleRetry} />;
  }

  return (
    <div className="container mx-auto px-4 pb-24">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary-800">
              Application Details
            </h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <InfoCard
          heading="Personal Information"
          fields={[
            {
              label: "Full Name",
              value: `${formData.title} ${formData.first_name} ${formData.last_name}`,
            },
            {
              label: "Date of Birth",
              value: formData.date_of_birth,
              type: "date",
            },
            {
              label: "Email",
              value: formData.email,
              type: "email",
            },
            {
              label: "Mobile Number",
              value: formData.mobile_number,
              type: "phone",
            },
            {
              label: "City",
              value: formData.city,
            },
            {
              label: "Country",
              value: formData.country,
            },
            {
              label: "Marital Status",
              value: formData.marital_status,
            },
          ]}
        />

        {/* Work Preferences */}
        <InfoCard
          heading="Work Preferences"
          fields={[
            {
              label: "Expected Salary",
              value: formData.expected_salary,
            },
            {
              label: "Preferred Work Type",
              value: formData.preferred_work_type,
            },
            {
              label: "Created",
              value: formData.created_at,
              type: "date",
            },
            {
              label: "Last Updated",
              value: formData.updated_at,
              type: "date",
            },
          ]}
        />

        {/* Education */}
        <InfoCard
          heading="Education"
          className="lg:col-span-2 bg-content2"
          emptyMessage="No education records"
        >
          {formData.educations.length > 0 ? (
            <div className="space-y-4">
              {formData.educations.map((education, index) => (
                <div key={education.id}>
                  {index > 0 && <Divider className="my-4" />}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-default-500">University</p>
                      <p className="font-medium">{education.university_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-default-500">Degree Type</p>
                      <p className="font-medium">{education.degree_type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-default-500">Course</p>
                      <p className="font-medium">{education.course_name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </InfoCard>

        {/* Job Experience */}
        <InfoCard
          heading="Job Experience"
          className="lg:col-span-2 bg-content2"
          emptyMessage="No job experience records"
        >
          {formData.job_experiences.length > 0 ? (
            <div className="space-y-4">
              {formData.job_experiences.map((experience, index) => (
                <div key={experience.id}>
                  {index > 0 && <Divider className="my-4" />}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-default-500">Job Title</p>
                      <p className="font-medium">{experience.job_title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-default-500">Company</p>
                      <p className="font-medium">{experience.company_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-default-500">Start Date</p>
                      <p className="font-medium">
                        {formatDate(experience.start_date)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-default-500">End Date</p>
                      <p className="font-medium">
                        {experience.is_present_job
                          ? "Present"
                          : formatDate(experience.end_date)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </InfoCard>

        {/* Skills */}
        <InfoCard
          heading="Skills"
          className="lg:col-span-2 bg-content2"
          fields={
            formData.skills.length > 0
              ? formData.skills.map((skill) => ({
                  label: "",
                  value: `${skill.name} (${skill.level})`,
                  type: "chip" as const,
                  chipColor: "primary" as const,
                }))
              : []
          }
          emptyMessage="No skills listed"
        />

        {/* Languages */}
        <InfoCard
          heading="Languages"
          className="lg:col-span-2 bg-content2"
          fields={
            formData.languages.length > 0
              ? formData.languages.map((language) => ({
                  label: "",
                  value: `${language.name} (${language.proficiency})`,
                  type: "chip" as const,
                  chipColor: "secondary" as const,
                }))
              : []
          }
          emptyMessage="No languages listed"
        />

        {/* Certifications */}
        <InfoCard
          heading="Certifications"
          className="lg:col-span-2 bg-content2"
          emptyMessage="No certifications listed"
        >
          {formData.certifications.length > 0 ? (
            <div className="space-y-4">
              {formData.certifications.map((certification, index) => (
                <div key={certification.id}>
                  {index > 0 && <Divider className="my-4" />}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-default-500">
                        Certification Name
                      </p>
                      <p className="font-medium">{certification.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-default-500">Issuer</p>
                      <p className="font-medium">{certification.issuer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-default-500">Date Obtained</p>
                      <p className="font-medium">
                        {formatDate(certification.date_obtained)}
                      </p>
                    </div>
                    {certification.has_expiry && certification.expiry_date && (
                      <div>
                        <p className="text-sm text-default-500">Expiry Date</p>
                        <p className="font-medium">
                          {formatDate(certification.expiry_date)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </InfoCard>

        {/* Projects */}
        <InfoCard
          heading="Projects"
          className="lg:col-span-2 bg-content2"
          emptyMessage="No projects listed"
        >
          {formData.projects.length > 0 ? (
            <div className="space-y-4">
              {formData.projects.map((project, index) => (
                <div key={project.id}>
                  {index > 0 && <Divider className="my-4" />}
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-default-500">
                          Project Title
                        </p>
                        <p className="font-medium">{project.title}</p>
                      </div>
                      <div>
                        <p className="text-sm text-default-500">Technologies</p>
                        <p className="font-medium">{project.technologies}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-default-500">Start Date</p>
                        <p className="font-medium">
                          {formatDate(project.start_date)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-default-500">End Date</p>
                        <p className="font-medium">
                          {project.is_ongoing
                            ? "Ongoing"
                            : formatDate(project.end_date)}
                        </p>
                      </div>
                    </div>
                    {project.description && (
                      <div>
                        <p className="text-sm text-default-500">Description</p>
                        <p className="font-medium">{project.description}</p>
                      </div>
                    )}
                    {project.link && (
                      <div>
                        <p className="text-sm text-default-500">Project Link</p>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-500 hover:text-primary-700 underline"
                        >
                          View Project
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </InfoCard>

        {/* Portfolio Links */}
        <InfoCard
          heading="Portfolio & Links"
          fields={[
            formData.portfolio_website
              ? {
                  label: "Portfolio Website",
                  value: formData.portfolio_website,
                  type: "link" as const,
                  href: formData.portfolio_website,
                }
              : null,
            formData.linkedin_url
              ? {
                  label: "LinkedIn Profile",
                  value: formData.linkedin_url,
                  type: "link" as const,
                  href: formData.linkedin_url,
                }
              : null,
            formData.github_url
              ? {
                  label: "GitHub Profile",
                  value: formData.github_url,
                  type: "link" as const,
                  href: formData.github_url,
                }
              : null,
          ].filter(
            (field): field is NonNullable<typeof field> => field !== null
          )}
          emptyMessage="No portfolio links provided"
        />

        {/* References */}
        <InfoCard heading="References" emptyMessage="No references provided">
          {formData.references.length > 0 ? (
            <div className="space-y-4">
              {formData.references.map((reference, index) => (
                <div key={reference.id}>
                  {index > 0 && <Divider className="my-4" />}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-default-500">Name</p>
                      <p className="font-medium">{reference.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-default-500">Company</p>
                      <p className="font-medium">{reference.company}</p>
                    </div>
                    <div>
                      <p className="text-sm text-default-500">Position</p>
                      <p className="font-medium">{reference.position}</p>
                    </div>
                    <div>
                      <p className="text-sm text-default-500">Email</p>
                      <a
                        href={`mailto:${reference.email}`}
                        className="text-primary-500 hover:text-primary-700 underline font-medium"
                      >
                        {reference.email}
                      </a>
                    </div>
                    {reference.phone && (
                      <div>
                        <p className="text-sm text-default-500">Phone</p>
                        <a
                          href={`tel:${reference.phone}`}
                          className="text-primary-500 hover:text-primary-700 underline font-medium"
                        >
                          {reference.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </InfoCard>
      </div>

      <BottomNavigation
        leftButton={{
          text: "Back to Forms",
          href: "/forms",
          variant: "flat",
          color: "primary",
        }}
        rightButton={{
          text: "Edit Form",
          href: `/wizard/edit/${formId}`,
          variant: "solid",
          color: "warning",
        }}
      />
    </div>
  );
}
