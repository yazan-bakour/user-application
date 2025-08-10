import { Button, Card, CardBody, Link } from "@heroui/react";

export const EmptyPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card radius="none" shadow="none" className="max-w-md mx-auto">
        <CardBody className="text-center">
          <p className="text-default-500 mb-4">Form not found</p>
          <Link href="/forms">
            <Button color="primary" radius="none">
              Back to Forms
            </Button>
          </Link>
        </CardBody>
      </Card>
    </div>
  );
};
