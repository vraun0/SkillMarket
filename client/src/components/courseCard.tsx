import { Link } from '@tanstack/react-router'
import ReactMarkdown from 'react-markdown'
import type { CourseValuesWithId } from '@/types/courseValues'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Props {
  course: CourseValuesWithId
  className: string
}

export function CourseCard({ course, className }: Props) {
  console.log('course receieved to card', course)
  return (
    <div>
      <Card
        className={cn(
          'bg-background dark:bg-dark-background h-128 border border-border shadow-xl dark:shadow-xl dark:shadow-black rounded-2xl overflow-hidden',
          className,
        )}
      >
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-1/2 object-cover"
        />

        <CardHeader className="h-1/4 space-y-2 text-center overflow-hidden">
          <CardTitle className="text-2xl font-semibold text-text dark:text-dark-text">
            {course.title}
          </CardTitle>

          <CardDescription className="text-muted-text text-sm overflow-y-auto text-text dark:text-dark-muted-text max-h-24 pr-2">
            <ReactMarkdown>{course.description}</ReactMarkdown>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="text-center text-sm text-muted-foreground border-t dark:border-t-white">
            <div className="p-4 text-text dark:text-dark-text font-semibold text-xl">
              Price: {course.price}
            </div>
            <div className="flex justify-around">
              <Link
                to="/user/purchases/$course_id"
                className="text-primary dark:text-dark-primary hover:underline"
                params={{
                  course_id: course._id,
                }}
              >
                <Button
                  variant={'ghost'}
                  className="bg-primary text-background dark:bg-dark-primary dark:text-dark-background"
                >
                  Buy Now
                </Button>
              </Link>
              <Link
                to="/marketplace/$course_id"
                className="text-primary dark:text-dark-primary hover:underline"
                params={{
                  course_id: course._id,
                }}
              >
                <Button>Explore Details</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
