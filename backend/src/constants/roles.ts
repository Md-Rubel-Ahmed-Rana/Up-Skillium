export enum ROLES {
  ADMIN = "admin",
  STUDENT = "student",
  INSTRUCTOR = "instructor",
}

export type IRoles = (typeof ROLES)[keyof typeof ROLES];
