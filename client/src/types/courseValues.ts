export interface CourseValues {
  title: string
  description: string
  instructor: string
  tags: Array<string>
  price: number
  thumbnail: string
}

export interface CourseValuesWithId extends CourseValues {
  _id: string
}
