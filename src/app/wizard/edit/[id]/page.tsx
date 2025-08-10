"use client";

import { useParams } from "next/navigation";
import WizardLayout from "../../components/WizardLayout";

export default function EditFormPage() {
  const params = useParams();
  const formId = params.id as string;

  return <WizardLayout mode="edit" formId={formId} />;
}
