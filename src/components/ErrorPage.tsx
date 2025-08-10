import { Button, Card, CardBody, Link } from "@heroui/react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: string | null;
  reset: () => void;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card radius="none" shadow="none" className="max-w-md mx-auto">
        <CardBody className="text-center">
          <p className="text-danger mb-4">Error: {error}</p>
          <div className="flex gap-2 justify-center">
            <Button
              color="primary"
              variant="flat"
              onPress={reset}
              radius="none"
            >
              Retry
            </Button>
            <Link href="/forms">
              <Button color="primary" radius="none">
                Back to Forms
              </Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
