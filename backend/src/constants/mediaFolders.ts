export enum MediaFolderEnum {
  COURSE_INTRODUCTORY_VIDEOS = "courses/introductory-videos",
  COURSE_LESSONS = "courses/lessons",
  COURSE_THUMBNAILS = "courses/thumbnails",
  USER_PROFILE_PICTURES = "users/profile-pictures",
  USER_COVER_IMAGES = "users/cover-images",
  CERTIFICATES = "certificates",
}

export type MediaFolder = keyof typeof MediaFolderEnum;
