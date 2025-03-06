import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container mx-auto bg-amber-400 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to Application Management IOT</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Created By Group A</p>
          <Button>Click me</Button>
        </CardContent>
      </Card>
    </div>
  )
}
